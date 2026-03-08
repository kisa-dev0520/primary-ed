export default function Home({ setScreen, user, tasks, timetable }) {
  const DAYS = ["월", "화", "수", "목", "금"];
  const today = DAYS[new Date().getDay() - 1] || "월";
  const doneTasks = tasks ? tasks.filter(t => t.done).length : 0;
  const taskPct = tasks?.length ? Math.round((doneTasks / tasks.length) * 100) : 0;
  const todaySubs = (timetable?.[today] || []).filter(Boolean);
  const firstName = (user?.user_metadata?.full_name || user?.email || "학생").split(" ")[0];
  const avatarUrl = user?.user_metadata?.avatar_url;

  const s = {
    wrap: { minHeight:"100vh", background:"#fff", fontFamily:"'Pretendard','Apple SD Gothic Neo',sans-serif", maxWidth:430, margin:"0 auto" },
    header: { padding:"52px 24px 0", display:"flex", justifyContent:"space-between", alignItems:"center" },
    avatar: { width:48, height:48, borderRadius:"50%", background:"#9d7ee7", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, color:"#fff", overflow:"hidden", flexShrink:0 },
    greeting: { fontSize:13, color:"#aaa", fontWeight:500 },
    name: { fontSize:24, fontWeight:900, color:"#111", marginTop:2 },
  };

  const menuItems = [
    { id:"tasks",     label:"오늘의 공부", emoji:"✏️",  color:"#9d7ee7", bg:"#f2f2fd" },
    { id:"timetable", label:"시간표",      emoji:"📅",  color:"#9d7ee7", bg:"#f2f2fd" },
    { id:"books",     label:"진도표",      emoji:"📈",  color:"#9d7ee7", bg:"#f2f2fd" },
    { id:"quiz",      label:"어휘 퀴즈",   emoji:"📖",  color:"#E8618C", bg:"#fdf2f6" },
  ];

  return (
    <div style={s.wrap}>
      <style>{`* { box-sizing:border-box; -webkit-tap-highlight-color:transparent; } body { margin:0; background:#fff; }`}</style>

      {/* 상단 프로필 */}
      <div style={s.header}>
        <div>
          <div style={s.greeting}>
            {new Date().getHours() < 12 ? "좋은 아침이에요 ☀️" : new Date().getHours() < 18 ? "열심히 공부해요 💪" : "오늘도 수고했어요 🌙"}
          </div>
          <div style={s.name}>{firstName}의 대시보드</div>
        </div>
        <div style={s.avatar}>
          {avatarUrl
            ? <img src={avatarUrl} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
            : <span>{firstName.charAt(0)}</span>
          }
        </div>
      </div>

      {/* 오늘 현황 배너 */}
      <div style={{ margin:"20px 24px 0", background:"#f2f2fd", borderRadius:24, padding:"20px 24px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", right:-10, top:-10, width:100, height:100, borderRadius:"50%", background:"#e8e8fa" }}/>
        <div style={{ position:"relative" }}>
          <div style={{ fontSize:13, color:"#9095a1", fontWeight:600, marginBottom:4 }}>오늘 {today}요일</div>
          <div style={{ fontSize:26, fontWeight:900, color:"#171a1f", marginBottom:2 }}>
            {doneTasks === tasks?.length && tasks?.length > 0 ? "🎉 다 끝났어요!" : `할일 ${doneTasks}/${tasks?.length || 0} 완료`}
          </div>
          <div style={{ fontSize:13, color:"#9095a1" }}>수업 {todaySubs.length}교시</div>
          <div style={{ marginTop:14, height:6, borderRadius:99, background:"#fff", overflow:"hidden" }}>
            <div style={{ height:"100%", borderRadius:99, background:"#9d7ee7", width:`${taskPct}%`, transition:"width 0.5s ease" }}/>
          </div>
        </div>
      </div>

      {/* 오늘의 단어 카드 */}
      <div style={{ margin:"20px 24px 0", background:"#fff", border:"1px solid #f0f0f0", borderRadius:20, padding:"20px 24px" }}>
        <div style={{ fontSize:11, color:"#9095a1", fontWeight:600, marginBottom:8 }}>오늘의 단어</div>
        <div style={{ fontSize:36, fontWeight:900, color:"#E8618C", marginBottom:10 }}>배려</div>
        <div style={{ fontSize:14, color:"#323743", lineHeight:1.7 }}>
          친구와 크게 싸웠는데, 서로 미안하다고 말하고 나쁜 감정을 풀어서 다시 사이좋게 지내게 되었어요. 이처럼 싸움을 멈추고 나쁜 감정을 풀어 사이좋게 지내는 것을 배려라고 해요.
        </div>
      </div>

      {/* 메뉴 4개 */}
      <div style={{ padding:"24px 24px 0", display:"flex", justifyContent:"space-between" }}>
        {menuItems.map(m => (
          <button key={m.id} onClick={() => setScreen(m.id)}
            style={{ background:"none", border:"none", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:8, padding:0 }}>
            <div style={{
              width:64, height:64, borderRadius:"50%",
              background:m.bg, border:`2px solid ${m.color}22`,
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:26, transition:"transform 0.15s",
            }}
              onTouchStart={e => e.currentTarget.style.transform="scale(0.9)"}
              onTouchEnd={e => e.currentTarget.style.transform="scale(1)"}
            >
              {m.emoji}
            </div>
            <span style={{ fontSize:11, fontWeight:700, color:"#333", whiteSpace:"nowrap" }}>{m.label}</span>
          </button>
        ))}
      </div>

      {/* 오늘 시간표 */}
      <div style={{ padding:"24px 24px 0" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
          <span style={{ fontSize:17, fontWeight:900, color:"#111" }}>오늘 시간표</span>
          <button onClick={() => setScreen("timetable")} style={{ background:"none", border:"none", color:"#9095a1", fontSize:13, cursor:"pointer", fontWeight:600 }}>
            전체보기 →
          </button>
        </div>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
          {todaySubs.length > 0
            ? todaySubs.map((sub, i) => (
                <div key={i} style={{ background:"#f2f2fd", borderRadius:12, padding:"8px 14px" }}>
                  <span style={{ fontSize:11, fontWeight:700, color:"#9d7ee7" }}>{i+1}. {sub}</span>
                </div>
              ))
            : <span style={{ fontSize:13, color:"#aaa" }}>시간표를 추가해주세요</span>
          }
        </div>
      </div>

      {/* 할일 목록 */}
      <div style={{ padding:"24px 24px 80px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ fontSize:17, fontWeight:900, color:"#111" }}>오늘 할일</span>
            {tasks?.filter(t => !t.done).length > 0 &&
              <span style={{ fontSize:12, color:"#E8618C", fontWeight:700 }}>
                미완료 {tasks.filter(t => !t.done).length}개
              </span>
            }
          </div>
          <button onClick={() => setScreen("tasks")} style={{ background:"none", border:"none", color:"#9095a1", fontSize:13, cursor:"pointer", fontWeight:600 }}>
            전체보기 →
          </button>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
          {(tasks || []).slice(0, 5).map(t => (
            <div key={t.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 0", borderBottom:"1px solid #f5f5f5", opacity:t.done ? 0.45 : 1 }}>
              <div style={{ width:10, height:10, borderRadius:"50%", background:t.done ? "#9d7ee7" : "#dee1e6", flexShrink:0 }}/>
              <span style={{ fontSize:14, fontWeight:500, color:"#111", textDecoration:t.done ? "line-through" : "none", flex:1 }}>{t.text}</span>
              {t.done && <span style={{ fontSize:13, color:"#9d7ee7" }}>✓</span>}
            </div>
          ))}
          {!tasks?.length && <span style={{ fontSize:13, color:"#aaa" }}>할일을 추가해주세요</span>}
        </div>
      </div>

      {/* 하단 네비게이션 */}
      <nav style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:430, background:"#fff", borderTop:"1px solid #dee1e6", padding:"12px 32px", display:"flex", justifyContent:"space-between", alignItems:"center", zIndex:50 }}>
        {[
          { id:"home",      label:"홈",    emoji:"🏠", active:true },
          { id:"timetable", label:"시간표", emoji:"📅", active:false },
          { id:"books",     label:"진도표", emoji:"📈", active:false },
          { id:"quiz",      label:"퀴즈",   emoji:"📖", active:false },
        ].map(item => (
          <button key={item.id} onClick={() => item.id !== "home" && setScreen(item.id)}
            style={{ background:"none", border:"none", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:3, padding:0 }}>
            <span style={{ fontSize:22 }}>{item.emoji}</span>
            <span style={{ fontSize:10, fontWeight:item.active ? 700 : 500, color:item.active ? "#9d7ee7" : "#9095a1" }}>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}