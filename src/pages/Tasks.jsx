import React, { useState, useEffect, useRef } from 'react';

const THEME = {
  primary: '#ed742f',
  textBlack: '#121826',
  textGray: '#9CA3AF',
  border: '#E5E7EB',
  white: '#FFFFFF',
  bg: '#f9fafb',
  success: '#10B981',
  successBg: '#ECFDF5',
};

const STORAGE_KEY = 'tasks_data';

const CATEGORIES = ['전체', '공부', '숙제', '독서', '기타'];
const CAT_COLORS = {
  '공부': { bg: '#DBEAFE', text: '#1D4ED8' },
  '숙제': { bg: '#FCE7F3', text: '#9D174D' },
  '독서': { bg: '#D1FAE5', text: '#065F46' },
  '기타': { bg: '#FEF3C7', text: '#92400E' },
};

export default function Tasks({ userId, onBack }) {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [inputVal, setInputVal] = useState('');
  const [inputCat, setInputCat] = useState('공부');
  const [activeFilter, setActiveFilter] = useState('전체');
  const inputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    const text = inputVal.trim();
    if (!text) return;
    setTasks(prev => [...prev, {
      id: Date.now(),
      text,
      category: inputCat,
      done: false,
      createdAt: new Date().toISOString(),
    }]);
    setInputVal('');
    inputRef.current?.focus();
  };

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const clearDone = () => {
    setTasks(prev => prev.filter(t => !t.done));
  };

  const filteredTasks = activeFilter === '전체'
    ? tasks
    : tasks.filter(t => t.category === activeFilter);

  const doneCount = tasks.filter(t => t.done).length;
  const totalCount = tasks.length;

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
        <span style={{ fontSize: '18px', fontWeight: 900, color: THEME.textBlack }}>✅ 할 일 목록</span>
        {doneCount > 0 && (
          <button
            onClick={clearDone}
            style={{
              marginLeft: 'auto', background: 'transparent', border: `1px solid ${THEME.border}`,
              borderRadius: '999px', padding: '5px 12px', fontSize: '12px', fontWeight: 700,
              color: THEME.textGray, cursor: 'pointer', fontFamily: "'Pretendard', sans-serif",
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#F43F5E'; e.currentTarget.style.borderColor = '#F43F5E'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = THEME.textGray; e.currentTarget.style.borderColor = THEME.border; }}
          >
            완료 항목 삭제
          </button>
        )}
      </header>

      <main style={{ maxWidth: '600px', margin: '0 auto', padding: '28px 20px 100px' }}>
        {/* 진행률 */}
        {totalCount > 0 && (
          <div style={{ background: THEME.white, borderRadius: '16px', padding: '18px 20px', marginBottom: '20px', border: `1px solid ${THEME.border}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '14px', fontWeight: 700, color: THEME.textBlack }}>오늘의 진행률</span>
              <span style={{ fontSize: '14px', fontWeight: 900, color: THEME.success }}>
                {doneCount} / {totalCount}
              </span>
            </div>
            <div style={{ width: '100%', height: '8px', background: THEME.border, borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${totalCount > 0 ? (doneCount / totalCount) * 100 : 0}%`,
                background: THEME.success, borderRadius: '4px', transition: 'width 0.5s ease',
              }} />
            </div>
          </div>
        )}

        {/* 입력 영역 */}
        <div style={{
          background: THEME.white, borderRadius: '16px', padding: '18px 20px',
          marginBottom: '20px', border: `1px solid ${THEME.border}`,
        }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
            {CATEGORIES.filter(c => c !== '전체').map(cat => {
              const { bg, text } = CAT_COLORS[cat];
              return (
                <div
                  key={cat}
                  onClick={() => setInputCat(cat)}
                  style={{
                    padding: '5px 12px', borderRadius: '999px', fontSize: '13px', fontWeight: 700,
                    cursor: 'pointer',
                    background: inputCat === cat ? bg : '#F3F4F6',
                    color: inputCat === cat ? text : THEME.textGray,
                    border: inputCat === cat ? `1.5px solid ${text}` : '1.5px solid transparent',
                    transition: 'all 0.15s',
                  }}
                >
                  {cat}
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              ref={inputRef}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
              placeholder="할 일을 입력하세요..."
              style={{
                flex: 1, padding: '12px 14px', border: `1px solid ${THEME.border}`,
                borderRadius: '12px', fontSize: '15px', outline: 'none',
                fontFamily: "'Pretendard', sans-serif", color: THEME.textBlack,
              }}
            />
            <button
              onClick={addTask}
              style={{
                padding: '12px 20px', background: THEME.primary, color: THEME.white,
                border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: 700,
                cursor: 'pointer', fontFamily: "'Pretendard', sans-serif", transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#d4631f'}
              onMouseLeave={(e) => e.currentTarget.style.background = THEME.primary}
            >
              추가
            </button>
          </div>
        </div>

        {/* 필터 */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
          {CATEGORIES.map(cat => (
            <div
              key={cat}
              onClick={() => setActiveFilter(cat)}
              style={{
                padding: '6px 14px', borderRadius: '999px', fontSize: '13px', fontWeight: 700,
                cursor: 'pointer',
                background: activeFilter === cat ? THEME.textBlack : THEME.white,
                color: activeFilter === cat ? THEME.white : THEME.textGray,
                border: `1px solid ${activeFilter === cat ? THEME.textBlack : THEME.border}`,
                transition: 'all 0.15s',
              }}
            >
              {cat}
              {cat === '전체' && totalCount > 0 && (
                <span style={{ marginLeft: '4px', opacity: 0.7 }}>({totalCount})</span>
              )}
            </div>
          ))}
        </div>

        {/* 할 일 목록 */}
        {filteredTasks.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: THEME.textGray, fontSize: '15px' }}>
            {tasks.length === 0 ? '할 일을 추가해 보세요! 🎯' : '이 카테고리의 할 일이 없어요.'}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* 미완료 먼저 */}
            {[false, true].map(isDone => (
              filteredTasks.filter(t => t.done === isDone).map(task => {
                const { bg, text } = CAT_COLORS[task.category] || CAT_COLORS['기타'];
                return (
                  <div
                    key={task.id}
                    style={{
                      background: task.done ? '#F9FAFB' : THEME.white,
                      borderRadius: '14px', padding: '14px 16px',
                      border: `1px solid ${THEME.border}`,
                      display: 'flex', alignItems: 'center', gap: '12px',
                      transition: 'all 0.2s',
                      opacity: task.done ? 0.6 : 1,
                    }}
                  >
                    {/* 체크박스 */}
                    <div
                      onClick={() => toggleTask(task.id)}
                      style={{
                        width: '22px', height: '22px', flexShrink: 0, borderRadius: '6px',
                        background: task.done ? THEME.success : THEME.white,
                        border: `2px solid ${task.done ? THEME.success : THEME.border}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', transition: 'all 0.2s',
                      }}
                    >
                      {task.done && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      )}
                    </div>

                    {/* 텍스트 */}
                    <span style={{
                      flex: 1, fontSize: '15px', fontWeight: 600,
                      color: task.done ? THEME.textGray : THEME.textBlack,
                      textDecoration: task.done ? 'line-through' : 'none',
                    }}>
                      {task.text}
                    </span>

                    {/* 카테고리 */}
                    <span style={{
                      fontSize: '11px', fontWeight: 700,
                      background: bg, color: text,
                      padding: '3px 8px', borderRadius: '999px', flexShrink: 0,
                    }}>
                      {task.category}
                    </span>

                    {/* 삭제 버튼 */}
                    <button
                      onClick={() => deleteTask(task.id)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', display: 'flex', flexShrink: 0 }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={THEME.textGray} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
                  </div>
                );
              })
            ))}
          </div>
        )}
      </main>
    </div>
  );
}