import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { QUIZ_INDEX } from '../quizList';

const THEME = {
  primary: '#ed742f',
  textBlack: '#121826',
  textGray: '#9CA3AF',
  border: '#E5E7EB',
  white: '#FFFFFF',
  bg: '#f9fafb',
  success: '#10B981',
  warn: '#F59E0B',
  starFilled: '#FBBF24',
  starEmpty: '#E5E7EB',
};

const Star = ({ filled, size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? THEME.starFilled : THEME.starEmpty}>
    <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" />
  </svg>
);

const ScoreBar = ({ value, color = THEME.primary }) => (
  <div style={{ width: '100%', height: '6px', background: THEME.border, borderRadius: '4px', overflow: 'hidden' }}>
    <div style={{
      height: '100%',
      width: `${value}%`,
      background: value >= 80 ? THEME.success : value >= 50 ? THEME.warn : '#F43F5E',
      borderRadius: '4px',
      transition: 'width 0.8s ease',
    }} />
  </div>
);

export default function StudyProgress({ userId, onBack }) {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('progress')
        .select('*')
        .order('completed_at', { ascending: false });

      if (!error && data) setRecords(data);
      setIsLoading(false);
    };
    fetchRecords();
  }, [userId]);

  // 퀴즈별로 최신 step1, step2 점수 집계
  const quizStats = QUIZ_INDEX.map(quiz => {
    const step1 = records.filter(r => r.quiz_id === `${quiz.id}_step1`);
    const step2 = records.filter(r => r.quiz_id === `${quiz.id}_step2`);

    const latest1 = step1[0];
    const latest2 = step2[0];

    const score1 = latest1?.score ?? null;
    const score2 = latest2?.score ?? null;

    let avgScore = null;
    if (score1 !== null && score2 !== null) avgScore = Math.round((score1 + score2) / 2);
    else if (score1 !== null) avgScore = score1;
    else if (score2 !== null) avgScore = score2;

    const completedAt = latest1?.completed_at || latest2?.completed_at;
    let dateStr = '';
    if (completedAt) {
      const d = new Date(completedAt);
      const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
      dateStr = `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
    }

    const starCount = avgScore !== null ? Math.round((avgScore / 100) * 5) : 0;

    return { ...quiz, score1, score2, avgScore, dateStr, starCount };
  });

  // 완료된 퀴즈만 필터
  const attempted = quizStats.filter(q => q.avgScore !== null);
  const notAttempted = quizStats.filter(q => q.avgScore === null);

  // 전체 평균
  const overallAvg = attempted.length > 0
    ? Math.round(attempted.reduce((sum, q) => sum + q.avgScore, 0) / attempted.length)
    : null;

  return (
    <div style={{ minHeight: '100vh', background: THEME.bg, fontFamily: "'Pretendard', sans-serif" }}>
      {/* 헤더 */}
      <header style={{
        background: THEME.white, borderBottom: `1px solid ${THEME.border}`,
        padding: '0 24px', height: '60px', display: 'flex', alignItems: 'center',
        gap: '16px', position: 'sticky', top: 0, zIndex: 50,
      }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 0 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={THEME.textBlack} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
          </svg>
        </button>
        <span style={{ fontSize: '18px', fontWeight: 900, color: THEME.textBlack }}>📊 학습 현황</span>
      </header>

      <main style={{ maxWidth: '700px', margin: '0 auto', padding: '32px 20px 80px' }}>

        {isLoading ? (
          <div style={{ textAlign: 'center', paddingTop: '60px', color: THEME.textGray }}>불러오는 중...</div>
        ) : (
          <>
            {/* 요약 카드 */}
            <div style={{
              background: THEME.white, borderRadius: '20px', padding: '28px',
              marginBottom: '28px', border: `1px solid ${THEME.border}`,
              display: 'flex', gap: '0', justifyContent: 'space-around',
            }}>
              {[
                { label: '완료한 퀴즈', value: `${attempted.length}개`, color: THEME.success },
                { label: '전체 평균 점수', value: overallAvg !== null ? `${overallAvg}점` : '—', color: THEME.primary },
                { label: '남은 퀴즈', value: `${notAttempted.length}개`, color: THEME.textGray },
              ].map(stat => (
                <div key={stat.label} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '28px', fontWeight: 900, color: stat.color, marginBottom: '4px' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: THEME.textGray }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* 완료한 퀴즈 목록 */}
            {attempted.length > 0 && (
              <section style={{ marginBottom: '28px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 900, color: THEME.textBlack, marginBottom: '14px', marginTop: 0 }}>
                  ✅ 완료한 퀴즈
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {attempted.map(quiz => (
                    <div key={quiz.id} style={{
                      background: THEME.white, borderRadius: '16px', padding: '18px 20px',
                      border: `1px solid ${THEME.border}`,
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                        <div>
                          <div style={{ fontSize: '16px', fontWeight: 800, color: THEME.textBlack, marginBottom: '2px' }}>
                            {quiz.title}
                          </div>
                          <div style={{ fontSize: '12px', color: THEME.textGray, fontWeight: 500 }}>
                            {quiz.dateStr}
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '22px', fontWeight: 900, color: quiz.avgScore >= 80 ? THEME.success : quiz.avgScore >= 50 ? THEME.warn : '#F43F5E' }}>
                            {quiz.avgScore}점
                          </div>
                          <div style={{ display: 'flex', gap: '1px', justifyContent: 'flex-end', marginTop: '2px' }}>
                            {[1,2,3,4,5].map(i => <Star key={i} filled={i <= quiz.starCount} />)}
                          </div>
                        </div>
                      </div>
                      <ScoreBar value={quiz.avgScore} />
                      <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                        {quiz.score1 !== null && (
                          <span style={{ fontSize: '12px', color: THEME.textGray, fontWeight: 600 }}>
                            Step 1: {quiz.score1}점
                          </span>
                        )}
                        {quiz.score2 !== null && (
                          <span style={{ fontSize: '12px', color: THEME.textGray, fontWeight: 600 }}>
                            Step 2: {quiz.score2}점
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 미완료 퀴즈 목록 */}
            {notAttempted.length > 0 && (
              <section>
                <h3 style={{ fontSize: '16px', fontWeight: 900, color: THEME.textBlack, marginBottom: '14px', marginTop: 0 }}>
                  📋 아직 풀지 않은 퀴즈
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {notAttempted.map(quiz => (
                    <div key={quiz.id} style={{
                      background: THEME.white, borderRadius: '14px', padding: '16px 20px',
                      border: `1px solid ${THEME.border}`,
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    }}>
                      <span style={{ fontSize: '15px', fontWeight: 700, color: THEME.textBlack }}>
                        {quiz.title}
                      </span>
                      <span style={{ fontSize: '12px', color: THEME.textGray, background: '#F3F4F6', padding: '4px 10px', borderRadius: '999px', fontWeight: 600 }}>
                        미완료
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {attempted.length === 0 && notAttempted.length === 0 && (
              <div style={{ textAlign: 'center', padding: '60px 0', color: THEME.textGray, fontSize: '15px' }}>
                등록된 퀴즈가 없습니다.
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}