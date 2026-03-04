import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Login from './Login';
import Home from './Home';
import QuizMenu from './pages/QuizMenu';
import QuizEngine from './pages/QuizEngine';
import Timetable from './pages/Timetable';
import StudyProgress from './pages/StudyProgress';
import Tasks from './pages/Tasks';
import { QUIZ_INDEX } from './quizList';

export default function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // 현재 화면 상태
  const [page, setPage] = useState('home'); // 'home' | 'quiz' | 'timetable' | 'progress' | 'tasks'

  // 퀴즈 관련 상태
  const [activeQuizData, setActiveQuizData] = useState(null);
  const [activeMeta, setActiveMeta] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // ── 인증 상태 감지 ──────────────────────────────
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // ── 퀴즈 선택 핸들러 ────────────────────────────
  const handleSelectQuiz = async (menuItem) => {
    setIsLoading(true);
    try {
      const module = await menuItem.loader();
      const quizData = module.default;

      const correctOptions = quizData.map(q => q.options[q.correct]);
      const uniqueOptions = [...new Set(correctOptions)];
      const vocabString = uniqueOptions.length > 0 ? uniqueOptions.join(', ') : '등록된 어휘가 없습니다.';

      setActiveQuizData(quizData);
      setActiveMeta({
        id: menuItem.id,
        title: menuItem.title,
        subtitle: '',
        description: vocabString,
      });
      setPage('quizEngine');
    } catch (error) {
      console.error('Failed to load quiz:', error);
      alert('퀴즈 데이터를 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToHome = () => {
    setPage('home');
    setActiveQuizData(null);
    setActiveMeta(null);
  };

  // ── 로딩 스피너 ─────────────────────────────────
  if (authLoading) {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#F8FAFC', flexDirection: 'column', gap: '10px' }}>
        <div style={{ width: '30px', height: '30px', border: '3px solid #E2E8F0', borderTop: '3px solid #ed742f', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // ── 비로그인 → 로그인 화면 ────────────────────────
  if (!user) return <Login />;

  // ── 퀴즈 로딩 중 ─────────────────────────────────
  if (isLoading) {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#F8FAFC', flexDirection: 'column', gap: '10px' }}>
        <div style={{ width: '30px', height: '30px', border: '3px solid #E2E8F0', borderTop: '3px solid #6366F1', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        <div style={{ fontSize: '16px', fontWeight: '700', color: '#6366F1' }}>문제지 가져오는 중...</div>
      </div>
    );
  }

  // ── 페이지 라우팅 ─────────────────────────────────
  if (page === 'quizEngine' && activeQuizData && activeMeta) {
    return (
      <QuizEngine
        id={activeMeta.id}
        data={activeQuizData}
        meta={activeMeta}
        userId={user.id}
        onBack={() => setPage('quiz')}
      />
    );
  }

  if (page === 'quiz') {
    return (
      <QuizMenu
        db={QUIZ_INDEX}
        onSelect={handleSelectQuiz}
        onBack={handleBackToHome}
      />
    );
  }

  if (page === 'timetable') {
    return <Timetable onBack={handleBackToHome} />;
  }

  if (page === 'progress') {
    return <StudyProgress userId={user.id} onBack={handleBackToHome} />;
  }

  if (page === 'tasks') {
    return <Tasks userId={user.id} onBack={handleBackToHome} />;
  }

  // ── 홈 화면 ──────────────────────────────────────
  return <Home user={user} onNavigate={(key) => setPage(key === 'quiz' ? 'quiz' : key)} />;
}