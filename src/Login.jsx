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
  const [mode, setMode] = useState('login');

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

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin }
    });
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
        {/* 로고 */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <img src={notionFace} alt="character" style={{ width: '64px', marginBottom: '12px', mixBlendMode: 'multiply' }} />
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
            <div key={m} onClick={() => { setMode(m); setErrorMsg(''); }} style={{
              flex: 1, textAlign: 'center', paddingBottom: '12px',
              fontSize: '15px', fontWeight: 800, cursor: 'pointer',
              color: mode === m ? THEME.primary : THEME.textGray,
              borderBottom: mode === m ? `3px solid ${THEME.primary}` : '3px solid transparent',
              marginBottom: '-1px', transition: 'all 0.2s',
            }}>
              {m === 'login' ? '로그인' : '회원가입'}
            </div>
          ))}
        </div>

        {/* 입력 폼 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input type="email" placeholder="이메일" value={email}
            onChange={(e) => setEmail(e.target.value)} onKeyDown={handleKeyDown} style={inputStyle} />
          <input type="password" placeholder="비밀번호" value={password}
            onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyDown} style={inputStyle} />
        </div>

        {/* 메시지 */}
        {errorMsg && (
          <div style={{
            marginTop: '12px', padding: '10px 14px', borderRadius: '10px',
            fontSize: '13px', fontWeight: 600,
            background: errorMsg.startsWith('✅') ? '#ECFDF5' : '#FEF2F2',
            color: errorMsg.startsWith('✅') ? THEME.success : THEME.error,
          }}>
            {errorMsg}
          </div>
        )}

        {/* 이메일 로그인 버튼 */}
        <button onClick={handleSubmit} disabled={isLoading} style={{
          width: '100%', marginTop: '20px', padding: '15px',
          background: isLoading ? THEME.textGray : THEME.success,
          color: THEME.white, border: 'none', borderRadius: '999px',
          fontSize: '16px', fontWeight: 700, cursor: isLoading ? 'default' : 'pointer',
          transition: 'background 0.2s', fontFamily: "'Pretendard', sans-serif",
        }}
          onMouseEnter={(e) => { if (!isLoading) e.currentTarget.style.background = '#059669'; }}
          onMouseLeave={(e) => { if (!isLoading) e.currentTarget.style.background = THEME.success; }}
        >
          {isLoading ? '처리 중...' : (mode === 'login' ? '로그인' : '회원가입')}
        </button>

        {/* 구분선 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '16px 0' }}>
          <div style={{ flex: 1, height: '1px', background: THEME.border }} />
          <span style={{ fontSize: '12px', color: THEME.textGray, fontWeight: 600 }}>또는</span>
          <div style={{ flex: 1, height: '1px', background: THEME.border }} />
        </div>

        {/* 구글 로그인 버튼 */}
        <button onClick={handleGoogleLogin} style={{
          width: '100%', padding: '14px', background: THEME.white,
          border: `1px solid ${THEME.border}`, borderRadius: '999px',
          fontSize: '15px', fontWeight: 700, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
          fontFamily: "'Pretendard', sans-serif", color: THEME.textBlack, transition: 'border-color 0.2s',
        }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = '#9CA3AF'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = THEME.border}
        >
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          Google로 로그인
        </button>
      </div>
    </div>
  );
}