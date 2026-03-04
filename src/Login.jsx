import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import notionFace from './assets/notionFace1.png';

const THEME = {
  primary: "#ed742f",
  textBlack: "#121826",
  textGray: "#9CA3AF",
  border: "#E5E7EB",
  white: "#FFFFFF",
  success: "#10B981",
  error: "#F43F5E",
  bg: "#f9fafb",
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [mode, setMode] = useState('login'); // 'login' | 'signup'

  const handleSubmit = async () => {
    if (!email || !password) {
      setErrorMsg('이메일과 비밀번호를 모두 입력해 주세요.');
      return;
    }
    setIsLoading(true);
    setErrorMsg('');

    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) setErrorMsg('이메일 또는 비밀번호가 올바르지 않습니다.');
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) setErrorMsg('회원가입에 실패했습니다. 다시 시도해 주세요.');
        else setErrorMsg('✅ 가입 완료! 이메일을 확인하거나 바로 로그인해 주세요.');
      }
    } catch (e) {
      setErrorMsg('오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    fontSize: '15px',
    border: `1px solid ${THEME.border}`,
    borderRadius: '12px',
    outline: 'none',
    fontFamily: "'Pretendard', sans-serif",
    color: THEME.textBlack,
    boxSizing: 'border-box',
    background: THEME.white,
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: THEME.bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Pretendard', sans-serif",
      padding: '20px',
    }}>
      <div style={{
        background: THEME.white,
        borderRadius: '24px',
        padding: '48px 40px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)',
      }}>
        {/* 로고 영역 */}
        <div style={{ textAlign: 'center', marginBottom: '36px', position: 'relative' }}>
          <img
            src={notionFace}
            alt="character"
            style={{ width: '64px', marginBottom: '12px', mixBlendMode: 'multiply' }}
          />
          <h1 style={{ fontSize: '22px', fontWeight: 900, color: THEME.textBlack, margin: '0 0 6px 0' }}>
            The Primary <span style={{ color: THEME.textGray }}>ED. Archive</span>
          </h1>
          <p style={{ fontSize: '13px', color: THEME.textGray, margin: 0 }}>
            초등 문해력 자기주도 학습 플랫폼
          </p>
        </div>

        {/* 탭 */}
        <div style={{ display: 'flex', borderBottom: `1px solid ${THEME.border}`, marginBottom: '28px' }}>
          {['login', 'signup'].map((m) => (
            <div
              key={m}
              onClick={() => { setMode(m); setErrorMsg(''); }}
              style={{
                flex: 1,
                textAlign: 'center',
                paddingBottom: '12px',
                fontSize: '15px',
                fontWeight: 800,
                cursor: 'pointer',
                color: mode === m ? THEME.primary : THEME.textGray,
                borderBottom: mode === m ? `3px solid ${THEME.primary}` : '3px solid transparent',
                marginBottom: '-1px',
                transition: 'all 0.2s',
              }}
            >
              {m === 'login' ? '로그인' : '회원가입'}
            </div>
          ))}
        </div>

        {/* 입력 폼 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            style={inputStyle}
          />
        </div>

        {/* 에러/성공 메시지 */}
        {errorMsg && (
          <div style={{
            marginTop: '12px',
            padding: '10px 14px',
            borderRadius: '10px',
            fontSize: '13px',
            fontWeight: 600,
            background: errorMsg.startsWith('✅') ? '#ECFDF5' : '#FEF2F2',
            color: errorMsg.startsWith('✅') ? THEME.success : THEME.error,
          }}>
            {errorMsg}
          </div>
        )}

        {/* 제출 버튼 */}
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          style={{
            width: '100%',
            marginTop: '20px',
            padding: '15px',
            background: isLoading ? THEME.textGray : THEME.success,
            color: THEME.white,
            border: 'none',
            borderRadius: '999px',
            fontSize: '16px',
            fontWeight: 700,
            cursor: isLoading ? 'default' : 'pointer',
            transition: 'background 0.2s',
            fontFamily: "'Pretendard', sans-serif",
          }}
          onMouseEnter={(e) => { if (!isLoading) e.currentTarget.style.background = '#059669'; }}
          onMouseLeave={(e) => { if (!isLoading) e.currentTarget.style.background = THEME.success; }}
        >
          {isLoading ? '처리 중...' : (mode === 'login' ? '로그인' : '회원가입')}
        </button>
      </div>
    </div>
  );
}