import React, { useState, useEffect } from 'react';

const THEME = {
  primary: '#ed742f',
  textBlack: '#121826',
  textGray: '#9CA3AF',
  border: '#E5E7EB',
  white: '#FFFFFF',
  bg: '#f9fafb',
};

const DAYS = ['월', '화', '수', '목', '금'];
const PERIODS = [1, 2, 3, 4, 5, 6, 7];

const SUBJECT_COLORS = {
  '국어': { bg: '#DBEAFE', text: '#1D4ED8' },
  '수학': { bg: '#FCE7F3', text: '#9D174D' },
  '과학': { bg: '#D1FAE5', text: '#065F46' },
  '사회': { bg: '#FEF3C7', text: '#92400E' },
  '영어': { bg: '#EDE9FE', text: '#5B21B6' },
  '음악': { bg: '#FFE4E6', text: '#9F1239' },
  '미술': { bg: '#FFEDD5', text: '#9A3412' },
  '체육': { bg: '#ECFDF5', text: '#065F46' },
  '도덕': { bg: '#F0FDF4', text: '#166534' },
  '': { bg: '#F9FAFB', text: '#9CA3AF' },
};

const SUBJECTS = Object.keys(SUBJECT_COLORS).filter(s => s !== '');

const STORAGE_KEY = 'timetable_data';

const defaultTimetable = () => {
  const table = {};
  DAYS.forEach(day => {
    table[day] = {};
    PERIODS.forEach(p => { table[day][p] = ''; });
  });
  return table;
};

export default function Timetable({ onBack }) {
  const [timetable, setTimetable] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : defaultTimetable();
    } catch {
      return defaultTimetable();
    }
  });
  const [editing, setEditing] = useState(null); // { day, period }
  const [selectVal, setSelectVal] = useState('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(timetable));
  }, [timetable]);

  const openEdit = (day, period) => {
    setEditing({ day, period });
    setSelectVal(timetable[day]?.[period] || '');
  };

  const confirmEdit = () => {
    if (!editing) return;
    setTimetable(prev => ({
      ...prev,
      [editing.day]: { ...prev[editing.day], [editing.period]: selectVal },
    }));
    setEditing(null);
  };

  const getColor = (subject) => SUBJECT_COLORS[subject] || SUBJECT_COLORS[''];

  return (
    <div style={{ minHeight: '100vh', background: THEME.bg, fontFamily: "'Pretendard', sans-serif" }}>
      {/* 헤더 */}
      <header style={{
        background: THEME.white,
        borderBottom: `1px solid ${THEME.border}`,
        padding: '0 24px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}>
        <button
          onClick={onBack}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 0 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={THEME.textBlack} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
          </svg>
        </button>
        <span style={{ fontSize: '18px', fontWeight: 900, color: THEME.textBlack }}>📅 주간 시간표</span>
      </header>

      <main style={{ maxWidth: '760px', margin: '0 auto', padding: '32px 16px 80px' }}>
        <p style={{ fontSize: '13px', color: THEME.textGray, marginBottom: '20px', fontWeight: 500 }}>
          각 칸을 클릭하면 과목을 변경할 수 있어요. 데이터는 이 기기에 저장됩니다.
        </p>

        {/* 시간표 테이블 */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '4px' }}>
            <thead>
              <tr>
                <th style={{ width: '40px', fontSize: '12px', color: THEME.textGray, fontWeight: 700, padding: '8px 4px', textAlign: 'center' }}>교시</th>
                {DAYS.map(day => (
                  <th key={day} style={{ fontSize: '15px', fontWeight: 900, color: THEME.textBlack, padding: '8px 4px', textAlign: 'center', minWidth: '90px' }}>
                    {day}요일
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PERIODS.map(period => (
                <tr key={period}>
                  <td style={{ textAlign: 'center', fontSize: '13px', fontWeight: 700, color: THEME.textGray, padding: '4px' }}>
                    {period}
                  </td>
                  {DAYS.map(day => {
                    const subject = timetable[day]?.[period] || '';
                    const { bg, text } = getColor(subject);
                    const isEditing = editing?.day === day && editing?.period === period;

                    return (
                      <td key={day} style={{ padding: '3px' }}>
                        <div
                          onClick={() => openEdit(day, period)}
                          style={{
                            background: bg,
                            borderRadius: '10px',
                            padding: '10px 6px',
                            textAlign: 'center',
                            fontSize: '14px',
                            fontWeight: subject ? 800 : 400,
                            color: subject ? text : THEME.textGray,
                            cursor: 'pointer',
                            minHeight: '44px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: isEditing ? `2px solid ${THEME.primary}` : '2px solid transparent',
                            transition: 'all 0.15s',
                          }}
                        >
                          {subject || '—'}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* 과목 선택 모달 */}
      {editing && (
        <div
          style={{
            position: 'fixed', inset: 0, background: 'rgba(18,24,38,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 100, padding: '20px',
          }}
          onClick={() => setEditing(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: THEME.white, borderRadius: '20px', padding: '28px',
              width: '100%', maxWidth: '320px',
              boxShadow: '0 10px 40px -10px rgba(0,0,0,0.2)',
            }}
          >
            <div style={{ fontSize: '17px', fontWeight: 900, marginBottom: '16px', color: THEME.textBlack }}>
              {editing.day}요일 {editing.period}교시
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '20px' }}>
              {['', ...SUBJECTS].map(sub => {
                const { bg, text } = getColor(sub);
                return (
                  <div
                    key={sub || 'empty'}
                    onClick={() => setSelectVal(sub)}
                    style={{
                      background: selectVal === sub ? (sub ? bg : '#F3F4F6') : THEME.white,
                      border: `2px solid ${selectVal === sub ? (sub ? text : THEME.textBlack) : THEME.border}`,
                      borderRadius: '10px',
                      padding: '10px 6px',
                      textAlign: 'center',
                      fontSize: '14px',
                      fontWeight: 700,
                      color: sub ? text : THEME.textGray,
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    {sub || '비우기'}
                  </div>
                );
              })}
            </div>
            <button
              onClick={confirmEdit}
              style={{
                width: '100%', padding: '13px', background: THEME.primary,
                color: THEME.white, border: 'none', borderRadius: '999px',
                fontSize: '15px', fontWeight: 700, cursor: 'pointer',
                fontFamily: "'Pretendard', sans-serif",
              }}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}