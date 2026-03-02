import React, { useState } from 'react';
import QuizEngine from './QuizEngine';
import QuizMenu from './QuizMenu';
import { QUIZ_INDEX } from './quizList';

export default function App() {
  const [activeQuizData, setActiveQuizData] = useState(null);
  const [activeMeta, setActiveMeta] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelect = async (menuItem) => {
    setIsLoading(true);
    try {
      const module = await menuItem.loader(); 
      const quizData = module.default;

      // 🌟 [수정] 오답 포함 모든 보기가 아닌, "정답 어휘"만 추출합니다.
      const correctOptions = quizData.map(q => q.options[q.correct]);
      const uniqueOptions = [...new Set(correctOptions)];
      const vocabString = uniqueOptions.length > 0 ? uniqueOptions.join(", ") : "등록된 어휘가 없습니다.";

      setActiveQuizData(quizData);
      setActiveMeta({
        id: menuItem.id,
        title: menuItem.title,
        subtitle: "", 
        description: vocabString // 🌟 정답 어휘들만 깔끔하게 출력!
      });
    } catch (error) {
      console.error("Failed to load quiz:", error);
      alert("퀴즈 데이터를 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#F8FAFC", flexDirection: "column", gap: "10px" }}>
        <div style={{ width: "30px", height: "30px", border: "3px solid #E2E8F0", borderTop: "3px solid #6366F1", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        <div style={{ fontSize: "16px", fontWeight: "700", color: "#6366F1" }}>문제지 가져오는 중...</div>
      </div>
    );
  }

  if (activeQuizData && activeMeta) {
    return (
      <QuizEngine 
        id={activeMeta.id}
        data={activeQuizData} 
        meta={activeMeta}
        onBack={() => { setActiveQuizData(null); setActiveMeta(null); }} 
      />
    );
  }

  return <QuizMenu db={QUIZ_INDEX} onSelect={handleSelect} />;
}