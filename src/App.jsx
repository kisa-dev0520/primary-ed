import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import QuizMenu from "./pages/QuizMenu";
import QuizEngine from "./pages/QuizEngine";
import { QUIZ_INDEX } from "./quizList";

// ==========================================
// 상수 & 유틸
// ==========================================
const DAYS = ["월", "화", "수", "목", "금"];
const PERIODS = ["1교시", "2교시", "3교시", "4교시", "5교시", "6교시"];
const COLORS = [
  { bg: "#FF6B6B", light: "#FFE8E8" },
  { bg: "#FF9F43", light: "#FFF3E0" },
  { bg: "#FECA57", light: "#FFFDE7" },
  { bg: "#48DBFB", light: "#E0F7FA" },
  { bg: "#1DD1A1", light: "#E0F7F1" },
  { bg: "#A29BFE", light: "#EDE7F6" },
  { bg: "#FD79A8", light: "#FCE4EC" },
  { bg: "#6C5CE7", light: "#EDE7F6" },
];
const SUBJECT_COLOR_MAP = {};
let colorIdx = 0;
function getSubjectColor(subject) {
  if (!subject) return COLORS[7];
  if (!SUBJECT_COLOR_MAP[subject]) {
    SUBJECT_COLOR_MAP[subject] = COLORS[colorIdx % COLORS.length];
    colorIdx++;
  }
  return SUBJECT_COLOR_MAP[subject];
}

const defaultTimetable = {
  월: ["국어", "수학", "영어", "", "과학", ""],
  화: ["수학", "국어", "", "사회", "영어", "미술"],
  수: ["영어", "", "수학", "국어", "음악", "체육"],
  목: ["과학", "사회", "국어", "", "수학", ""],
  금: ["체육", "영어", "사회", "수학", "국어", ""],
};
const defaultBooks = [
  { id: 1, title: "수학의 달인 4학년", subject: "수학", total: 120, done: 45, color: "#FF9F43" },
  { id: 2, title: "독해력 쑥쑥 3단계", subject: "국어", total: 80, done: 72, color: "#FF6B6B" },
  { id: 3, title: "Magic Tree House", subject: "영어", total: 60, done: 20, color: "#48DBFB" },
];
const defaultTasks = [
  { id: 1, text: "수학 p.46~48 풀기", done: false, color: "#FF9F43" },
  { id: 2, text: "독서록 쓰기", done: true, color: "#FF6B6B" },
  { id: 3, text: "영단어 20개 외우기", done: false, color: "#48DBFB" },
  { id: 4, text: "받아쓰기 연습", done: false, color: "#A29BFE" },
];

// ==========================================
// 서브 컴포넌트
// ==========================================
function CircleProgress({ percent, color, size = 56 }) {
  const r = 22;
  const circ = 2 * Math.PI * r;
  const dash = (percent / 100) * circ;
  return (
    <svg width={size} height={size} viewBox="0 0 56 56">
      <circle cx="28" cy="28" r={r} fill="none" stroke="#f0f0f0" strokeWidth="5" />
      <circle cx="28" cy="28" r={r} fill="none" stroke={color} strokeWidth="5"
        strokeDasharray={`${dash} ${circ}`} strokeDashoffset={circ * 0.25}
        strokeLinecap="round" style={{ transition: "stroke-dasharray 0.6s ease" }} />
      <text x="28" y="33" textAnchor="middle" fontSize="11" fontWeight="700" fill={color}>{percent}%</text>
    </svg>
  );
}

// ==========================================
// 로그인 화면
// ==========================================
function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const handleGoogle = async () => {
    setLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
  };
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f8f4ff 0%, #fff5f8 50%, #f0fbff 100%)",
      fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
    }}>
      <div style={{
        background: "#fff", borderRadius: 24, padding: "48px 40px",
        width: "100%", maxWidth: 380, textAlign: "center",
        boxShadow: "0 8px 40px rgba(108,92,231,0.12)",
      }}>
        <div style={{
          width: 64, height: 64, borderRadius: "50%", margin: "0 auto 20px",
          background: "linear-gradient(135deg, #6C5CE7, #a855f7, #FF6B9D)",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28,
        }}>🎓</div>
        <div style={{ fontSize: 22, fontWeight: 900, color: "#222", marginBottom: 6 }}>학습 대시보드</div>
        <div style={{ fontSize: 13, color: "#aaa", marginBottom: 40 }}>로그인하고 학습을 시작해요!</div>
        <button onClick={handleGoogle} disabled={loading} style={{
          width: "100%", padding: "14px 20px",
          background: loading ? "#f0f0f0" : "#fff",
          border: "1.5px solid #e5e5e5", borderRadius: 14,
          cursor: loading ? "default" : "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
          fontSize: 15, fontWeight: 700, color: "#333",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)", transition: "all 0.2s",
        }}>
          <svg width="20" height="20" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.6 32.9 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.3 6.5 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.9z" />
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16 19 13 24 13c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.3 6.5 29.4 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
            <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.3 26.7 36 24 36c-5.2 0-9.5-3.1-11.3-7.5l-6.5 5C9.5 39.6 16.2 44 24 44z" />
            <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.4 4.2-4.4 5.6l6.2 5.2C40.9 35.4 44 30.1 44 24c0-1.3-.1-2.7-.4-3.9z" />
          </svg>
          {loading ? "로그인 중..." : "구글 계정으로 로그인"}
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 홈 탭 컴포넌트
// ==========================================
function HomeTab({ tasks, books, timetable, today, quizStats, onNavigate }) {
  const doneTasks = tasks.filter(t => t.done).length;
  const totalTasks = tasks.length;
  const taskPercent = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  const todaySchedule = (timetable[today] || []).filter(s => s);

  const avgBookProgress = books.length > 0
    ? Math.round(books.reduce((sum, b) => sum + Math.round((b.done / b.total) * 100), 0) / books.length)
    : 0;

  const menuCards = [
    {
      id: "timetable", emoji: "📅", label: "시간표",
      value: `${todaySchedule.length}교시`, sub: "오늘 수업",
      color: "#6C5CE7", bg: "#EDE7F6",
    },
    {
      id: "books", emoji: "📚", label: "진도표",
      value: `${books.length}권`, sub: `평균 ${avgBookProgress}%`,
      color: "#FF9F43", bg: "#FFF3E0",
    },
    {
      id: "tasks", emoji: "✅", label: "할일",
      value: `${doneTasks}/${totalTasks}`, sub: `${taskPercent}% 완료`,
      color: "#1DD1A1", bg: "#E0F7F1",
    },
    {
      id: "quiz", emoji: "🧠", label: "퀴즈",
      value: quizStats.count > 0 ? `${quizStats.avgScore}점` : "-",
      sub: quizStats.count > 0 ? `${quizStats.count}회 완료` : "아직 없음",
      color: "#FF6B6B", bg: "#FFE8E8",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>

      {/* 메뉴 카드 4개 */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#aaa", marginBottom: 12, letterSpacing: 1 }}>MENU</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {menuCards.map(card => (
            <div key={card.id} onClick={() => onNavigate(card.id)}
              style={{
                background: "#fff", borderRadius: 18, padding: "18px 16px",
                boxShadow: "0 3px 14px rgba(0,0,0,0.07)",
                cursor: "pointer", transition: "transform 0.15s, box-shadow 0.15s",
                borderLeft: `4px solid ${card.color}`,
              }}
              onMouseDown={e => e.currentTarget.style.transform = "scale(0.97)"}
              onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
              onTouchStart={e => e.currentTarget.style.transform = "scale(0.97)"}
              onTouchEnd={e => e.currentTarget.style.transform = "scale(1)"}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <div style={{ width: 38, height: 38, borderRadius: 12, background: card.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
                  {card.emoji}
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
              </div>
              <div style={{ fontSize: 22, fontWeight: 900, color: card.color, marginBottom: 2 }}>{card.value}</div>
              <div style={{ fontSize: 11, color: "#999", fontWeight: 600 }}>{card.sub}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#333", marginTop: 4 }}>{card.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 오늘 시간표 미리보기 */}
      <div style={{ background: "#fff", borderRadius: 18, padding: "18px 20px", marginBottom: 16, boxShadow: "0 3px 14px rgba(0,0,0,0.07)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div style={{ fontWeight: 800, fontSize: 15, color: "#333" }}>📅 오늘 시간표 <span style={{ color: "#6C5CE7" }}>{today}요일</span></div>
          <button onClick={() => onNavigate("timetable")} style={{ background: "none", border: "none", color: "#aaa", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>전체보기 →</button>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {(timetable[today] || []).map((subject, i) => {
            const col = getSubjectColor(subject);
            return (
              <div key={i} style={{
                padding: "6px 12px", borderRadius: 99,
                background: subject ? col.light : "#f5f5f5",
                color: subject ? col.bg : "#ccc",
                fontSize: 13, fontWeight: 700,
                display: "flex", alignItems: "center", gap: 6,
              }}>
                <span style={{ fontSize: 10, color: subject ? col.bg : "#ccc", opacity: 0.7 }}>{i + 1}</span>
                {subject || "-"}
              </div>
            );
          })}
        </div>
      </div>

      {/* 할일 진행률 */}
      <div style={{ background: "#fff", borderRadius: 18, padding: "18px 20px", marginBottom: 16, boxShadow: "0 3px 14px rgba(0,0,0,0.07)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ fontWeight: 800, fontSize: 15, color: "#333" }}>✅ 오늘 할일</div>
          <button onClick={() => onNavigate("tasks")} style={{ background: "none", border: "none", color: "#aaa", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>전체보기 →</button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ flex: 1 }}>
            <div style={{ height: 10, borderRadius: 99, background: "#f0f0f0", overflow: "hidden", marginBottom: 6 }}>
              <div style={{ height: "100%", borderRadius: 99, background: "linear-gradient(90deg, #1DD1A1, #48DBFB)", width: `${taskPercent}%`, transition: "width 0.4s ease" }} />
            </div>
            <div style={{ fontSize: 12, color: "#aaa" }}>
              {doneTasks === totalTasks && totalTasks > 0 ? "🎉 모두 완료!" : `${totalTasks - doneTasks}개 남음`}
            </div>
          </div>
          <div style={{ fontSize: 26, fontWeight: 900, color: "#1DD1A1" }}>{taskPercent}%</div>
        </div>
        <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
          {tasks.slice(0, 3).map(t => (
            <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: t.done ? "#1DD1A1" : "#eee", flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: t.done ? "#aaa" : "#333", textDecoration: t.done ? "line-through" : "none", fontWeight: 500 }}>{t.text}</span>
            </div>
          ))}
          {tasks.length > 3 && <div style={{ fontSize: 12, color: "#bbb", paddingLeft: 16 }}>+{tasks.length - 3}개 더</div>}
        </div>
      </div>

      {/* 교재 진도 현황 */}
      <div style={{ background: "#fff", borderRadius: 18, padding: "18px 20px", marginBottom: 16, boxShadow: "0 3px 14px rgba(0,0,0,0.07)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div style={{ fontWeight: 800, fontSize: 15, color: "#333" }}>📚 교재 진도</div>
          <button onClick={() => onNavigate("books")} style={{ background: "none", border: "none", color: "#aaa", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>전체보기 →</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {books.map(b => {
            const pct = Math.round((b.done / b.total) * 100);
            return (
              <div key={b.id}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#333" }}>{b.title}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: b.color }}>{pct}%</span>
                </div>
                <div style={{ height: 6, borderRadius: 99, background: "#f0f0f0", overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: 99, background: `linear-gradient(90deg, ${b.color}88, ${b.color})`, width: `${pct}%`, transition: "width 0.4s ease" }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 퀴즈 성적 현황 */}
      <div style={{ background: "#fff", borderRadius: 18, padding: "18px 20px", boxShadow: "0 3px 14px rgba(0,0,0,0.07)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div style={{ fontWeight: 800, fontSize: 15, color: "#333" }}>🧠 퀴즈 성적</div>
          <button onClick={() => onNavigate("quiz")} style={{ background: "none", border: "none", color: "#aaa", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>전체보기 →</button>
        </div>
        {quizStats.count === 0 ? (
          <div style={{ textAlign: "center", color: "#ccc", fontSize: 14, padding: "16px 0" }}>아직 퀴즈 기록이 없어요</div>
        ) : (
          <div style={{ display: "flex", gap: 12 }}>
            {[
              { label: "평균 점수", value: `${quizStats.avgScore}점`, color: "#FF6B6B" },
              { label: "최고 점수", value: `${quizStats.maxScore}점`, color: "#FECA57" },
              { label: "완료 횟수", value: `${quizStats.count}회`, color: "#A29BFE" },
            ].map(s => (
              <div key={s.label} style={{ flex: 1, background: "#fafafa", borderRadius: 12, padding: "12px 0", textAlign: "center" }}>
                <div style={{ fontSize: 20, fontWeight: 900, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 11, color: "#aaa", marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}
        {quizStats.recentList && quizStats.recentList.length > 0 && (
          <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
            {quizStats.recentList.map((q, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, color: "#555", fontWeight: 600 }}>{q.quiz_id.replace("_step1", " Step1").replace("_step2", " Step2").replace("kor_", "국어 ").replace("soc_", "사회 ").replace("sci_", "과학 ")}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  {[1,2,3,4,5].map(s => (
                    <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill={s <= Math.round((q.score / 100) * 5) ? "#FECA57" : "#eee"}>
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#FF6B6B", marginLeft: 4 }}>{q.score}점</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 메인 앱
// ==========================================
export default function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [tab, setTab] = useState("home");

  const [activeQuizData, setActiveQuizData] = useState(null);
  const [activeMeta, setActiveMeta] = useState(null);
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizStats, setQuizStats] = useState({ count: 0, avgScore: 0, maxScore: 0, recentList: [] });

  const [timetable, setTimetable] = useState(defaultTimetable);
  const [books, setBooks] = useState(defaultBooks);
  const [tasks, setTasks] = useState(defaultTasks);
  const [newTask, setNewTask] = useState("");
  const [editing, setEditing] = useState(null);
  const [editVal, setEditVal] = useState("");
  const [newBook, setNewBook] = useState({ title: "", subject: "", total: "", done: "" });
  const [showAddBook, setShowAddBook] = useState(false);

  const [today] = useState(() => {
    const d = new Date();
    return DAYS[d.getDay() - 1] || "월";
  });
  const [greeting] = useState(() => {
    const h = new Date().getHours();
    if (h < 12) return "좋은 아침이에요! ☀️";
    if (h < 18) return "열심히 공부 중이에요! 💪";
    return "오늘도 수고했어요! 🌙";
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  // 퀴즈 통계 불러오기
  useEffect(() => {
    if (!user) return;
    const loadQuizStats = async () => {
      const { data, error } = await supabase.from("progress").select("*").order("completed_at", { ascending: false });
      if (error || !data || data.length === 0) return;
      const scores = data.map(d => d.score);
      setQuizStats({
        count: data.length,
        avgScore: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
        maxScore: Math.max(...scores),
        recentList: data.slice(0, 3),
      });
    };
    loadQuizStats();
  }, [user]);

  const handleSelectQuiz = async (menuItem) => {
    setQuizLoading(true);
    try {
      const module = await menuItem.loader();
      const quizData = module.default;
      const correctOptions = quizData.map(q => q.options[q.correct]);
      const uniqueOptions = [...new Set(correctOptions)];
      setActiveQuizData(quizData);
      setActiveMeta({ id: menuItem.id, title: menuItem.title, subtitle: "", description: uniqueOptions.join(", ") });
    } catch (e) {
      alert("퀴즈 데이터를 불러오는데 실패했습니다.");
    } finally {
      setQuizLoading(false);
    }
  };

  const doneTasks = tasks.filter(t => t.done).length;
  const totalTasks = tasks.length;

  function toggleTask(id) { setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t)); }
  function addTask() {
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTask.trim(), done: false, color: COLORS[tasks.length % COLORS.length].bg }]);
    setNewTask("");
  }
  function removeTask(id) { setTasks(tasks.filter(t => t.id !== id)); }
  function startEdit(day, period) { setEditing({ day, period }); setEditVal(timetable[day][period] || ""); }
  function saveEdit() {
    if (!editing) return;
    const { day, period } = editing;
    setTimetable(prev => { const arr = [...prev[day]]; arr[period] = editVal; return { ...prev, [day]: arr }; });
    setEditing(null);
  }
  function addBook() {
    if (!newBook.title || !newBook.total) return;
    setBooks([...books, { id: Date.now(), title: newBook.title, subject: newBook.subject, total: parseInt(newBook.total), done: parseInt(newBook.done) || 0, color: COLORS[books.length % COLORS.length].bg }]);
    setNewBook({ title: "", subject: "", total: "", done: "" });
    setShowAddBook(false);
  }
  function updateBookProgress(id, delta) {
    setBooks(books.map(b => b.id !== id ? b : { ...b, done: Math.max(0, Math.min(b.total, b.done + delta)) }));
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

  if (authLoading) {
    return (
      <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8f4ff" }}>
        <div style={{ width: 30, height: 30, border: "3px solid #EDE7F6", borderTop: "3px solid #6C5CE7", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
        <style>{`@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }
  if (!user) return <LoginScreen />;

  const displayName = user?.user_metadata?.full_name || user?.email || "학생";
  const firstName = displayName.split(" ")[0];
  const avatarUrl = user?.user_metadata?.avatar_url;

  const tabs = [
    { id: "home",      label: "🏠 홈" },
    { id: "timetable", label: "📅 시간표" },
    { id: "books",     label: "📚 진도표" },
    { id: "tasks",     label: "✅ 할일" },
    { id: "quiz",      label: "🧠 퀴즈" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f8f4ff 0%, #fff5f8 50%, #f0fbff 100%)",
      fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif",
      paddingBottom: 40,
    }}>

      {/* 헤더 */}
      <div style={{
        background: "linear-gradient(135deg, #6C5CE7 0%, #a855f7 50%, #FF6B9D 100%)",
        padding: "24px 24px 32px",
        borderRadius: "0 0 32px 32px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -40, right: -40, width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
        <div style={{ position: "absolute", bottom: -20, left: 60, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          {avatarUrl ? (
            <img src={avatarUrl} alt={displayName} style={{ width: 44, height: 44, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.5)", objectFit: "cover" }} />
          ) : (
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 800, color: "#fff" }}>
              {firstName.charAt(0)}
            </div>
          )}
          <div>
            <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 13 }}>{greeting}</div>
            <div style={{ color: "#fff", fontSize: 20, fontWeight: 800 }}>{firstName} 학습 대시보드</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          {[
            { label: "오늘 할일", val: `${doneTasks}/${totalTasks}`, color: "#FECA57" },
            { label: "진행 교재", val: `${books.length}권`, color: "#48DBFB" },
            { label: "오늘", val: today + "요일", color: "#1DD1A1" },
          ].map(s => (
            <div key={s.label} style={{ background: "rgba(255,255,255,0.18)", borderRadius: 14, padding: "8px 14px", backdropFilter: "blur(8px)", flex: 1 }}>
              <div style={{ color: s.color, fontWeight: 800, fontSize: 18 }}>{s.val}</div>
              <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 11 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 탭 바 */}
      <div style={{ display: "flex", gap: 6, padding: "16px 16px 0", overflowX: "auto" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            flexShrink: 0,
            padding: "10px 14px", borderRadius: 14, border: "none",
            background: tab === t.id ? "linear-gradient(135deg, #6C5CE7, #a855f7)" : "#fff",
            color: tab === t.id ? "#fff" : "#888",
            fontWeight: 700, fontSize: 12, cursor: "pointer",
            boxShadow: tab === t.id ? "0 4px 16px rgba(108,92,231,0.35)" : "0 2px 8px rgba(0,0,0,0.06)",
            transition: "all 0.2s",
          }}>{t.label}</button>
        ))}
      </div>

      {/* ===== 홈 탭 ===== */}
      {tab === "home" && (
        <HomeTab
          tasks={tasks}
          books={books}
          timetable={timetable}
          today={today}
          quizStats={quizStats}
          onNavigate={(id) => setTab(id)}
        />
      )}

      <div style={{ padding: tab === "home" ? "0" : "20px" }}>

        {/* ===== 시간표 ===== */}
        {tab === "timetable" && (
          <div style={{ padding: "20px" }}>
            <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 14, color: "#333" }}>📅 주간 시간표</div>
            <div style={{ background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "48px repeat(5, 1fr)" }}>
                <div style={{ background: "#f8f8f8" }} />
                {DAYS.map(d => (
                  <div key={d} style={{ padding: "12px 0", textAlign: "center", background: d === today ? "linear-gradient(135deg,#6C5CE7,#a855f7)" : "#f8f8f8", color: d === today ? "#fff" : "#666", fontWeight: 700, fontSize: 14 }}>{d}</div>
                ))}
              </div>
              {PERIODS.map((p, pi) => (
                <div key={p} style={{ display: "grid", gridTemplateColumns: "48px repeat(5, 1fr)", borderTop: "1px solid #f4f4f4" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#bbb", fontWeight: 600, background: "#fafafa" }}>{pi + 1}</div>
                  {DAYS.map(d => {
                    const subject = timetable[d][pi];
                    const col = getSubjectColor(subject);
                    const isEditing = editing && editing.day === d && editing.period === pi;
                    return (
                      <div key={d} onClick={() => !isEditing && startEdit(d, pi)} style={{ padding: "6px 4px", textAlign: "center", cursor: "pointer", background: subject ? col.light : "transparent", minHeight: 44, display: "flex", alignItems: "center", justifyContent: "center", borderLeft: "1px solid #f4f4f4" }}>
                        {isEditing ? (
                          <input autoFocus value={editVal} onChange={e => setEditVal(e.target.value)} onBlur={saveEdit} onKeyDown={e => e.key === "Enter" && saveEdit()}
                            style={{ width: "100%", border: "none", outline: "none", background: "transparent", textAlign: "center", fontSize: 12, fontWeight: 700, color: col.bg }} />
                        ) : (
                          <span style={{ fontSize: 12, fontWeight: subject ? 700 : 400, color: subject ? col.bg : "#ddd" }}>{subject || "+"}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            <div style={{ fontSize: 11, color: "#bbb", textAlign: "center", marginTop: 10 }}>칸을 탭하면 수정할 수 있어요</div>
          </div>
        )}

        {/* ===== 진도표 ===== */}
        {tab === "books" && (
          <div style={{ padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ fontWeight: 800, fontSize: 18, color: "#333" }}>📚 교재 진도표</div>
              <button onClick={() => setShowAddBook(!showAddBook)} style={{ background: "linear-gradient(135deg,#6C5CE7,#a855f7)", color: "#fff", border: "none", borderRadius: 12, padding: "8px 16px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>+ 추가</button>
            </div>
            {showAddBook && (
              <div style={{ background: "#fff", borderRadius: 16, padding: 16, marginBottom: 16, boxShadow: "0 4px 16px rgba(108,92,231,0.15)" }}>
                {[{ key: "title", placeholder: "교재 이름" }, { key: "subject", placeholder: "과목" }, { key: "total", placeholder: "전체 쪽수", type: "number" }, { key: "done", placeholder: "현재 진도 (쪽)", type: "number" }].map(f => (
                  <input key={f.key} value={newBook[f.key]} onChange={e => setNewBook({ ...newBook, [f.key]: e.target.value })} placeholder={f.placeholder} type={f.type || "text"}
                    style={{ width: "100%", border: "1.5px solid #eee", borderRadius: 10, padding: "9px 12px", marginBottom: 8, fontSize: 13, outline: "none", boxSizing: "border-box" }} />
                ))}
                <button onClick={addBook} style={{ width: "100%", background: "linear-gradient(135deg,#6C5CE7,#a855f7)", color: "#fff", border: "none", borderRadius: 10, padding: 10, fontWeight: 700, cursor: "pointer" }}>추가하기</button>
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {books.map(b => {
                const pct = Math.round((b.done / b.total) * 100);
                return (
                  <div key={b.id} style={{ background: "#fff", borderRadius: 18, padding: 16, boxShadow: "0 3px 16px rgba(0,0,0,0.07)", display: "flex", gap: 14, alignItems: "center", borderLeft: `4px solid ${b.color}` }}>
                    <CircleProgress percent={pct} color={b.color} size={56} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 800, fontSize: 15, color: "#222" }}>{b.title}</div>
                      <div style={{ fontSize: 12, color: "#999", marginBottom: 8 }}>{b.subject}</div>
                      <div style={{ height: 6, borderRadius: 99, background: "#f0f0f0", overflow: "hidden" }}>
                        <div style={{ height: "100%", borderRadius: 99, background: `linear-gradient(90deg, ${b.color}88, ${b.color})`, width: `${pct}%`, transition: "width 0.4s ease" }} />
                      </div>
                      <div style={{ fontSize: 11, color: "#aaa", marginTop: 4 }}>{b.done} / {b.total} 쪽</div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <button onClick={() => updateBookProgress(b.id, 1)} style={{ width: 32, height: 32, borderRadius: "50%", background: b.color, color: "#fff", border: "none", fontWeight: 800, fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                      <button onClick={() => updateBookProgress(b.id, -1)} style={{ width: 32, height: 32, borderRadius: "50%", background: "#f0f0f0", color: "#999", border: "none", fontWeight: 800, fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>-</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ===== 할일 ===== */}
        {tab === "tasks" && (
          <div style={{ padding: "20px" }}>
            <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 6, color: "#333" }}>✅ 오늘 할일</div>
            <div style={{ fontSize: 13, color: "#aaa", marginBottom: 14 }}>
              {doneTasks === totalTasks && totalTasks > 0 ? "🎉 다 끝났어요! 최고예요!" : `${totalTasks - doneTasks}개 남았어요, 파이팅!`}
            </div>
            <div style={{ background: "#fff", borderRadius: 16, padding: 16, marginBottom: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#999", marginBottom: 8 }}>
                <span>오늘 진행률</span>
                <span style={{ fontWeight: 700, color: "#6C5CE7" }}>{totalTasks ? Math.round((doneTasks / totalTasks) * 100) : 0}%</span>
              </div>
              <div style={{ height: 10, borderRadius: 99, background: "#f0f0f0", overflow: "hidden" }}>
                <div style={{ height: "100%", borderRadius: 99, background: "linear-gradient(90deg, #6C5CE7, #FF6B9D)", width: `${totalTasks ? (doneTasks / totalTasks) * 100 : 0}%`, transition: "width 0.4s ease" }} />
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
              <input value={newTask} onChange={e => setNewTask(e.target.value)} onKeyDown={e => e.key === "Enter" && addTask()} placeholder="할일 추가하기..."
                style={{ flex: 1, border: "2px solid #eee", borderRadius: 12, padding: "11px 14px", fontSize: 14, outline: "none", background: "#fff" }} />
              <button onClick={addTask} style={{ background: "linear-gradient(135deg,#6C5CE7,#a855f7)", color: "#fff", border: "none", borderRadius: 12, padding: "0 18px", fontWeight: 800, fontSize: 20, cursor: "pointer" }}>+</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {tasks.map(t => (
                <div key={t.id} style={{ background: "#fff", borderRadius: 14, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, boxShadow: "0 2px 10px rgba(0,0,0,0.05)", opacity: t.done ? 0.6 : 1, borderLeft: `4px solid ${t.color}`, transition: "opacity 0.2s" }}>
                  <button onClick={() => toggleTask(t.id)} style={{ width: 26, height: 26, borderRadius: "50%", flexShrink: 0, border: `2.5px solid ${t.done ? t.color : "#ddd"}`, background: t.done ? t.color : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "#fff", transition: "all 0.2s" }}>{t.done ? "✓" : ""}</button>
                  <span style={{ flex: 1, fontSize: 15, fontWeight: 600, color: "#333", textDecoration: t.done ? "line-through" : "none" }}>{t.text}</span>
                  <button onClick={() => removeTask(t.id)} style={{ background: "none", border: "none", color: "#ddd", cursor: "pointer", fontSize: 20, padding: 0 }}>×</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== 퀴즈 ===== */}
        {tab === "quiz" && (
          <div style={{ padding: "20px" }}>
            {quizLoading ? (
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 200, flexDirection: "column", gap: 10 }}>
                <div style={{ width: 30, height: 30, border: "3px solid #EDE7F6", borderTop: "3px solid #6C5CE7", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
                <style>{`@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}`}</style>
                <div style={{ fontSize: 14, color: "#6C5CE7", fontWeight: 700 }}>문제지 가져오는 중...</div>
              </div>
            ) : (
              <QuizMenu db={QUIZ_INDEX} onSelect={handleSelectQuiz} />
            )}
          </div>
        )}

      </div>
    </div>
  );
}