import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from './supabaseClient'; // 🌟 Supabase 추가
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
    const loadAllData = async () => {
      // DB에서 모든 점수 기록 가져오기
      const { data: dbProgress, error } = await supabase.from('progress').select('*');
      if (error) console.error("DB 불러오기 에러:", error);

      filteredList.forEach(async (item) => {
        if (dynamicInfo[item.id]) return;

        try {
          const module = await item.loader();
          const quizData = module.default;
          
          const targetWords = quizData.map(q => q.options[q.correct]);
          const extractedDesc = targetWords.length > 0 ? targetWords.join(", ") : "등록된 어휘가 없습니다.";

          // 현재 퀴즈에 맞는 최신 데이터 찾기
          const step1Records = dbProgress?.filter(p => p.quiz_id === `${item.id}_step1`) || [];
          const step2Records = dbProgress?.filter(p => p.quiz_id === `${item.id}_step2`) || [];

          const step1Data = step1Records[step1Records.length - 1]; 
          const step2Data = step2Records[step2Records.length - 1]; 

          const score1 = step1Data ? step1Data.score : null;
          const score2 = step2Data ? step2Data.score : null;
          
          // 🌟 1970년 버그 방지: 유효한 타임스탬프(숫자)로 변환 후 비교
          const time1 = step1Data?.created_at ? new Date(step1Data.created_at).getTime() : 0;
          const time2 = step2Data?.created_at ? new Date(step2Data.created_at).getTime() : 0;
          const maxTime = Math.max(time1, time2);
          
          let formattedDate = "";
          // 타임스탬프가 0보다 클 때만 날짜를 표기 (1970년 표기 완벽 차단)
          if (maxTime > 0) {
            const recentDate = new Date(maxTime);
            const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
            formattedDate = `${monthNames[recentDate.getMonth()]} ${recentDate.getDate()}, ${recentDate.getFullYear()}`;
          }

          setDynamicInfo(prev => ({
            ...prev,
            [item.id]: {
              desc: extractedDesc,
              date: formattedDate,
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
    };

    loadAllData();
  }, [filteredList]); 

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
        
        <aside style={{ width: "170px", minWidth: "170px", flexShrink: 0, paddingRight: "25px" }}>
          {subjects.map((sub, sIdx) => {
            const isSubjectActive = activeFilter.subject === sub;
            const subjectColor = isSubjectActive ? THEME.primaryColor : THEME.textBlack;

            return (
              <div key={sub}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px", whiteSpace: "nowrap" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={subjectColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
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
                  <div key={item.id} style={{ padding: "16px 0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", borderBottom: isLastItem ? "none" : `1px solid ${THEME.borderLight}` }}>
                    
                    <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }}>
                      
                      {/* 🌟 제목과 날짜가 착 달라붙게 수정된 부분 */}
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%" }}>
                        <span style={{ fontSize: "18px", fontWeight: "800", color: THEME.textBlack, whiteSpace: "nowrap" }}>
                          {item.title}
                        </span>
                        
                        {info.date && (
                          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", height: "22px", padding: "0 8px", border: `1px solid ${THEME.primaryColor}`, borderRadius: "99px", color: THEME.primaryColor, fontSize: "11px", fontWeight: "700", whiteSpace: "nowrap", flexShrink: 0 }}>
                            {info.date}
                          </div>
                        )}
                      </div>

                      <div style={{ color: THEME.textGrayLight, fontSize: "13px", fontWeight: "500", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", width: "100%", marginTop: "6px" }}>
                        {info.desc}
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
                      <div style={{ display: "flex", gap: "0px", alignItems: "center" }}>
                        {[1, 2, 3, 4, 5].map((starIndex) => (
                          <svg key={starIndex} width="14" height="14" viewBox="0 0 24 24" fill={starIndex <= starCount ? THEME.starFilled : THEME.starEmpty}><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                        ))}
                        
                        {info.date && (
                          <span style={{ marginLeft: "8px", fontSize: "15px", fontWeight: "700", color: THEME.textBlack, whiteSpace: "nowrap" }}>
                            {avgScore}점
                          </span>
                        )}
                      </div>
                      
                      <button 
                        onClick={() => { if (typeof onSelect === 'function') { onSelect(item); } }} 
                        style={{ 
                          background: "transparent", 
                          color: THEME.success, 
                          border: `1.5px solid ${THEME.success}`, 
                          borderRadius: "99px", 
                          width: "28px", 
                          height: "28px", 
                          padding: 0, 
                          cursor: "pointer", 
                          transition: "all 0.2s", 
                          display: "flex", 
                          alignItems: "center", 
                          justifyContent: "center",
                          flexShrink: 0,
                          marginLeft: "4px"
                        }} 
                        className="go-btn"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
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