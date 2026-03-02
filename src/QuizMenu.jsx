import React, { useState, useEffect, useMemo } from 'react';
import notionFace from './assets/notionFace1.png';
import { QUIZ_INDEX } from './quizList'; 

const THEME = {
  primaryColor: "#ed742f",   
  primaryLight: "#C4C6F3",   
  textBlack: "#121826",     
  btnGray: "#9CA3AF",        
  textGrayLight: "#9CA3AF",  
  bgHeader: "#FFFFFF",        
  white: "#FFFFFF",          
  borderLight: "#E5E7EB",    
  borderLighter: "#f5f5f5",  
  starFilled: "#FBBF24",     
  starEmpty: "#E5E7EB",
  success: "#10B981" 
};

export default function QuizMenu({ db, onSelect }) {
  const [activeCategory, setActiveCategory] = useState("QUIZ");
  const [hoveredFilter, setHoveredFilter] = useState(null);

  const [activeFilter, setActiveFilter] = useState({
    subject: '국어',
    grade: '4학년'
  });

  const [dynamicInfo, setDynamicInfo] = useState({});

  const subjects = ['국어', '사회', '과학'];
  const grades = ['4학년', '5학년', '6학년'];

  const handleSelectFilter = (subject, grade) => {
    setActiveFilter({ subject, grade });
  };

  const safeDataList = useMemo(() => {
    return (db && db.length > 0) ? db : (QUIZ_INDEX || []);
  }, [db]);

  const filteredList = useMemo(() => {
    return safeDataList.filter(item => {
      return item?.subject === activeFilter.subject && item?.grade === activeFilter.grade;
    });
  }, [safeDataList, activeFilter.subject, activeFilter.grade]);

  useEffect(() => {
    filteredList.forEach(async (item) => {
      if (dynamicInfo[item.id]) return;

      try {
        const module = await item.loader();
        const quizData = module.default;
        
        // 정답 어휘만 추출
        const targetWords = quizData.map(q => q.options[q.correct]);
        const extractedDesc = targetWords.length > 0 ? targetWords.join(", ") : "등록된 어휘가 없습니다.";

        // 로컬스토리지 점수 로드
        const saved1 = JSON.parse(localStorage.getItem(`quiz_progress_${item.id}_step1`)) || JSON.parse(localStorage.getItem(`quiz_progress_${item.id}`)) || null;
        const saved2 = JSON.parse(localStorage.getItem(`quiz_progress_${item.id}_step2`)) || null;

        const score1 = saved1 ? saved1.score : null;
        const score2 = saved2 ? saved2.score : null;
        const date1 = saved1 ? new Date(saved1.date) : new Date(0);
        const date2 = saved2 ? new Date(saved2.date) : new Date(0);
        
        const lastSolvedDate = date1 > date2 ? saved1?.date : (saved2?.date || "");

        setDynamicInfo(prev => ({
          ...prev,
          [item.id]: {
            desc: extractedDesc,
            date: lastSolvedDate,
            score1: score1,
            score2: score2
          }
        }));
      } catch (error) {
        setDynamicInfo(prev => ({
          ...prev,
          [item.id]: { desc: "어휘 데이터를 불러올 수 없습니다.", date: "", score1: null, score2: null }
        }));
      }
    });
  }, [filteredList]); 

  // ✨ 평균 점수에 따른 별 5개 환산 로직
  const getStarCount = (percentage) => {
    if (!percentage || percentage <= 0) return 0;
    return Math.round((percentage / 100) * 5);
  };

  return (
    <div style={{ minHeight: "100vh", background: THEME.white, fontFamily: "'Pretendard', sans-serif", color: THEME.textBlack, WebkitFontSmoothing: "antialiased" }}>
      
      <section style={{ background: THEME.bgHeader, padding: "90px 0", width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ position: "relative", textAlign: "center", paddingRight: "20px" }}>
            <h1 style={{ fontSize: "50px", fontWeight: "700", margin: "0 0 16px 0", color: THEME.textBlack }}>
              The Primary <span style={{ color: THEME.textGrayLight }}>ED. Archive</span>
            </h1>
            <p style={{ color: THEME.textGrayLight, fontSize: "14px", fontWeight: "500", margin: 0 }}>
              초등학생 문해력 향상을 위한 자기주도 학습 퀴즈 & 워크시트 아카이브
            </p>
            <img src={notionFace} alt="character" style={{ position: "absolute", right: "-110px", top: "-42px", width: "120px", mixBlendMode: "multiply", pointerEvents: "none" }} />
          </div>
        </div>
      </section>

      <div style={{ width: "100%", borderBottom: `1px solid ${THEME.borderLight}`, display: "flex", justifyContent: "center", paddingTop: "1px" }}>
        <div style={{ display: "flex", gap: "26px", marginBottom: "-1px" }}>
          <div onClick={() => setActiveCategory("QUIZ")} style={{ padding: "0 10px 16px 10px", borderBottom: activeCategory === "QUIZ" ? `4px solid ${THEME.primaryColor}` : "4px solid transparent", color: activeCategory === "QUIZ" ? THEME.primaryColor : THEME.textBlack, fontWeight: "800", fontSize: "20px", cursor: "pointer", transition: "all 0.2s" }}>Quiz</div>
          <div onClick={() => setActiveCategory("WORKSHEET")} style={{ padding: "0 10px 16px 10px", borderBottom: activeCategory === "WORKSHEET" ? `4px solid ${THEME.primaryColor}` : "4px solid transparent", color: activeCategory === "WORKSHEET" ? THEME.primaryColor : THEME.textBlack, fontWeight: "800", fontSize: "20px", cursor: "pointer", transition: "all 0.2s" }}>Worksheet</div>
        </div>
      </div>

      <main style={{ maxWidth: "800px", margin: "0 auto", padding: "50px 20px 120px 20px", display: "flex", alignItems: "flex-start" }}>
        
        {/* 🌟 수정 1: aside 너비를 140px에서 170px로 넉넉하게 확보 */}
        <aside style={{ width: "170px", minWidth: "170px", flexShrink: 0, paddingRight: "25px" }}>
          {subjects.map((sub, sIdx) => {
            const isSubjectActive = activeFilter.subject === sub;
            const subjectColor = isSubjectActive ? THEME.primaryColor : THEME.textBlack;

            return (
              <div key={sub}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px", whiteSpace: "nowrap" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={subjectColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                  
                  {/* 🌟 수정 2: h3 태그에 단어 끊김(wordBreak) 및 줄바꿈 방지(whiteSpace) 강제 적용 */}
                  <h3 style={{ fontSize: "16px", fontWeight: "900", color: subjectColor, margin: "0", whiteSpace: "nowrap", wordBreak: "keep-all" }}>{sub} 어휘 퀴즈</h3>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  {grades.map(grade => {
                    const isChecked = activeFilter.subject === sub && activeFilter.grade === grade;
                    const isHovered = hoveredFilter === `${sub}-${grade}`;
                    const itemTextColor = (isChecked || isHovered) ? THEME.primaryColor : THEME.textBlack;
                    const boxBgColor = isChecked ? THEME.primaryColor : (isHovered ? THEME.primaryLight : THEME.white);

                    return (
                      <div key={grade} onClick={() => handleSelectFilter(sub, grade)} onMouseEnter={() => setHoveredFilter(`${sub}-${grade}`)} onMouseLeave={() => setHoveredFilter(null)} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                        <div style={{ width: "16px", height: "16px", flexShrink: 0, borderRadius: "3px", background: boxBgColor, border: (isChecked || isHovered) ? "none" : `1px solid #D1D5DB`, display: "flex", justifyContent: "center", alignItems: "center", transition: "all 0.2s" }}>
                          {isChecked && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                        </div>
                        <span style={{ fontSize: "14px", color: itemTextColor, fontWeight: (isChecked || isHovered) ? "600" : "400", whiteSpace: "nowrap" }}>{grade}</span>
                      </div>
                    );
                  })}
                </div>
                {sIdx < subjects.length - 1 && <div style={{ width: "100%", height: "1px", background: THEME.borderLight, margin: "14px 0" }}></div>}
              </div>
            );
          })}
        </aside>

        <div style={{ width: "1px", background: THEME.borderLighter, alignSelf: "stretch", marginRight: "30px", flexShrink: 0 }}></div>

        <section style={{ flex: 1, marginTop: "-12px", minWidth: 0 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {filteredList.length === 0 ? (
              <div style={{ padding: "40px 0", textAlign: "center", color: THEME.textGrayLight, fontSize: "14px" }}>해당 과목/학년에 등록된 어휘 퀴즈가 없습니다.</div>
            ) : (
              filteredList.map((item, index) => {
                const isLastItem = index === filteredList.length - 1; 
                const info = dynamicInfo[item.id] || { desc: "어휘 데이터 추출 중...", date: "", score1: null, score2: null };
                
                // ✨ 평균 점수 계산
                let avgScore = 0;
                if (info.score1 !== null && info.score2 !== null) {
                  avgScore = Math.round((info.score1 + info.score2) / 2);
                } else if (info.score1 !== null) {
                  avgScore = info.score1;
                } else if (info.score2 !== null) {
                  avgScore = info.score2;
                }

                const starCount = getStarCount(avgScore);

                return (
                  <div key={item.id} style={{ padding: "12px 0", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: isLastItem ? "none" : `1px solid ${THEME.borderLight}` }}>
                    
                    <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0, paddingRight: "16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        <span style={{ fontSize: "16px", fontWeight: "700", color: THEME.textBlack }}>{item.title}</span>
                        {info.date && (
                          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", height: "20px", padding: "0 6px", border: `1px solid ${THEME.primaryColor}`, borderRadius: "99px", color: THEME.primaryColor, fontSize: "10px", fontWeight: "500" }}>{info.date}</div>
                        )}
                      </div>
                      <div style={{ color: THEME.textGrayLight, fontSize: "12px", fontWeight: "400", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100%" }}>{info.desc}</div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "16px", flexShrink: 0 }}>
                      <div style={{ display: "flex", gap: "0px", alignItems: "center" }}>
                        
                        {/* 5개 별점 */}
                        {[1, 2, 3, 4, 5].map((starIndex) => (
                          <svg key={starIndex} width="13" height="13" viewBox="0 0 24 24" fill={starIndex <= starCount ? THEME.starFilled : THEME.starEmpty}><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                        ))}
                        
                        {/* 점수 텍스트 */}
                        {info.date && (
                          <span style={{ marginLeft: "8px", fontSize: "14px", fontWeight: "600", color: THEME.textBlack }}>
                            {avgScore}점
                          </span>
                        )}
                      </div>
                      
                      <button 
                        onClick={() => { if (typeof onSelect === 'function') { onSelect(item); } }} 
                        style={{ 
                          background: "transparent", 
                          color: THEME.success, 
                          border: `1px solid ${THEME.success}`, 
                          borderRadius: "99px", 
                          width: "24px", 
                          height: "24px", 
                          padding: 0, 
                          cursor: "pointer", 
                          transition: "all 0.2s", 
                          display: "flex", 
                          alignItems: "center", 
                          justifyContent: "center" 
                        }} 
                        className="go-btn"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                      </button>
                    </div>

                  </div>
                );
              })
            )}
          </div>
        </section>
      </main>

      <style>{`
        .go-btn:hover { 
          background-color: ${THEME.success} !important; 
          color: ${THEME.white} !important; 
        } 
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}