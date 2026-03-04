import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
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
  if (!colorMap[subject]) { colorMap[subject] = FALLBACK[colorCnt++ % FALLBACK.length]; }
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
  { id:2, title:"독해력 쑥쑥 3단계",  subject:"국어", total:80,  done:72, color:"#FF6B6B" },
  { id:3, title:"Magic Tree House",  subject:"영어", total:60,  done:20, color:"#48DBFB" },
];
const defaultTasks = [
  { id:1, text:"수학 p.46~48 풀기",    done:false, color:"#FF9F43" },
  { id:2, text:"독서록 쓰기",          done:true,  color:"#FF6B6B" },
  { id:3, text:"영단어 20개 외우기",   done:false, color:"#48DBFB" },
  { id:4, text:"받아쓰기 연습",        done:false, color:"#A29BFE" },
];

// ─────────────────────────────────────────
// 공통 전체화면 래퍼
// ─────────────────────────────────────────
function Screen({ title, accent, emoji, onBack, children }) {
  return (
    <div style={{
      position:"fixed", inset:0, zIndex:200,
      background:"#F5F5F7",
      display:"flex", flexDirection:"column",
      fontFamily:"'Pretendard','Apple SD Gothic Neo',sans-serif",
      maxWidth:430, margin:"0 auto",
      overflowY:"auto",
    }}>
      <div style={{
        background: accent,
        padding:"52px 20px 28px",
        borderRadius:"0 0 32px 32px",
        flexShrink:0,
        position:"relative", overflow:"hidden",
      }}>
        <div style={{ position:"absolute", top:-40, right:-40, width:140, height:140, borderRadius:"50%", background:"rgba(255,255,255,0.1)" }}/>
        <button onClick={onBack} style={{
          background:"rgba(255,255,255,0.22)", border:"none",
          borderRadius:99, padding:"7px 16px 7px 10px",
          display:"flex", alignItems:"center", gap:6,
          cursor:"pointer", marginBottom:20, position:"relative",
          color:"#fff", fontWeight:700, fontSize:13,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
          </svg>
          홈으로
        </button>
        <div style={{ fontSize:38, marginBottom:8, position:"relative" }}>{emoji}</div>
        <div style={{ fontSize:28, fontWeight:900, color:"#fff", position:"relative" }}>{title}</div>
      </div>
      <div style={{ flex:1, padding:"24px 20px 80px" }}>
        {children}
      </div>
    </div>
  );
}

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
    <Screen title="시간표" emoji="📅" accent="linear-gradient(135deg,#FF6B6B,#FF9F43)" onBack={onBack}>
      <div style={{ overflowX:"auto" }}>
        <table style={{ width:"100%", borderCollapse:"separate", borderSpacing:3, tableLayout:"fixed", minWidth:280 }}>
          <thead>
            <tr>
              <th style={{ width:22 }}></th>
              {DAYS.map(d => (
                <th key={d} style={{
                  padding:"10px 0", borderRadius:12, fontSize:13, fontWeight:800,
                  background: d===today ? "#FF6B6B" : "#EFEFEF",
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
                      style={{
                        height:50, borderRadius:12, cursor:"pointer",
                        background: sub ? c.light : "#F8F8F8",
                        textAlign:"center", verticalAlign:"middle",
                        border:`2px solid ${isEd ? c.bg : "transparent"}`,
                        transition:"all 0.15s",
                      }}>
                      {isEd ? (
                        <input autoFocus value={editVal}
                          onChange={e=>setEditVal(e.target.value)}
                          onBlur={saveEdit}
                          onKeyDown={e=>e.key==="Enter"&&saveEdit()}
                          style={{ width:"80%", border:"none", outline:"none", background:"transparent", textAlign:"center", fontSize:12, fontWeight:700, color:c.bg }}/>
                      ) : (
                        <span style={{ fontSize:12, fontWeight:sub?700:400, color:sub?c.bg:"#DDD" }}>{sub||"+"}</span>
                      )}
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
    <Screen title="진도표" emoji="📚" accent="linear-gradient(135deg,#48DBFB,#1DD1A1)" onBack={onBack}>
      <button onClick={()=>setShowAdd(!showAdd)} style={{ width:"100%", padding:"14px", background:"#fff", border:"2.5px dashed #48DBFB", borderRadius:16, color:"#48DBFB", fontWeight:800, fontSize:15, cursor:"pointer", marginBottom:16 }}>
        + 교재 추가
      </button>
      {showAdd && (
        <div style={{ background:"#fff", borderRadius:20, padding:20, marginBottom:16, boxShadow:"0 4px 20px rgba(0,0,0,0.08)" }}>
          {[{k:"title",p:"교재 이름"},{k:"subject",p:"과목"},{k:"total",p:"전체 쪽수",t:"number"},{k:"done",p:"현재 진도 (쪽)",t:"number"}].map(f=>(
            <input key={f.k} value={form[f.k]} onChange={e=>setForm({...form,[f.k]:e.target.value})}
              placeholder={f.p} type={f.t||"text"}
              style={{ width:"100%", border:"1.5px solid #eee", borderRadius:12, padding:"12px 14px", marginBottom:10, fontSize:14, outline:"none", boxSizing:"border-box" }}/>
          ))}
          <button onClick={addBook} style={{ width:"100%", background:"linear-gradient(135deg,#48DBFB,#1DD1A1)", color:"#fff", border:"none", borderRadius:12, padding:13, fontWeight:800, fontSize:15, cursor:"pointer" }}>추가하기</button>
        </div>
      )}
      <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
        {books.map(b => {
          const pct = Math.round((b.done/b.total)*100);
          return (
            <div key={b.id} style={{ background:"#fff", borderRadius:20, padding:"18px 16px", boxShadow:"0 4px 16px rgba(0,0,0,0.06)", display:"flex", gap:14, alignItems:"center" }}>
              <svg width="56" height="56" viewBox="0 0 56 56" style={{ flexShrink:0 }}>
                <circle cx="28" cy="28" r="22" fill="none" stroke="#f0f0f0" strokeWidth="5"/>
                <circle cx="28" cy="28" r="22" fill="none" stroke={b.color} strokeWidth="5"
                  strokeDasharray={`${(pct/100)*circ} ${circ}`} strokeDashoffset={circ*0.25}
                  strokeLinecap="round" style={{transition:"stroke-dasharray 0.5s"}}/>
                <text x="28" y="33" textAnchor="middle" fontSize="11" fontWeight="700" fill={b.color}>{pct}%</text>
              </svg>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontWeight:800, fontSize:15, color:"#222", marginBottom:3, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{b.title}</div>
                <div style={{ fontSize:12, color:"#aaa", marginBottom:8 }}>{b.subject} · {b.done}/{b.total}쪽</div>
                <div style={{ height:7, borderRadius:99, background:"#f0f0f0", overflow:"hidden" }}>
                  <div style={{ height:"100%", borderRadius:99, background:b.color, width:`${pct}%`, transition:"width 0.4s" }}/>
                </div>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:6, flexShrink:0 }}>
                <button onClick={()=>update(b.id,1)}  style={{ width:34, height:34, borderRadius:"50%", background:b.color,   color:"#fff", border:"none", fontWeight:900, fontSize:20, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>+</button>
                <button onClick={()=>update(b.id,-1)} style={{ width:34, height:34, borderRadius:"50%", background:"#f0f0f0", color:"#aaa", border:"none", fontWeight:900, fontSize:20, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>−</button>
                <button onClick={()=>remove(b.id)}    style={{ width:34, height:34, borderRadius:"50%", background:"#fff0f0", color:"#FF6B6B", border:"none", fontWeight:900, fontSize:18, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>×</button>
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
    <Screen title="할일" emoji="✅" accent="linear-gradient(135deg,#1DD1A1,#A29BFE)" onBack={onBack}>
      <div style={{ background:"#fff", borderRadius:20, padding:"20px", marginBottom:20, boxShadow:"0 4px 16px rgba(0,0,0,0.06)", textAlign:"center" }}>
        <div style={{ fontSize:44, fontWeight:900, color:"#1DD1A1", lineHeight:1 }}>{pct}%</div>
        <div style={{ fontSize:13, color:"#aaa", margin:"6px 0 14px" }}>{done}/{tasks.length} 완료</div>
        <div style={{ height:12, borderRadius:99, background:"#f0f0f0", overflow:"hidden" }}>
          <div style={{ height:"100%", borderRadius:99, background:"linear-gradient(90deg,#1DD1A1,#A29BFE)", width:`${pct}%`, transition:"width 0.4s" }}/>
        </div>
        {pct===100 && tasks.length>0 && <div style={{ marginTop:12, fontSize:16 }}>🎉 다 끝났어요! 최고예요!</div>}
      </div>
      <div style={{ display:"flex", gap:10, marginBottom:16 }}>
        <input value={newTask} onChange={e=>setNewTask(e.target.value)} onKeyDown={e=>e.key==="Enter"&&add()}
          placeholder="할일 추가하기..."
          style={{ flex:1, border:"2px solid #eee", borderRadius:14, padding:"13px 16px", fontSize:15, outline:"none", background:"#fff" }}/>
        <button onClick={add} style={{ width:52, height:52, borderRadius:14, background:"linear-gradient(135deg,#1DD1A1,#A29BFE)", color:"#fff", border:"none", fontWeight:900, fontSize:26, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>+</button>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {tasks.map(t=>(
          <div key={t.id} style={{ background:"#fff", borderRadius:16, padding:"16px", display:"flex", alignItems:"center", gap:12, boxShadow:"0 2px 10px rgba(0,0,0,0.05)", opacity:t.done?0.55:1, borderLeft:`4px solid ${t.color}`, transition:"opacity 0.2s" }}>
            <button onClick={()=>toggle(t.id)} style={{ width:28, height:28, borderRadius:"50%", flexShrink:0, border:`2.5px solid ${t.done?t.color:"#ddd"}`, background:t.done?t.color:"transparent", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:14, transition:"all 0.2s" }}>
              {t.done?"✓":""}
            </button>
            <span style={{ flex:1, fontSize:15, fontWeight:600, color:"#222", textDecoration:t.done?"line-through":"none" }}>{t.text}</span>
            <button onClick={()=>remove(t.id)} style={{ background:"none", border:"none", color:"#ddd", cursor:"pointer", fontSize:22, padding:0, lineHeight:1 }}>×</button>
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
    <Screen title="퀴즈" emoji="🧠" accent="linear-gradient(135deg,#A29BFE,#FD79A8)" onBack={onBack}>
      {loading ? (
        <div style={{ display:"flex", justifyContent:"center", padding:60 }}>
          <div style={{ width:32, height:32, border:"3px solid #EDE7F6", borderTop:"3px solid #A29BFE", borderRadius:"50%", animation:"spin 1s linear infinite" }}/>
          <style>{`@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}`}</style>
        </div>
      ) : (
        <QuizMenu db={QUIZ_INDEX} onSelect={handleSelect}/>
      )}
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
    <div style={{ minHeight:"100vh", background:"#FAFAFA", fontFamily:"'Pretendard','Apple SD Gothic Neo',sans-serif", display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
      <div style={{ background:"#fff", borderRadius:28, padding:"48px 32px", width:"100%", maxWidth:360, textAlign:"center", boxShadow:"0 12px 48px rgba(0,0,0,0.08)" }}>
        <div style={{ fontSize:52, marginBottom:16 }}>🎓</div>
        <div style={{ fontSize:24, fontWeight:900, color:"#111", marginBottom:6 }}>학습 대시보드</div>
        <div style={{ fontSize:14, color:"#aaa", marginBottom:40 }}>로그인하고 학습을 시작해요!</div>
        <button onClick={handleGoogle} disabled={loading} style={{ width:"100%", padding:"15px 20px", background:"#fff", border:"2px solid #eee", borderRadius:14, cursor:loading?"default":"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:12, fontSize:15, fontWeight:700, color:"#333", boxShadow:"0 2px 8px rgba(0,0,0,0.06)" }}>
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
    if (h < 12) return "좋은 아침이에요! ☀️";
    if (h < 18) return "열심히 공부해요! 💪";
    return "오늘도 수고했어요! 🌙";
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data:{ session } }) => { setUser(session?.user??null); setAuthLoading(false); });
    const { data:{ subscription } } = supabase.auth.onAuthStateChange((_,session) => setUser(session?.user??null));
    return () => subscription.unsubscribe();
  }, []);

  if (authLoading) return (
    <div style={{ height:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#fafafa" }}>
      <div style={{ width:32, height:32, border:"3px solid #eee", borderTop:"3px solid #A29BFE", borderRadius:"50%", animation:"spin 1s linear infinite" }}/>
      <style>{`@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}`}</style>
    </div>
  );
  if (!user) return <LoginScreen />;

  if (screen==="timetable") return <TimetableScreen timetable={timetable} setTimetable={setTimetable} today={today} onBack={()=>setScreen("home")}/>;
  if (screen==="books")     return <BooksScreen books={books} setBooks={setBooks} onBack={()=>setScreen("home")}/>;
  if (screen==="tasks")     return <TasksScreen tasks={tasks} setTasks={setTasks} onBack={()=>setScreen("home")}/>;
  if (screen==="quiz")      return <QuizScreen onBack={()=>setScreen("home")}/>;

  // ── 홈 ──
  const doneTasks = tasks.filter(t=>t.done).length;
  const taskPct = tasks.length ? Math.round((doneTasks/tasks.length)*100) : 0;
  const displayName = user?.user_metadata?.full_name || user?.email || "학생";
  const firstName = displayName.split(" ")[0];
  const avatarUrl = user?.user_metadata?.avatar_url;

  const menuCards = [
    { id:"timetable", emoji:"📅", label:"시간표", value:`${(timetable[today]||[]).filter(Boolean).length}교시`, sub:"오늘 수업",      from:"#FF6B6B", to:"#FF9F43" },
    { id:"books",     emoji:"📚", label:"진도표", value:`${books.length}권`,                                    sub:"학습 중",        from:"#48DBFB", to:"#1DD1A1" },
    { id:"tasks",     emoji:"✅", label:"할일",   value:`${doneTasks}/${tasks.length}`,                         sub:`${taskPct}% 완료`, from:"#1DD1A1", to:"#A29BFE" },
    { id:"quiz",      emoji:"🧠", label:"퀴즈",   value:"도전!",                                                 sub:"어휘 퀴즈",       from:"#A29BFE", to:"#FD79A8" },
  ];

  return (
    <div style={{
      minHeight:"100vh",
      background:"#F5F5F7",
      fontFamily:"'Pretendard','Apple SD Gothic Neo',sans-serif",
      maxWidth:430, margin:"0 auto",
    }}>
      <style>{`* { box-sizing:border-box; -webkit-tap-highlight-color:transparent; } body { margin:0; background:#F5F5F7; }`}</style>

      {/* 헤더 */}
      <div style={{
        background:"linear-gradient(135deg,#6C5CE7 0%,#a855f7 55%,#FF6B9D 100%)",
        padding:"56px 24px 36px",
        borderRadius:"0 0 36px 36px",
        position:"relative", overflow:"hidden",
      }}>
        <div style={{ position:"absolute", top:-50, right:-50, width:180, height:180, borderRadius:"50%", background:"rgba(255,255,255,0.08)" }}/>
        <div style={{ position:"absolute", bottom:-30, left:40, width:120, height:120, borderRadius:"50%", background:"rgba(255,255,255,0.05)" }}/>
        <div style={{ display:"flex", alignItems:"center", gap:14, position:"relative" }}>
          {avatarUrl
            ? <img src={avatarUrl} style={{ width:50, height:50, borderRadius:"50%", border:"3px solid rgba(255,255,255,0.4)", objectFit:"cover" }}/>
            : <div style={{ width:50, height:50, borderRadius:"50%", background:"rgba(255,255,255,0.25)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, fontWeight:900, color:"#fff" }}>{firstName.charAt(0)}</div>
          }
          <div>
            <div style={{ color:"rgba(255,255,255,0.75)", fontSize:13 }}>{greeting}</div>
            <div style={{ color:"#fff", fontSize:20, fontWeight:900 }}>{firstName}의 학습 대시보드</div>
          </div>
        </div>
        <div style={{ display:"flex", gap:8, marginTop:20, position:"relative" }}>
          {[
            { label:"오늘 할일", val:`${doneTasks}/${tasks.length}`, color:"#FECA57" },
            { label:"교재",     val:`${books.length}권`,             color:"#48DBFB" },
            { label:today+"요일", val:"오늘",                       color:"#1DD1A1" },
          ].map(s=>(
            <div key={s.label} style={{ background:"rgba(255,255,255,0.15)", backdropFilter:"blur(8px)", borderRadius:14, padding:"8px 12px", flex:1, textAlign:"center" }}>
              <div style={{ color:s.color, fontWeight:900, fontSize:17 }}>{s.val}</div>
              <div style={{ color:"rgba(255,255,255,0.7)", fontSize:10, marginTop:2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 메뉴 카드 2×2 */}
      <div style={{ padding:"24px 20px 16px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
          {menuCards.map(c=>(
            <button key={c.id} onClick={()=>setScreen(c.id)}
              style={{
                background:`linear-gradient(135deg,${c.from},${c.to})`,
                border:"none", borderRadius:24, padding:"24px 20px 20px",
                cursor:"pointer", textAlign:"left", position:"relative", overflow:"hidden",
                boxShadow:`0 8px 24px ${c.from}44`,
                transition:"transform 0.15s, box-shadow 0.15s",
                display:"flex", flexDirection:"column", justifyContent:"space-between",
                minHeight:150,
              }}
              onMouseDown={e=>{ e.currentTarget.style.transform="scale(0.95)"; }}
              onMouseUp={e=>{ e.currentTarget.style.transform="scale(1)"; }}
              onTouchStart={e=>{ e.currentTarget.style.transform="scale(0.95)"; }}
              onTouchEnd={e=>{ e.currentTarget.style.transform="scale(1)"; }}
            >
              <div style={{ position:"absolute", right:-18, bottom:-18, width:80, height:80, borderRadius:"50%", background:"rgba(255,255,255,0.18)" }}/>
              <div style={{ fontSize:34, lineHeight:1 }}>{c.emoji}</div>
              <div>
                <div style={{ fontSize:28, fontWeight:900, color:"#fff", lineHeight:1, marginBottom:3 }}>{c.value}</div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,0.75)", fontWeight:600, marginBottom:5 }}>{c.sub}</div>
                <div style={{ fontSize:16, fontWeight:800, color:"#fff" }}>{c.label}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 오늘 시간표 */}
      <div style={{ padding:"0 20px 16px" }}>
        <div style={{ background:"#fff", borderRadius:22, padding:"18px 20px", boxShadow:"0 4px 16px rgba(0,0,0,0.05)" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
            <span style={{ fontSize:15, fontWeight:800, color:"#111" }}>오늘 시간표</span>
            <button onClick={()=>setScreen("timetable")} style={{ background:"none", border:"none", color:"#bbb", fontSize:12, fontWeight:700, cursor:"pointer" }}>{today}요일 전체 →</button>
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
            {(timetable[today]||[]).map((sub,i)=>{
              const c = getColor(sub);
              return (
                <div key={i} style={{ background:sub?c.light:"#f8f8f8", borderRadius:99, padding:"7px 14px", display:"flex", alignItems:"center", gap:5 }}>
                  <span style={{ fontSize:10, fontWeight:700, color:sub?c.bg:"#ddd" }}>{i+1}</span>
                  <span style={{ fontSize:13, fontWeight:700, color:sub?c.bg:"#ccc" }}>{sub||"–"}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 할일 미리보기 */}
      <div style={{ padding:"0 20px 40px" }}>
        <div style={{ background:"#fff", borderRadius:22, padding:"18px 20px", boxShadow:"0 4px 16px rgba(0,0,0,0.05)" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
            <span style={{ fontSize:15, fontWeight:800, color:"#111" }}>오늘 할일</span>
            <button onClick={()=>setScreen("tasks")} style={{ background:"none", border:"none", color:"#bbb", fontSize:12, fontWeight:700, cursor:"pointer" }}>전체 →</button>
          </div>
          <div style={{ height:8, borderRadius:99, background:"#f0f0f0", overflow:"hidden", marginBottom:14 }}>
            <div style={{ height:"100%", borderRadius:99, background:"linear-gradient(90deg,#1DD1A1,#A29BFE)", width:`${taskPct}%`, transition:"width 0.4s" }}/>
          </div>
          {tasks.slice(0,3).map(t=>(
            <div key={t.id} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
              <div style={{ width:10, height:10, borderRadius:"50%", background:t.done?"#1DD1A1":"#eee", flexShrink:0 }}/>
              <span style={{ fontSize:14, color:t.done?"#bbb":"#333", textDecoration:t.done?"line-through":"none", fontWeight:500 }}>{t.text}</span>
            </div>
          ))}
          {tasks.length>3 && <div style={{ fontSize:12, color:"#ccc", paddingLeft:20 }}>+{tasks.length-3}개 더</div>}
        </div>
      </div>
    </div>
  );
}