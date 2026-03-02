import { useState, useCallback, useEffect } from "react";
import { supabase } from './supabaseClient'; // 🌟 Supabase 연결 통로 추가

// ==========================================
// 🎨 1. 디자인 테마 (Design Theme)
// ==========================================
const THEME = {
  colors: { 
    bg: "#d2d5db",             
    white: "#FFFFFF",          
    textMain: "#121826",       
    textSub: "#777c8c",
    textSub2: "#3e3f42",  
    border: "#E5E7EB",         
    optionBorder: "#94979c",   
    primary: "#ed742f",        
    primaryLight: "#94979c",   
    primaryDark: "#ed742f",    
    meaning : "#F43F5E",       
    error: "#F43F5E",          
    errorBg: "#FEF2F2",        
    correctText: "#10B981",    
    correctHover: "#059669",   
    correctBg: "#ECFDF5"       
  },
  shadows: { 
    card: "0 10px 25px -5px rgba(0, 0, 0, 0.05)",    
    overlay: "0 10px 40px -10px rgba(0, 0, 0, 0.15)" 
  },
  radius: { 
    md: "12px",                
    lg: "24px",                
    pill: "999px"              
  },
  fonts: { main: "'Pretendard', sans-serif" } 
};

const LAYOUT = { maxWidth: "640px", pagePadding: "50px" }; 
const CIRCLED_NUMBERS = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩'];

// ==========================================
// 🛠️ 2. 데이터 처리 및 텍스트 변환 유틸리티
// ==========================================
function shuffleArray(arr) { 
  const a = [...arr]; 
  for (let i = a.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [a[i], a[j]] = [a[j], a[i]]; 
  } 
  return a; 
}

function buildShuffled(data, stepMode = 1) { 
  return data.map((q) => { 
    const indices = q.options.map((_, i) => i); 
    const shuffled = shuffleArray(indices); 
    
    const currentItemMode = stepMode === 3 ? (Math.random() < 0.5 ? 1 : 2) : stepMode;
    const isStep2 = currentItemMode === 2;
    const targetWord = q.options[q.correct];

    const step2Question = [
      { type: "step2_instruction", content: "다음 어휘의 알맞은 뜻을 고르세요." },
      { type: "step2_target", content: targetWord } 
    ];

    return { 
      ...q, 
      appliedMode: currentItemMode, 
      originalQuestion: q.question, 
      question: isStep2 ? step2Question : q.question, 
      shuffledIndices: shuffled, 
      options: shuffled.map((i) => isStep2 ? q.meanings[i] : q.options[i]),     
      meanings: shuffled.map((i) => isStep2 ? q.options[i] : q.meanings[i]),   
      correct: shuffled.indexOf(q.correct), 
      originalCorrectText: isStep2 ? q.meanings[q.correct] : q.options[q.correct] 
    }; 
  }); 
}

function hasJongseong(word) {
  if (!word) return false;
  const charCode = word.charCodeAt(word.length - 1);
  if (charCode < 0xAC00 || charCode > 0xD7A3) return false;
  return (charCode - 0xAC00) % 28 !== 0;
}

function generateCompletedSentence(questionParts, correctWord) {
  if (!questionParts || questionParts.length === 0) return [];
  
  const parts = [];
  let isFirst = true;
  
  for (let p of questionParts) {
    if (p.type === "break") {
      if (parts.length > 0) {
        const lastPart = parts[parts.length - 1];
        if (lastPart.type === "text") {
          if (!lastPart.content.endsWith(" ")) lastPart.content += " ";
        } else {
          parts.push({ type: "text", content: " " });
        }
      }
    } else {
      const newPart = { ...p };
      if (isFirst && newPart.type === "text") {
        newPart.content = '"' + newPart.content;
        isFirst = false;
      } else if (isFirst) {
        parts.push({ type: "text", content: '"' });
        isFirst = false;
      }
      parts.push(newPart);
    }
  }

  const lastIdx = parts.length - 1;
  const validWord = correctWord || ""; 
  const hasJong = hasJongseong(validWord);

  if (parts[lastIdx] && typeof parts[lastIdx].content === 'string') {
    let lastText = parts[lastIdx].content;
    lastText = lastText.replace(/(무엇|뭐)(이)?라고 할까요\??\s*$/, "");
    lastText = lastText.replace(/무엇일까요\??\s*$/, "");
    lastText = lastText.replace(/\?\s*$/, ""); 
    lastText = lastText.trimEnd() + " "; 
    parts[lastIdx].content = lastText;
  }
  
  parts.push({ type: "textMain_bold", content: validWord }); 
  parts.push({ type: "text", content: hasJong ? "이라고 합니다.\"" : "라고 합니다.\"" });
  
  return parts;
}

function RichText({ parts }) { 
  return (
    <div style={{ fontSize: "inherit", lineHeight: 1.6, color: "inherit", fontWeight: 500, wordBreak: "keep-all" }}>
      {parts.map((p, i) => { 
        if (p.type === "highlight") return <span key={i} style={{ fontWeight: 700, color: THEME.colors.primary }}>{p.content}</span>; 
        if (p.type === "bold") return <strong key={i} style={{ fontWeight: 700, color: "inherit" }}>{p.content}</strong>; 
        if (p.type === "textMain_bold") return <strong key={i} style={{ fontWeight: 700, color: THEME.colors.textMain }}>{p.content}</strong>;
        if (p.type === "break") return <br key={i} />; 

        if (p.type === "step2_instruction") {
          return (
            <div key={i} style={{
              fontSize: "15px",         
              fontWeight: 500,          
              color: THEME.colors.textSub, 
              textAlign: "left",      
              marginBottom: "30px"      
            }}>
              {p.content}
            </div>
          );
        }
        
        if (p.type === "step2_target") {
          return (
            <div key={i} style={{ 
              textAlign: "center",      
              fontSize: "36px",         
              fontWeight: 900,          
              color: THEME.colors.textMain, 
              marginTop: "0px",         
              marginBottom: "10px",     
              letterSpacing: "-0.5px"   
            }}>
              {p.content}
            </div>
          );
        }

        return <span key={i}>{p.content}</span>; 
      })}
    </div>
  ); 
}

// ==========================================
// 🎨 3. UI 구성 요소
// ==========================================
const Icons = { 
  Back: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>,
  Bulb: ({ color }) => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={color || THEME.colors.primaryLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A6 6 0 1 0 7.5 11.5c.76.76 1.23 1.52 1.41 2.5Z"/></svg>,
  CheckCircle: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>, 
  XCircle: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>,
  Star: ({ filled, size = 32 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "#FBBF24" : "#E5E7EB"} style={{ margin: "0 4px" }}>
      <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" />
    </svg>
  ),
  Bookmark: ({ filled, color }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={filled ? color : "none"} stroke={color || "#9CA3AF"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
    </svg>
  ),
  NotePage: ({ color, size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  ),
  Close: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={THEME.colors.textMain} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  )
};

const VocabItem = ({ word, meaning, isBookmarked, toggleBookmark, isLast }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", paddingBottom: "16px", borderBottom: isLast ? "none" : `1px dashed ${THEME.colors.border}` }}>
      <div 
        onClick={() => toggleBookmark(word)} 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.85)"}
        onMouseUp={(e) => e.currentTarget.style.transform = "scale(1.15)"}
        style={{ 
          cursor: "pointer", 
          flexShrink: 0, 
          marginTop: "2px", 
          transition: "transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.2s",
          transform: isHovered ? "scale(1.15)" : "scale(1)",
          opacity: isHovered && !isBookmarked ? 0.8 : 1 
        }}
      >
        <Icons.Bookmark 
          filled={isBookmarked} 
          color={
            isBookmarked 
              ? THEME.colors.primary 
              : (isHovered ? THEME.colors.primaryLight : THEME.colors.textSub) 
          } 
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <span style={{ fontSize: "18px", fontWeight: 800, color: THEME.colors.textMain }}>{word}</span>
        <span style={{ fontSize: "15px", fontWeight: 500, color: THEME.colors.textSub, lineHeight: 1.5, wordBreak: "keep-all" }}>{meaning}</span>
      </div>
    </div>
  );
};

const OptionItem = ({ idx, opt, isHintOpen, selected, handleSelect, setHintIndex, meaning, stepMode }) => {
  const [isMainHovered, setIsMainHovered] = useState(false); 
  const [isBulbHovered, setIsBulbHovered] = useState(false); 

  const baseStyle = {
    width: "100%", padding: "16px 30px", background: "transparent", 
    border: `1px solid ${THEME.colors.optionBorder}`, 
    borderRadius: THEME.radius.lg, 
    cursor: selected === null ? "pointer" : "default", 
    display: "flex", flexDirection: "column", transition: "all 0.2s ease", outline: "none",
  };
  
  const finalStyle = (isMainHovered && !isBulbHovered && selected === null) ? { 
    ...baseStyle, border: `1px solid ${THEME.colors.primary}`, background: "#fffcf7"
  } : baseStyle;

  const bulbColor = (isBulbHovered || isHintOpen) ? THEME.colors.meaning : THEME.colors.primaryDark;

  return (
    <button 
      disabled={selected !== null} 
      onClick={() => handleSelect(idx)} 
      onMouseEnter={() => setIsMainHovered(true)} 
      onMouseLeave={() => setIsMainHovered(false)} 
      style={finalStyle}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <span style={{ fontSize: "22px", color: THEME.colors.textSub, fontWeight: 400, marginTop: "1px" }}>
            {CIRCLED_NUMBERS[idx] || (idx + 1)}
          </span>
          <span style={{ 
            fontSize: stepMode === 2 ? "16px" : "20px", 
            fontWeight: stepMode === 2 ? 600 : 700, 
            color: THEME.colors.textMain, 
            textAlign: "left",
            lineHeight: 1.4,
            wordBreak: "keep-all" 
          }}>
            {opt}
          </span>
        </div>
        
        {stepMode === 1 && (
          <div 
            onClick={(e) => { 
              e.stopPropagation(); 
              if (selected === null) setHintIndex(isHintOpen ? null : idx); 
            }}
            onMouseEnter={() => setIsBulbHovered(true)} 
            onMouseLeave={() => setIsBulbHovered(false)} 
            style={{ display: "flex", alignItems: "center", padding: "4px", cursor: "pointer", zIndex: 2 }}
          >
            <Icons.Bulb color={bulbColor} />
          </div>
        )}
      </div>

      {stepMode === 1 && isHintOpen && (
        <div style={{ 
          marginTop: "12px", paddingTop: "12px", borderTop: `1px dashed ${THEME.colors.border}`, 
          width: "100%", textAlign: "left", fontSize: "16px", color: THEME.colors.primaryDark, 
          lineHeight: 1.5, wordBreak: "keep-all", fontWeight: 500, paddingLeft: "36px", boxSizing: "border-box"
        }}>
          {meaning}
        </div>
      )}
    </button>
  );
};

const Wrapper = ({ children }) => (
  <div style={{ height: "100vh", overflowY: "scroll", background: THEME.colors.bg, display: "flex", justifyContent: "center", fontFamily: THEME.fonts.main }}>
    <div style={{ width: "100%", maxWidth: LAYOUT.maxWidth, background: THEME.colors.white, minHeight: "100%", display: "flex", flexDirection: "column", position: "relative", boxShadow: THEME.shadows.card }}>
      {children}
    </div>
  </div>
);

// ==========================================
// 🚀 4. 메인 퀴즈 시스템 컴포넌트
// ==========================================
export default function QuizEngine({ id, data, meta, onBack }) {
  const [questions, setQuestions] = useState([]);         
  const [current, setCurrent] = useState(0);              
  const [selected, setSelected] = useState(null);         
  const [gameState, setGameState] = useState('start');    
  const [correctIds, setCorrectIds] = useState(new Set()); 
  const [isClickable, setIsClickable] = useState(false);  
  const [hintIndex, setHintIndex] = useState(null);       
  const [stepMode, setStepMode] = useState(1);            
  
  const [step1Stats, setStep1Stats] = useState(null); 
  const [step1WrongIds, setStep1WrongIds] = useState(new Set()); 
  const [reviewData, setReviewData] = useState(null); 

  const [isVocabModalOpen, setIsVocabModalOpen] = useState(false);
  
  const [bookmarkedWords, setBookmarkedWords] = useState(() => {
    const saved = localStorage.getItem('quiz_bookmarks');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const toggleBookmark = (word) => {
    setBookmarkedWords(prev => {
      const next = new Set(prev);
      if (next.has(word)) next.delete(word);
      else next.add(word);
      localStorage.setItem('quiz_bookmarks', JSON.stringify([...next]));
      return next;
    });
  };

  const initQuiz = useCallback((mode = 1, customData = null) => {
    const targetData = customData || data;
    
    if (mode === 1) {
      setStep1Stats(null);
      setStep1WrongIds(new Set());
      setReviewData(null);
    }

    setCorrectIds(new Set()); 
    const shuffled = shuffleArray(targetData); 
    setStepMode(mode); 
    setQuestions(buildShuffled(shuffled, mode)); 
    setCurrent(0); 
    setSelected(null); 
    setHintIndex(null); 
    setIsVocabModalOpen(false); 
    setGameState('quiz'); 
    
    setIsClickable(false);
    setTimeout(() => setIsClickable(true), 400);
  }, [data]);

  const handleStart = () => initQuiz(1); 
  const handleHome = () => { if (onBack) onBack(); else setGameState('start'); };

  const q = questions[current]; 
  const totalInSession = questions.length; 
  const totalOriginal = data.length; 
  const currentScore = correctIds.size; 
  const progressPercent = totalInSession > 0 ? ((current) / totalInSession) * 100 : 0; 

  // 🌟 DB 연동 및 로컬 저장 핵심 로직 (수정됨)
  useEffect(() => {
    if (gameState === 'result' && id && stepMode !== 3) {
      const percentage = totalOriginal > 0 ? Math.round((currentScore / totalOriginal) * 100) : 0;
      const today = new Date();
      const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      const formattedDate = `${monthNames[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
      
      // 기기 로컬 저장 유지
      localStorage.setItem(`quiz_progress_${id}_step${stepMode}`, JSON.stringify({ date: formattedDate, score: percentage }));

      // Supabase DB 저장 실행
      const saveToDB = async () => {
        const wrongAnswers = questions
          .filter((_, index) => !correctIds.has(index))
          .map(q => q.options[q.correct]);

        const { data, error } = await supabase
          .from('progress')
          .insert([{ 
            quiz_id: `${id}_step${stepMode}`,
            score: percentage,
            total_questions: totalInSession,
            incorrect_answers: wrongAnswers
          }]);

        if (error) {
          console.error('DB 저장 에러:', error);
        } else {
          console.log('DB 저장 성공! 데이터:', data);
        }
      };

      saveToDB();
    }
  }, [gameState, id, currentScore, totalOriginal, stepMode, questions, correctIds, totalInSession]);

  const handleSelect = (idx) => { 
    if (selected !== null || !isClickable) return; 
    setSelected(idx); 
    if (idx === q.correct) setCorrectIds(prev => new Set(prev).add(current)); 
  };
  
  const handleNext = () => { 
    if (current + 1 >= totalInSession) { 
      if (stepMode === 1) {
        setStep1Stats({ score: correctIds.size, total: totalInSession });
        const wIds = questions
          .filter((_, index) => !correctIds.has(index))
          .map(q => q.id || q.options[q.correct]); 
        setStep1WrongIds(new Set(wIds));
      }
      setGameState('result'); 
    } else { 
      setCurrent((c) => c + 1); 
      setSelected(null); 
      setHintIndex(null); 
      setIsClickable(false);
      setTimeout(() => setIsClickable(true), 400); 
    } 
  };

  const handleWrongAnswers = () => {
    const s2WrongIds = questions
      .filter((_, index) => !correctIds.has(index))
      .map(q => q.id || q.options[q.correct]);
      
    const combinedIds = new Set([...step1WrongIds, ...s2WrongIds]);
    const originalWrongData = data.filter(d => combinedIds.has(d.id || d.options[d.correct]));
    
    setReviewData(originalWrongData); 
    initQuiz(3, originalWrongData);   
  };

  const renderVocabModal = () => (
    <div 
      style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(18, 24, 38, 0.4)", zIndex: 100,
        opacity: isVocabModalOpen ? 1 : 0,
        pointerEvents: isVocabModalOpen ? "auto" : "none",
        transition: "opacity 0.3s ease",
        display: "flex", alignItems: "center", justifyContent: "center", padding: "20px"
      }}
      onClick={() => setIsVocabModalOpen(false)} 
    >
      <div 
        onClick={(e) => e.stopPropagation()} 
        style={{
          background: THEME.colors.white, width: "100%", maxWidth: "420px", maxHeight: "80%", 
          borderRadius: THEME.radius.lg, boxShadow: THEME.shadows.overlay, 
          display: "flex", flexDirection: "column",
          transform: isVocabModalOpen ? "translateY(0)" : "translateY(30px)",
          transition: "transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px", borderBottom: `1px solid ${THEME.colors.border}` }}>
          <span style={{ fontSize: "20px", fontWeight: 800, color: THEME.colors.textSub }}>어휘 목록</span>
          <button onClick={() => setIsVocabModalOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}>
            <Icons.Close />
          </button>
        </div>

        <div style={{ padding: "20px 24px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "16px" }}>
          {data.map((q, i) => (
            <VocabItem 
              key={i}
              word={q.options[q.correct]}
              meaning={q.meanings[q.correct]}
              isBookmarked={bookmarkedWords.has(q.options[q.correct])}
              toggleBookmark={toggleBookmark}
              isLast={i === data.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );

  // --- 1. 시작 화면 ---
  if (gameState === 'start') {
    return (
      <Wrapper>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: LAYOUT.pagePadding }}>
          <div style={{ position: "absolute", top: "32px", left: "32px" }}>
            <button onClick={handleHome} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", padding: 0 }}><Icons.Back /></button>
          </div>
          <div style={{ fontSize: "16px", fontWeight: 700, color: THEME.colors.primary, letterSpacing: "1px", marginBottom: "16px", textTransform: "uppercase" }}>Vocabulary Quiz</div>
          <h1 style={{ fontSize: "32px", fontWeight: 900, color: THEME.colors.textMain, textAlign: "center", margin: "0 0 16px 0" }}>{meta.title}</h1>
          <p style={{ fontSize: "16px", color: THEME.colors.textSub, textAlign: "center", marginBottom: "48px", lineHeight: 1.6 }}>{meta.description}</p>
          <button 
            onClick={handleStart} 
            style={{ width: "100%", maxWidth: "300px", padding: "18px", background: THEME.colors.correctText, color: "white", border: "none", borderRadius: THEME.radius.pill, fontSize: "18px", fontWeight: 700, cursor: "pointer", transition: "transform 0.1s, background 0.2s ease" }} 
            onMouseEnter={(e) => e.currentTarget.style.background = THEME.colors.correctHover}
            onMouseLeave={(e) => e.currentTarget.style.background = THEME.colors.correctText}
            onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.98)"} 
            onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            시작하기
          </button>
        </div>
      </Wrapper>
    );
  }

  // --- 2. 결과 화면 ---
  if (gameState === 'result') {
    
    if (stepMode === 1) {
      return (
        <Wrapper>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: LAYOUT.pagePadding, position: "relative" }}>
            <div style={{ fontSize: "20px", fontWeight: 800, color: THEME.colors.primary, letterSpacing: "0px", marginBottom: "20px", textTransform: "uppercase" }}>
              STEP 1 결과
            </div>
            
            <div style={{ fontSize: "36px", fontWeight: 900, color: THEME.colors.textMain, margin: "0 0 20px 0", letterSpacing: "-1px" }}>
              수고하셨습니다 👏
            </div>
            
            <p style={{ fontSize: "20px", color: THEME.colors.textSub, textAlign: "center", marginBottom: "60px", lineHeight: 1.6 }}>
              총 {totalInSession}문제 중 <strong style={{color: THEME.colors.textMain, fontSize: "30px", fontWeight: 900, padding: "0 4px"}}>{currentScore}</strong>개를 맞혔어요!
            </p>
            
            <div style={{ width: "100%", maxWidth: "300px", display: "flex", flexDirection: "column", gap: "12px" }}>
              <button 
                onClick={() => initQuiz(2)} 
                style={{ width: "100%", padding: "18px", background: THEME.colors.correctText, color: "white", border: "none", borderRadius: THEME.radius.pill, fontSize: "18px", fontWeight: 700, cursor: "pointer", transition: "transform 0.1s, background 0.2s ease" }} 
                onMouseEnter={(e) => e.currentTarget.style.background = THEME.colors.correctHover}
                onMouseLeave={(e) => e.currentTarget.style.background = THEME.colors.correctText}
                onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.98)"} 
                onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                STEP 2 시작하기
              </button>
            </div>
          </div>
        </Wrapper>
      );
    }
    
    if (stepMode === 2) {
      const s1Score = step1Stats ? step1Stats.score : 0;
      const s1Total = step1Stats ? step1Stats.total : 0;
      
      const combinedScore = s1Score + currentScore;
      const combinedTotal = s1Total + totalInSession;
      
      const percentage = combinedTotal > 0 ? Math.round((combinedScore / combinedTotal) * 100) : 0;
      const starCount = Math.round((percentage / 100) * 5); 
      
      const s2WrongIds = questions.filter((_, index) => !correctIds.has(index)).map(q => q.id || q.options[q.correct]);
      const totalWrongCount = new Set([...step1WrongIds, ...s2WrongIds]).size;
      const hasWrongAnswers = totalWrongCount > 0;

      return (
        <Wrapper>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: LAYOUT.pagePadding, position: "relative" }}>
            
            <div style={{ position: "absolute", top: "32px", right: "32px" }}>
              <button 
                onClick={() => setIsVocabModalOpen(true)} 
                style={{ 
                  background: THEME.colors.white, 
                  border: `1px solid ${THEME.colors.textSub}`, 
                  borderRadius: "99px",
                  cursor: "pointer", 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "4px", 
                  padding: "6px 12px",
                  color: THEME.colors.textSub, 
                  boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
                  transition: "all 0.2s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = THEME.colors.textMain;
                  e.currentTarget.style.color = THEME.colors.textMain;
                  e.currentTarget.style.background = "#f9fafb";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = THEME.colors.textSub;
                  e.currentTarget.style.color = THEME.colors.textSub;
                  e.currentTarget.style.background = THEME.colors.white;
                }}
                onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.95)"}
                onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                <Icons.NotePage color="currentColor" size="16" />
                <span style={{ fontSize: "13px", fontWeight: 700, color: "inherit" }}>어휘 목록</span>
              </button>
            </div>

            <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
              
              <div style={{ fontSize: "36px", fontWeight: 900, color: THEME.colors.textMain, margin: "0 0 30px 0", letterSpacing: "-1px" }}>
                수고하셨습니다 👏
              </div>

              <div style={{ display: "flex", justifyContent: "center", marginBottom: "40px" }}>
                {[...Array(5)].map((_, i) => <Icons.Star key={i} filled={i < starCount} />)}
              </div>
              
              <p style={{ fontSize: "18px", fontWeight: 600, color: THEME.colors.textSub, textAlign: "center", marginBottom: "50px", lineHeight: 1.6 }}>
                STEP 1, 2의 총 {combinedTotal}문제 중 <strong style={{color: THEME.colors.textMain, fontSize: "28px", fontWeight: 900, padding: "0 4px"}}>{combinedScore}</strong>개를 맞혔어요!
              </p>
              
              <div style={{ width: "100%", maxWidth: "300px", display: "flex", flexDirection: "column", gap: "14px" }}>
                {hasWrongAnswers && (
                  <button 
                    onClick={handleWrongAnswers} 
                    style={{ width: "100%", padding: "14px", background: THEME.colors.textSub, color: "white", border: "none", borderRadius: THEME.radius.pill, fontSize: "17px", fontWeight: 700, cursor: "pointer", transition: "transform 0.1s, background 0.2s ease" }} 
                    onMouseEnter={(e) => e.currentTarget.style.background = THEME.colors.textMain}
                    onMouseLeave={(e) => e.currentTarget.style.background = THEME.colors.textSub}
                    onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.98)"} 
                    onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"}
                  >
                    오답 풀기
                  </button>
                )}
                
                <button 
                  onClick={() => initQuiz(1)} 
                  style={{ width: "100%", padding: "14px", background: "transparent", color: THEME.colors.textSub, border: `1px solid ${THEME.colors.textSub}`, borderRadius: THEME.radius.pill, fontSize: "17px", fontWeight: 700, cursor: "pointer", transition: "all 0.2s ease" }} 
                  onMouseEnter={(e) => { e.currentTarget.style.background = THEME.colors.textSub; e.currentTarget.style.color = "white"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = THEME.colors.textSub; }}
                  onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.98)"} 
                  onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"}
                >
                  처음부터 다시 풀기
                </button>
                
                <button 
                  onClick={handleHome} 
                  style={{ width: "100%", padding: "14px", background: THEME.colors.correctText, color: "white", border: "none", borderRadius: THEME.radius.pill, fontSize: "17px", fontWeight: 700, cursor: "pointer", transition: "transform 0.1s, background 0.2s ease" }} 
                  onMouseEnter={(e) => e.currentTarget.style.background = THEME.colors.correctHover}
                  onMouseLeave={(e) => e.currentTarget.style.background = THEME.colors.correctText}
                  onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.98)"} 
                  onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"}
                >
                  목록으로 돌아가기
                </button>
              </div>
            </div>
          </div>
          {renderVocabModal()}
        </Wrapper>
      );
    }

    if (stepMode === 3) {
      const percentage = totalInSession > 0 ? Math.round((currentScore / totalInSession) * 100) : 0;
      const starCount = Math.round((percentage / 100) * 5); 
      
      const stillHasWrongAnswers = currentScore < totalInSession;

      return (
        <Wrapper>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: LAYOUT.pagePadding, position: "relative" }}>
            
            <div style={{ position: "absolute", top: "32px", right: "32px" }}>
              <button 
                onClick={() => setIsVocabModalOpen(true)} 
                style={{ 
                  background: THEME.colors.white, 
                  border: `1px solid ${THEME.colors.textSub}`, 
                  borderRadius: "99px",
                  cursor: "pointer", 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "4px", 
                  padding: "6px 12px",
                  color: THEME.colors.textSub, 
                  boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
                  transition: "all 0.2s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = THEME.colors.textMain;
                  e.currentTarget.style.color = THEME.colors.textMain;
                  e.currentTarget.style.background = "#f9fafb";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = THEME.colors.textSub;
                  e.currentTarget.style.color = THEME.colors.textSub;
                  e.currentTarget.style.background = THEME.colors.white;
                }}
                onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.95)"}
                onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                <Icons.NotePage color="currentColor" size="16" />
                <span style={{ fontSize: "13px", fontWeight: 700, color: "inherit" }}>어휘 목록</span>
              </button>
            </div>

            <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>

              <div style={{ fontSize: "36px", fontWeight: 900, color: THEME.colors.textMain, margin: "0 0 30px 0", letterSpacing: "-1px" }}>
                수고하셨습니다 👏
              </div>

              <div style={{ display: "flex", justifyContent: "center", marginBottom: "40px" }}>
                {[...Array(5)].map((_, i) => <Icons.Star key={i} filled={i < starCount} />)}
              </div>
              
              <p style={{ fontSize: "18px", color: THEME.colors.textSub, textAlign: "center", marginBottom: "50px", lineHeight: 1.6 }}>
                오답 {totalInSession}문제 중 <strong style={{color: THEME.colors.textMain, fontSize: "28px", fontWeight: 900, padding: "0 4px"}}>{currentScore}</strong>개를 맞혔어요!
              </p>
              
              <div style={{ width: "100%", maxWidth: "300px", display: "flex", flexDirection: "column", gap: "14px" }}>
                {stillHasWrongAnswers && (
                  <button 
                    onClick={() => {
                      const remainingWrongIds = new Set(
                        questions.filter((_, idx) => !correctIds.has(idx)).map(q => q.id || q.options[q.correct])
                      );
                      const remainingData = reviewData.filter(d => remainingWrongIds.has(d.id || d.options[d.correct]));
                      setReviewData(remainingData);
                      initQuiz(3, remainingData);
                    }} 
                    style={{ width: "100%", padding: "14px", background: THEME.colors.textSub, color: "white", border: "none", borderRadius: THEME.radius.pill, fontSize: "17px", fontWeight: 700, cursor: "pointer", transition: "transform 0.1s, background 0.2s ease" }} 
                    onMouseEnter={(e) => e.currentTarget.style.background = THEME.colors.textMain}
                    onMouseLeave={(e) => e.currentTarget.style.background = THEME.colors.textSub}
                    onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.98)"} 
                    onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"}
                  >
                    오답 다시 풀기
                  </button>
                )}
                
                <button 
                  onClick={() => initQuiz(1)} 
                  style={{ width: "100%", padding: "14px", background: "transparent", color: THEME.colors.textSub, border: `1px solid ${THEME.colors.textSub}`, borderRadius: THEME.radius.pill, fontSize: "17px", fontWeight: 700, cursor: "pointer", transition: "all 0.2s ease" }} 
                  onMouseEnter={(e) => { e.currentTarget.style.background = THEME.colors.textSub; e.currentTarget.style.color = "white"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = THEME.colors.textSub; }}
                  onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.98)"} 
                  onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"}
                >
                  처음부터 다시 풀기
                </button>
                
                <button 
                  onClick={handleHome} 
                  style={{ width: "100%", padding: "14px", background: THEME.colors.correctText, color: "white", border: "none", borderRadius: THEME.radius.pill, fontSize: "17px", fontWeight: 700, cursor: "pointer", transition: "transform 0.1s, background 0.2s ease" }} 
                  onMouseEnter={(e) => e.currentTarget.style.background = THEME.colors.correctHover}
                  onMouseLeave={(e) => e.currentTarget.style.background = THEME.colors.correctText}
                  onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.98)"} 
                  onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"}
                >
                  목록으로 돌아가기
                </button>
              </div>
            </div>
          </div>
          {renderVocabModal()}
        </Wrapper>
      );
    }
  }

  // --- 3. 퀴즈 진행 화면 ---
  if (!q) return null;
  const isCorrect = selected === q.correct; 
  const isLastQuestion = current + 1 >= totalInSession; 
  
  const currentQMode = q.appliedMode || stepMode; 

  const actualWord = currentQMode === 2 ? q.meanings[q.correct] : q.options[q.correct];

  return (
    <Wrapper>
      <div style={{ width: "100%", padding: `38px ${LAYOUT.pagePadding} 0 ${LAYOUT.pagePadding}`, boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "32px" }}>
          <button onClick={handleHome} style={{ position: "absolute", left: 0, background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex" }}>
            <Icons.Back />
          </button>
          <span style={{ fontSize: "20px", fontWeight: 800, color: THEME.colors.textMain }}>
            {meta.title} 
            {stepMode === 2 && <span style={{color: THEME.colors.primary}}> (Step 2)</span>}
            {stepMode === 3 && <span style={{color: THEME.colors.primary}}> (오답 풀기)</span>}
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "50px", marginTop: "-56px" }}>
          <div style={{ textAlign: "right", fontSize: "14px", fontWeight: 600, color: THEME.colors.textSub, letterSpacing: "1px" }}>
            {current + 1} / {totalInSession}
          </div>
          <div style={{ width: "100%", height: "2px", background: THEME.colors.border, borderRadius: "4px", position: "relative", overflow: "hidden" }}>
             <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${progressPercent}%`, background: THEME.colors.primary, borderRadius: "4px", transition: "width 0.4s ease" }} />
          </div>
        </div>
      </div>
      
      <main style={{ flex: 1, width: "100%", padding: `0 ${LAYOUT.pagePadding} 60px ${LAYOUT.pagePadding}`, boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
        
        <div style={{ marginBottom: "50px", textAlign: "left", fontSize: "18px", color: THEME.colors.textMain }}>
          <RichText parts={q.question} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", alignItems: "start", position: "relative" }}>
          
          <div style={{ 
            gridArea: "1 / 1", 
            display: "flex", flexDirection: "column", gap: "16px",
            opacity: selected !== null ? 0 : 1, 
            transition: selected !== null ? "opacity 0.2s ease" : "none", 
            pointerEvents: selected !== null ? "none" : "auto" 
          }}>
            {q.options.map((opt, idx) => (
              <OptionItem 
                key={idx} idx={idx} opt={opt} isHintOpen={hintIndex === idx} selected={selected}
                handleSelect={handleSelect} setHintIndex={setHintIndex} meaning={q.meanings[idx]} 
                stepMode={currentQMode} 
              />
            ))}
          </div>

          <div style={{ 
            gridArea: "1 / 1", 
            background: THEME.colors.white, border: `1px solid ${THEME.colors.textMain}`,
            borderRadius: THEME.radius.lg, boxShadow: THEME.shadows.overlay,
            padding: "20px 20px", display: "flex", flexDirection: "column", justifyContent: "space-between",
            
            opacity: selected !== null ? 1 : 0,  
            transform: selected !== null ? "translateY(0)" : "translateY(30px)", 
            transition: selected !== null ? "opacity 0.4s ease-out, transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)" : "none", 
            
            pointerEvents: selected !== null ? "auto" : "none",
            zIndex: 10 
          }}>
            <div>
              <div style={{ 
                marginBottom: "30px", padding: "13px 20px", 
                background: isCorrect ? THEME.colors.correctBg : THEME.colors.errorBg, 
                borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.3s ease"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ color: isCorrect ? THEME.colors.correctText : THEME.colors.error, display: "flex" }}>
                    {isCorrect ? <Icons.CheckCircle /> : <Icons.XCircle />}
                  </div>
                  <div style={{ fontSize: "22px", fontWeight: 800, color: isCorrect ? THEME.colors.correctText : THEME.colors.error }}>
                    {isCorrect ? "정답입니다!" : "오답입니다."}
                  </div>
                </div>
              </div>
              
              <div style={{ marginBottom: "24px", paddingLeft: "4px" }}>
                <span style={{ fontSize: "17px", fontWeight: 600, color: THEME.colors.textSub, marginRight: "14px" }}>정답:</span>
                <strong style={{ fontSize: currentQMode === 2 ? "18px" : "24px", color: THEME.colors.textMain, lineHeight: 1.4, wordBreak: "keep-all" }}>
                  {q.originalCorrectText}
                </strong>
              </div>

              <div style={{ fontSize: "16px", lineHeight: 1.6, color: THEME.colors.textSub2, paddingLeft: "4px" }}>
                {currentQMode === 2 && q.originalQuestion ? (
                  <RichText parts={generateCompletedSentence(q.originalQuestion, actualWord)} />
                ) : (
                  <RichText parts={q.explanation} />
                )}
              </div>
            </div>
            
            <button 
              onClick={handleNext} 
              style={{ 
                width: "100%", maxWidth: "200px", margin: "40px auto 0 auto", padding: "12px", 
                background: isLastQuestion ? THEME.colors.correctText : THEME.colors.textSub, 
                color: "white", border: "none", borderRadius: THEME.radius.pill, 
                fontSize: "16px", fontWeight: 700, cursor: "pointer", transition: "transform 0.1s, background 0.2s ease" 
              }} 
              onMouseEnter={(e) => e.currentTarget.style.background = isLastQuestion ? THEME.colors.correctHover : THEME.colors.textMain}
              onMouseLeave={(e) => e.currentTarget.style.background = isLastQuestion ? THEME.colors.correctText : THEME.colors.textSub}
              onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.98)"} 
              onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              {isLastQuestion 
                ? (stepMode === 1 ? "STEP 1 결과 확인" : (stepMode === 2 ? "최종 결과 확인" : "오답 풀기 결과")) 
                : "다음 문제"
              }
            </button>
          </div>
        </div>
      </main>
    </Wrapper>
  );
}