import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import Home from './pages/Home';
import QuizMenu from "./pages/QuizMenu";
import QuizEngine from "./pages/QuizEngine";
import { QUIZ_INDEX } from "./quizList";

// ─────────────────────────────────────────
// 상수
// ─────────────────────────────────────────
const DAYS = ["월", "화", "수", "목", "금"];
const SUBJECT_COLORS = {
  국어: { bg: "#FF6B6B", light: "#FFF0F0" },
  수학: { bg: "#FF9F43", light: "#FFF6EC" },
  영어: { bg: "#48DBFB", light: "#EDFAFE" },
  과학: { bg: "#1DD1A1", light: "#EAFAF5" },
  사회: { bg: "#A29BFE", light: "#F3F1FF" },
  음악: { bg: "#FD79A8", light: "#FFF0F6" },
  미술: { bg: "#FECA57", light: "#FFFBE8" },
  체육: { bg: "#6C5CE7", light: "#EDEAFF" },
  도덕: { bg: "#00CEC9", light: "#E8FFFE" },
};
const FALLBACK = ["#FF6B6B","#FF9F43","#FECA57","#48DBFB","#1DD1A1","#A29BFE","#FD79A8","#6C5CE7"];
const colorMap = {};
let colorCnt = 0;
function getColor(subject) {
  if (!subject) return { bg: "#E5E7EB", light: "#F9FAFB" };
  if (SUBJECT_COLORS[subject]) return SUBJECT_COLORS[subject];
  if (!colorMap[subject]) colorMap[subject] = FALLBACK[colorCnt++ % FALLBACK.length];
  return { bg: colorMap[subject], light: colorMap[subject] + "22" };
}

const defaultTimetable = {
  월: ["국어","수학","영어","","과학",""],
  화: ["수학","국어","","사회","영어","미술"],
  수: ["영어","","수학","국어","음악","체육"],
  목: ["과학","사회","국어","","수학",""],
  금: ["체육","영어","사회","수학","국어",""],
};
const defaultBooks = [
  { id:1, title:"수학의 달인 4학년", subject:"수학", total:120, done:45, color:"#FF9F43" },
  { id:2, title:"독해력 쑥쑥 3단계", subject:"국어", total:80,  done:72, color:"#FF6B6B" },
  { id:3, title:"Magic Tree House",  subject:"영어", total:60,  done:20, color:"#48DBFB" },
];
const defaultTasks = [
  { id:1, text:"수학 p.46~48 풀기",  done:false, color:"#FF9F43" },
  { id:2, text:"독서록 쓰기",        done:true,  color:"#FF6B6B" },
  { id:3, text:"영단어 20개 외우기", done:false, color:"#48DBFB" },
  { id:4, text:"받아쓰기 연습",      done:false, color:"#A29BFE" },
];

// ─────────────────────────────────────────
// 공통 전체화면 래퍼
// ─────────────────────────────────────────
function Screen({ title, color, onBack, children }) {
  return (
    <div style={{
      position:"fixed", inset:0, zIndex:200,
      background:"#fff",
      display:"flex", flexDirection:"column",
      fontFamily:"'Pretendard','Apple SD Gothic Neo',sans-serif",
      maxWidth:430, margin:"0 auto",
    }}>
      {/* 상단 헤더 */}
      <div style={{
        padding:"52px 24px 20px",
        borderBottom:"1px solid #F0F0F0",
        display:"flex", alignItems:"center", gap:14,
        flexShrink:0,
      }}>
        <button onClick={onBack} style={{
          width:40, height:40, borderRadius:"50%",
          background:"#F5F5F5", border:"none",
          display:"flex", alignItems:"center", justifyContent:"center",
          cursor:"pointer", flexShrink:0,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
          </svg>
        </button>
        <span style={{ fontSize:20, fontWeight:900, color:"#111" }}>{title}</span>
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:"24px 24px 80px" }}>
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// SVG 아이콘
// ─────────────────────────────────────────
const Icon = {
  Timetable: ({color}) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color||"#333"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  Books: ({color}) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color||"#333"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  ),
  Tasks: ({color}) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color||"#333"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
    </svg>
  ),
  Quiz: ({color}) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color||"#333"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  ChevronRight: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  ),
};

// ─────────────────────────────────────────
// 시간표 화면
// ─────────────────────────────────────────
function TimetableScreen({ timetable, setTimetable, today, onBack }) {
  const [editing, setEditing] = useState(null);
  const [editVal, setEditVal] = useState("");
  function startEdit(day, pi) { setEditing({ day, pi }); setEditVal(timetable[day][pi] || ""); }
  function saveEdit() {
    if (!editing) return;
    setTimetable(prev => { const arr=[...prev[editing.day]]; arr[editing.pi]=editVal; return {...prev,[editing.day]:arr}; });
    setEditing(null);
  }
  return (
    <Screen title="시간표" onBack={onBack}>
      <div style={{ overflowX:"auto" }}>
        <table style={{ width:"100%", borderCollapse:"separate", borderSpacing:4, tableLayout:"fixed", minWidth:280 }}>
          <thead>
            <tr>
              <th style={{ width:20 }}></th>
              {DAYS.map(d => (
                <th key={d} style={{
                  padding:"10px 0", borderRadius:12, fontSize:13, fontWeight:800,
                  background: d===today ? "#111" : "#F5F5F5",
                  color: d===today ? "#fff" : "#888", textAlign:"center",
                }}>{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[0,1,2,3,4,5].map(pi => (
              <tr key={pi}>
                <td style={{ textAlign:"center", fontSize:10, color:"#ccc", fontWeight:700 }}>{pi+1}</td>
                {DAYS.map(d => {
                  const sub = timetable[d][pi];
                  const c = getColor(sub);
                  const isEd = editing?.day===d && editing?.pi===pi;
                  return (
                    <td key={d} onClick={() => !isEd && startEdit(d,pi)}
                      style={{ height:50, borderRadius:12, cursor:"pointer", background:sub?c.light:"#FAFAFA", textAlign:"center", verticalAlign:"middle", border:`2px solid ${isEd?c.bg:"transparent"}`, transition:"all 0.15s" }}>
                      {isEd
                        ? <input autoFocus value={editVal} onChange={e=>setEditVal(e.target.value)} onBlur={saveEdit} onKeyDown={e=>e.key==="Enter"&&saveEdit()} style={{ width:"80%", border:"none", outline:"none", background:"transparent", textAlign:"center", fontSize:12, fontWeight:700, color:c.bg }}/>
                        : <span style={{ fontSize:12, fontWeight:sub?700:400, color:sub?c.bg:"#DDD" }}>{sub||"+"}</span>
                      }
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ textAlign:"center", fontSize:12, color:"#CCC", marginTop:16 }}>칸을 탭하면 수정할 수 있어요</p>
    </Screen>
  );
}

// ─────────────────────────────────────────
// 진도표 화면
// ─────────────────────────────────────────
function BooksScreen({ books, setBooks, onBack }) {
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ title:"", subject:"", total:"", done:"" });
  function addBook() {
    if (!form.title||!form.total) return;
    setBooks(prev=>[...prev,{ id:Date.now(), title:form.title, subject:form.subject, total:parseInt(form.total), done:parseInt(form.done)||0, color:FALLBACK[prev.length%FALLBACK.length] }]);
    setForm({ title:"", subject:"", total:"", done:"" }); setShowAdd(false);
  }
  function update(id, delta) { setBooks(prev=>prev.map(b=>b.id!==id?b:{...b,done:Math.max(0,Math.min(b.total,b.done+delta))})); }
  function remove(id) { setBooks(prev=>prev.filter(b=>b.id!==id)); }
  const circ = 2*Math.PI*22;
  return (
    <Screen title="진도표" onBack={onBack}>
      <button onClick={()=>setShowAdd(!showAdd)} style={{ width:"100%", padding:"14px", background:"#fff", border:"2px dashed #E0E0E0", borderRadius:16, color:"#aaa", fontWeight:700, fontSize:15, cursor:"pointer", marginBottom:20 }}>
        + 교재 추가
      </button>
      {showAdd && (
        <div style={{ background:"#FAFAFA", borderRadius:20, padding:20, marginBottom:20 }}>
          {[{k:"title",p:"교재 이름"},{k:"subject",p:"과목"},{k:"total",p:"전체 쪽수",t:"number"},{k:"done",p:"현재 진도 (쪽)",t:"number"}].map(f=>(
            <input key={f.k} value={form[f.k]} onChange={e=>setForm({...form,[f.k]:e.target.value})}
              placeholder={f.p} type={f.t||"text"}
              style={{ width:"100%", border:"1.5px solid #eee", borderRadius:12, padding:"12px 14px", marginBottom:10, fontSize:14, outline:"none", background:"#fff", boxSizing:"border-box" }}/>
          ))}
          <button onClick={addBook} style={{ width:"100%", background:"#111", color:"#fff", border:"none", borderRadius:12, padding:13, fontWeight:800, fontSize:15, cursor:"pointer" }}>추가하기</button>
        </div>
      )}
      <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
        {books.map(b => {
          const pct = Math.round((b.done/b.total)*100);
          return (
            <div key={b.id} style={{ display:"flex", gap:16, alignItems:"center", padding:"16px 0", borderBottom:"1px solid #F5F5F5" }}>
              <svg width="56" height="56" viewBox="0 0 56 56" style={{ flexShrink:0 }}>
                <circle cx="28" cy="28" r="22" fill="none" stroke="#F0F0F0" strokeWidth="5"/>
                <circle cx="28" cy="28" r="22" fill="none" stroke={b.color} strokeWidth="5"
                  strokeDasharray={`${(pct/100)*circ} ${circ}`} strokeDashoffset={circ*0.25}
                  strokeLinecap="round" style={{transition:"stroke-dasharray 0.5s"}}/>
                <text x="28" y="33" textAnchor="middle" fontSize="11" fontWeight="700" fill={b.color}>{pct}%</text>
              </svg>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontWeight:800, fontSize:15, color:"#111", marginBottom:3, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{b.title}</div>
                <div style={{ fontSize:12, color:"#aaa", marginBottom:10 }}>{b.subject} · {b.done}/{b.total}쪽</div>
                <div style={{ height:6, borderRadius:99, background:"#F0F0F0", overflow:"hidden" }}>
                  <div style={{ height:"100%", borderRadius:99, background:b.color, width:`${pct}%`, transition:"width 0.4s" }}/>
                </div>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:6, flexShrink:0 }}>
                <button onClick={()=>update(b.id,1)}  style={{ width:32, height:32, borderRadius:"50%", background:b.color+"22", color:b.color, border:"none", fontWeight:900, fontSize:18, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>+</button>
                <button onClick={()=>update(b.id,-1)} style={{ width:32, height:32, borderRadius:"50%", background:"#F5F5F5", color:"#aaa", border:"none", fontWeight:900, fontSize:18, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>−</button>
                <button onClick={()=>remove(b.id)}    style={{ width:32, height:32, borderRadius:"50%", background:"#FFF0F0", color:"#FF6B6B", border:"none", fontWeight:900, fontSize:16, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>×</button>
              </div>
            </div>
          );
        })}
      </div>
    </Screen>
  );
}

// ─────────────────────────────────────────
// 할일 화면
// ─────────────────────────────────────────
function TasksScreen({ tasks, setTasks, onBack }) {
  const [newTask, setNewTask] = useState("");
  const done = tasks.filter(t=>t.done).length;
  const pct = tasks.length ? Math.round((done/tasks.length)*100) : 0;
  function toggle(id) { setTasks(prev=>prev.map(t=>t.id===id?{...t,done:!t.done}:t)); }
  function add() {
    if (!newTask.trim()) return;
    setTasks(prev=>[...prev,{id:Date.now(),text:newTask.trim(),done:false,color:FALLBACK[prev.length%FALLBACK.length]}]);
    setNewTask("");
  }
  function remove(id) { setTasks(prev=>prev.filter(t=>t.id!==id)); }
  return (
    <Screen title="할일" onBack={onBack}>
      {/* 진행률 */}
      <div style={{ background:"#F8F8F8", borderRadius:20, padding:"20px 24px", marginBottom:24, display:"flex", alignItems:"center", gap:20 }}>
        <div style={{ position:"relative", width:80, height:80, flexShrink:0 }}>
          <svg width="80" height="80" viewBox="0 0 80 80" style={{ transform:"rotate(-90deg)" }}>
            <circle cx="40" cy="40" r="32" fill="none" stroke="#E8E8E8" strokeWidth="7"/>
            <circle cx="40" cy="40" r="32" fill="none" stroke="#111" strokeWidth="7"
              strokeDasharray={`${(pct/100)*(2*Math.PI*32)} ${2*Math.PI*32}`}
              strokeLinecap="round" style={{transition:"stroke-dasharray 0.5s"}}/>
          </svg>
          <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ fontSize:18, fontWeight:900, color:"#111" }}>{pct}%</span>
          </div>
        </div>
        <div>
          <div style={{ fontSize:22, fontWeight:900, color:"#111" }}>{done}/{tasks.length}</div>
          <div style={{ fontSize:13, color:"#aaa" }}>할일 완료</div>
          {pct===100 && tasks.length>0 && <div style={{ fontSize:13, marginTop:6 }}>🎉 모두 완료!</div>}
        </div>
      </div>
      {/* 입력 */}
      <div style={{ display:"flex", gap:10, marginBottom:20 }}>
        <input value={newTask} onChange={e=>setNewTask(e.target.value)} onKeyDown={e=>e.key==="Enter"&&add()}
          placeholder="새 할일 추가..."
          style={{ flex:1, border:"1.5px solid #EBEBEB", borderRadius:14, padding:"13px 16px", fontSize:15, outline:"none", background:"#fff" }}/>
        <button onClick={add} style={{ width:52, height:52, borderRadius:14, background:"#111", color:"#fff", border:"none", fontWeight:900, fontSize:26, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>+</button>
      </div>
      {/* 목록 */}
      <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
        {tasks.map(t=>(
          <div key={t.id} style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 0", borderBottom:"1px solid #F5F5F5", opacity:t.done?0.5:1, transition:"opacity 0.2s" }}>
            <button onClick={()=>toggle(t.id)} style={{ width:26, height:26, borderRadius:"50%", flexShrink:0, border:`2px solid ${t.done?t.color:"#DDD"}`, background:t.done?t.color:"transparent", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:13, transition:"all 0.2s", padding:0 }}>
              {t.done && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
            </button>
            <div style={{ width:4, height:4, borderRadius:"50%", background:t.color, flexShrink:0 }}/>
            <span style={{ flex:1, fontSize:15, fontWeight:500, color:"#111", textDecoration:t.done?"line-through":"none" }}>{t.text}</span>
            <button onClick={()=>remove(t.id)} style={{ background:"none", border:"none", color:"#DDD", cursor:"pointer", fontSize:20, padding:0, lineHeight:1 }}>×</button>
          </div>
        ))}
      </div>
    </Screen>
  );
}

// ─────────────────────────────────────────
// 퀴즈 화면
// ─────────────────────────────────────────
function QuizScreen({ onBack }) {
  const [activeQuizData, setActiveQuizData] = useState(null);
  const [activeMeta, setActiveMeta] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleSelect = async (menuItem) => {
    setLoading(true);
    try {
      const mod = await menuItem.loader();
      const qd = mod.default;
      setActiveQuizData(qd);
      setActiveMeta({ id:menuItem.id, title:menuItem.title, subtitle:"", description:[...new Set(qd.map(q=>q.options[q.correct]))].join(", ") });
    } catch { alert("퀴즈 데이터를 불러오는데 실패했습니다."); }
    finally { setLoading(false); }
  };
  if (activeQuizData && activeMeta) {
    return <QuizEngine id={activeMeta.id} data={activeQuizData} meta={activeMeta} onBack={()=>{ setActiveQuizData(null); setActiveMeta(null); }}/>;
  }
  return (
    <Screen title="퀴즈" onBack={onBack}>
      {loading
        ? <div style={{ display:"flex", justifyContent:"center", padding:60 }}>
            <div style={{ width:32, height:32, border:"3px solid #EEE", borderTop:"3px solid #111", borderRadius:"50%", animation:"spin 1s linear infinite" }}/>
            <style>{`@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}`}</style>
          </div>
        : <QuizMenu db={QUIZ_INDEX} onSelect={handleSelect}/>
      }
    </Screen>
  );
}

// ─────────────────────────────────────────
// 로그인
// ─────────────────────────────────────────
function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const handleGoogle = async () => {
    setLoading(true);
    await supabase.auth.signInWithOAuth({ provider:"google", options:{ redirectTo:window.location.origin } });
  };
  return (
    <div style={{ minHeight:"100vh", background:"#fff", fontFamily:"'Pretendard','Apple SD Gothic Neo',sans-serif", display:"flex", alignItems:"center", justifyContent:"center", padding:32 }}>
      <div style={{ width:"100%", maxWidth:360, textAlign:"center" }}>
        <div style={{ width:72, height:72, borderRadius:24, background:"#F5F5F5", margin:"0 auto 24px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:36 }}>🎓</div>
        <div style={{ fontSize:26, fontWeight:900, color:"#111", marginBottom:8 }}>학습 대시보드</div>
        <div style={{ fontSize:14, color:"#aaa", marginBottom:48 }}>로그인하고 학습을 시작해요!</div>
        <button onClick={handleGoogle} disabled={loading} style={{ width:"100%", padding:"16px 20px", background:"#111", border:"none", borderRadius:16, cursor:loading?"default":"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:12, fontSize:15, fontWeight:700, color:"#fff" }}>
          <svg width="20" height="20" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.6 32.9 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.3 6.5 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.9z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16 19 13 24 13c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.3 6.5 29.4 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.3 26.7 36 24 36c-5.2 0-9.5-3.1-11.3-7.5l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.4 4.2-4.4 5.6l6.2 5.2C40.9 35.4 44 30.1 44 24c0-1.3-.1-2.7-.4-3.9z"/></svg>
          {loading ? "로그인 중..." : "구글로 로그인"}
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// 메인 앱
// ─────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [screen, setScreen] = useState("home");
  const [timetable, setTimetable] = useState(defaultTimetable);
  const [books, setBooks] = useState(defaultBooks);
  const [tasks, setTasks] = useState(defaultTasks);
  const [today] = useState(() => DAYS[new Date().getDay()-1] || "월");
  const [greeting] = useState(() => {
    const h = new Date().getHours();
    if (h < 12) return "좋은 아침이에요 ☀️";
    if (h < 18) return "열심히 공부해요 💪";
    return "오늘도 수고했어요 🌙";
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data:{ session } }) => { setUser(session?.user??null); setAuthLoading(false); });
    const { data:{ subscription } } = supabase.auth.onAuthStateChange((_,session) => setUser(session?.user??null));
    return () => subscription.unsubscribe();
  }, []);

  if (authLoading) return (
    <div style={{ height:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#fff" }}>
      <div style={{ width:32, height:32, border:"3px solid #eee", borderTop:"3px solid #111", borderRadius:"50%", animation:"spin 1s linear infinite" }}/>
      <style>{`@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}`}</style>
    </div>
  );
  if (!user) return <LoginScreen/>;

  if (screen==="timetable") return <TimetableScreen timetable={timetable} setTimetable={setTimetable} today={today} onBack={()=>setScreen("home")}/>;
  if (screen==="books")     return <BooksScreen books={books} setBooks={setBooks} onBack={()=>setScreen("home")}/>;
  if (screen==="tasks")     return <TasksScreen tasks={tasks} setTasks={setTasks} onBack={()=>setScreen("home")}/>;
  if (screen==="quiz")      return <QuizScreen onBack={()=>setScreen("home")}/>;

  // ── 홈 ──
  const doneTasks  = tasks.filter(t=>t.done).length;
  const taskPct    = tasks.length ? Math.round((doneTasks/tasks.length)*100) : 0;
  const todaySubs  = (timetable[today]||[]).filter(Boolean);
  const firstName  = (user?.user_metadata?.full_name || user?.email || "학생").split(" ")[0];
  const avatarUrl  = user?.user_metadata?.avatar_url;

  const menuItems = [
    { id:"timetable", label:"시간표", Icon:Icon.Timetable, color:"#FF6B6B", bg:"#FFF0F0" },
    { id:"books",     label:"진도표", Icon:Icon.Books,     color:"#48DBFB", bg:"#EDFAFE" },
    { id:"tasks",     label:"할일",   Icon:Icon.Tasks,     color:"#1DD1A1", bg:"#EAFAF5" },
    { id:"quiz",      label:"퀴즈",   Icon:Icon.Quiz,      color:"#A29BFE", bg:"#F3F1FF" },
  ];

  return (
    <Home
      setScreen={setScreen}
      user={user}
      tasks={tasks}
      books={books}
      timetable={timetable}
    />
  );
}