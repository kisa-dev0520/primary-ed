import React from 'react';
import { supabase } from './supabaseClient';
import notionFace from './assets/notionFace1.png';

const THEME = {
  primary: "#ed742f",
  textBlack: "#121826",
  textGray: "#9CA3AF",
  border: "#E5E7EB",
  white: "#FFFFFF",
  success: "#10B981",
  bg: "#f9fafb",
};

const NAV_ITEMS = [
  {
    key: 'quiz',
    label: '어휘 퀴즈',
    desc: '과목별 어휘를 단계적으로 학습해요',
    color: '#10B981',
    bgColor: '#ECFDF5',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
  },
  {
    key: 'timetable',
    label: '시간표',
    desc: '나만의 주간 시간표를 관리해요',
    color: '#6366F1',
    bgColor: '#EEF2FF',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
  {
    key: 'progress',
    label: '학습 현황',
    desc: '퀴즈 점수와 성장을 한눈에 확인해요',
    color: '#F59E0B',
    bgColor: '#FFFBEB',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
  },
  {
    key: 'tasks',
    label: '할 일 목록',
    desc: '오늘 해야 할 공부를 체크해요',
    color: '#EC4899',
    bgColor: '#FDF2F8',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 11 12 14 22 4"/>
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
  },
];

export default function Home({ user, onNavigate }) {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // 이메일에서 아이디 부분만 추출
  const displayName = user?.email ? user.email.split('@')[0] : '학습자';

  return (
    <div style={{
      minHeight: '100vh',
      background: THEME.bg,
      fontFamily: "'Pretendard', sans-serif",
      color: THEME.textBlack,
    }}>
      {/* 헤더 */}
      <header style={{
        background: THEME.white,
        borderBottom: `1px solid ${THEME.border}`,
        padding: '0 24px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src={notionFace} alt="logo" style={{ width: '32px', mixBlendMode: 'multiply' }} />
          <span style={{ fontSize: '16px', fontWeight: 900, color: THEME.textBlack }}>
            The Primary <span style={{ color: THEME.textGray }}>ED.</span>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span style={{
            fontSize: '13px',
            fontWeight: 600,
            color: THEME.textGray,
            background: '#F3F4F6',
            padding: '6px 12px',
            borderRadius: '999px',
          }}>
            👤 {user?.email || ''}
          </span>
          <button
            onClick={handleLogout}
            style={{
              background: 'transparent',
              border: `1px solid ${THEME.border}`,
              borderRadius: '999px',
              padding: '6px 14px',
              fontSize: '13px',
              fontWeight: 600,
              color: THEME.textGray,
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontFamily: "'Pretendard', sans-serif",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = THEME.textBlack; e.currentTarget.style.borderColor = THEME.textBlack; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = THEME.textGray; e.currentTarget.style.borderColor = THEME.border; }}
          >
            로그아웃
          </button>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main style={{ maxWidth: '720px', margin: '0 auto', padding: '48px 24px 80px' }}>
        {/* 인사 섹션 */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 900, margin: '0 0 8px 0', color: THEME.textBlack }}>
            안녕하세요, <span style={{ color: THEME.primary }}>{displayName}</span> 님! 👋
          </h2>
          <p style={{ fontSize: '15px', color: THEME.textGray, margin: 0, fontWeight: 500 }}>
            오늘도 차근차근 학습해 볼까요?
          </p>
        </div>

        {/* 네비게이션 카드 그리드 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px',
        }}>
          {NAV_ITEMS.map((item) => (
            <NavCard key={item.key} item={item} onClick={() => onNavigate(item.key)} />
          ))}
        </div>
      </main>
    </div>
  );
}

function NavCard({ item, onClick }) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: THEME.white,
        borderRadius: '20px',
        padding: '28px 24px',
        cursor: 'pointer',
        border: `1.5px solid ${isHovered ? item.color : THEME.border}`,
        transition: 'all 0.2s ease',
        transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: isHovered ? `0 8px 24px -4px ${item.color}30` : '0 2px 8px -2px rgba(0,0,0,0.05)',
      }}
    >
      <div style={{
        width: '52px',
        height: '52px',
        borderRadius: '14px',
        background: item.bgColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '16px',
      }}>
        {item.icon}
      </div>
      <div style={{ fontSize: '18px', fontWeight: 900, color: THEME.textBlack, marginBottom: '6px' }}>
        {item.label}
      </div>
      <div style={{ fontSize: '13px', color: THEME.textGray, fontWeight: 500, lineHeight: 1.5 }}>
        {item.desc}
      </div>
    </div>
  );
}