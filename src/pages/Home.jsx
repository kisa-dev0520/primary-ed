import { Icon } from '@iconify/react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-[#171a1f] font-sans flex flex-col lg:flex-row">
      {/* Desktop Sidebar - Hidden on Mobile */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-[#dee1e6] h-screen sticky top-0 bg-white p-6 gap-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#9d7ee7] flex items-center justify-center text-white">
            <Icon icon="ph:student-bold" className="w-6 h-6" />
          </div>
          <span className="font-bold text-xl tracking-tight">EduPlanner</span>
        </div>
        
        <nav className="flex flex-col gap-2">
          <button className="flex items-center gap-3 px-4 py-3 bg-[#f2f2fd] text-[#9d7ee7] rounded-xl font-semibold transition-all">
            <Icon icon="ri:home-fill" className="w-5 h-5" />
            홈
          </button>
          <button className="flex items-center gap-3 px-4 py-3 text-[#9095a1] hover:bg-gray-50 rounded-xl transition-all">
            <Icon icon="ph:calendar-blank" className="w-5 h-5" />
            시간표
          </button>
          <button className="flex items-center gap-3 px-4 py-3 text-[#9095a1] hover:bg-gray-50 rounded-xl transition-all">
            <Icon icon="ph:chart-line-up" className="w-5 h-5" />
            진도표
          </button>
          <button className="flex items-center gap-3 px-4 py-3 text-[#9095a1] hover:bg-gray-50 rounded-xl transition-all">
            <Icon icon="ph:book-open" className="w-5 h-5" />
            어휘 퀴즈
          </button>
        </nav>

        <div className="mt-auto p-4 bg-[#f2f2fd] rounded-2xl">
          <p className="text-xs text-[#9095a1] mb-2">오늘의 목표</p>
          <div className="w-full bg-white rounded-full h-2 mb-2">
            <div className="bg-[#E8618C] h-2 rounded-full w-[60%]"></div>
          </div>
          <p className="text-xs font-semibold text-[#323743]">60% 완료</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1200px] mx-auto w-full">

        {/* Header Section */}
        <header className="px-6 pt-10 pb-6 lg:pt-10 lg:px-12">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <div className="relative w-[70px] h-[70px] lg:w-24 lg:h-24 rounded-full overflow-hidden border-2 border-white shadow-md bg-[#9d7ee7] flex items-center justify-center">
                <Icon icon="ph:student-bold" className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-4xl font-bold">초롱이</h1>
                <p className="text-xs lg:text-base text-[#9095a1] font-light mt-1">
                  4학년은 중요한 학년이야! 화이팅!
                </p>
              </div>
            </div>
          </div>

          {/* Quiz Rating */}
          <div className="flex justify-end items-center gap-2 mt-4 lg:mt-0">
            <span className="text-sm font-light text-[#171a1f]">오늘의 퀴즈</span>
            <div className="flex gap-0.5">
              {[1,2,3,4].map(i => (
                <Icon key={i} icon="ph:star-fill" className="w-3.5 h-3.5 text-[#f3c63f]" />
              ))}
              <Icon icon="ph:star-fill" className="w-3.5 h-3.5 text-[#dee1e6]" />
            </div>
          </div>
        </header>

        {/* Word of the Day & Quick Actions Grid */}
        <div className="px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          {/* Word of the Day Card */}
          <section className="lg:col-span-7 bg-[#f2f2fd] rounded-[16px] p-6 lg:p-10 flex flex-col items-center text-center lg:text-left lg:items-start">
            <h2 className="text-[32px] lg:text-5xl font-bold text-[#E8618C] mb-4">배려</h2>
            <p className="text-sm lg:text-lg leading-[24px] lg:leading-[32px] text-[#323743]">
              친구와 크게 싸웠는데, 서로 미안하다고 말하고 나쁜 감정을 풀어서 다시 사이좋게 지내게 되었어요.<br />
              이처럼 싸움을 멈추고 나쁜 감정을 풀어 사이좋게 지내는 것을 배려라고 해요.
            </p>
          </section>

          {/* Quick Actions */}
          <section className="lg:col-span-5 grid grid-cols-4 lg:grid-cols-2 gap-4 lg:gap-6 py-4">
            {[
              { icon: "ph:pencil-simple-bold", label: "오늘의 공부", color: "bg-[#9d7ee7]" },
              { icon: "ph:calendar-blank", label: "시간표", color: "bg-[#9d7ee7]" },
              { icon: "ph:chart-line-up", label: "진도표", color: "bg-[#9d7ee7]" },
              { icon: "ph:book-open", label: "어휘 퀴즈", color: "bg-[#E8618C]" },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div className={`w-14 h-14 lg:w-20 lg:h-20 ${item.color} rounded-full flex items-center justify-center shadow-sm hover:scale-105 transition-transform cursor-pointer`}>
                  <Icon icon={item.icon} className="w-7 h-7 lg:w-9 lg:h-9 text-white" />
                </div>
                <span className="text-sm lg:text-base font-semibold">{item.label}</span>
              </div>
            ))}
          </section>
        </div>

        {/* Lists Section */}
        <div className="px-6 lg:px-12 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Study List */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <h3 className="text-xl lg:text-2xl font-bold">오늘 남은 공부</h3>
                <span className="text-[11px] lg:text-sm font-medium text-[#E8618C]">
                  미완료 <span className="text-sm lg:text-lg">7</span>개
                </span>
              </div>
              <button className="flex items-center gap-1 text-xs lg:text-sm text-[#424856] hover:underline">
                더 보기
                <Icon icon="ph:caret-right" className="w-3 h-3" />
              </button>
            </div>
            
            <div className="border border-[#dee1e6] rounded-[10px] p-4 lg:p-6 flex flex-col gap-4 bg-white">
              {[
                "삼국지 워크지 제 3화",
                "우공비 Q+Q 표준 4-1",
                "초등 영어 문장 쓰기가 먼저...",
                "영어 사전 읽기",
                "드래곤 마스터스 음독",
                "[복습] 교과서 4-1 : 1단원",
              ].map((title, idx) => (
                <div key={idx} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Icon icon="ph:circle" className="w-[22px] h-[22px] text-[#bdc1ca] group-hover:text-[#9d7ee7] transition-colors" />
                    <span className="text-sm lg:text-base font-medium text-[#323743]">{title}</span>
                  </div>
                  <span className="text-[12px] text-[#6f7787] font-light">오전 6:40~8:30</span>
                </div>
              ))}
            </div>
          </section>

          {/* School Tasks List */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-xl lg:text-2xl font-bold">학교 과제 / 준비물</h3>
              <span className="text-[11px] lg:text-sm font-medium text-[#E8618C]">
                미완료 <span className="text-base lg:text-lg">2</span>개
              </span>
            </div>

            <div className="border border-[#dee1e6] rounded-[10px] p-4 lg:p-6 flex flex-col gap-5 bg-white">
              {[
                { text: "[내일까지] 영어 노트 가져가기", done: false },
                { text: "[월요일 시험] 기초학력고사 !! 공부하기", done: true },
                { text: "학급 회장 나간다! 📌 준비물 : 공약", done: false },
              ].map((task, idx) => (
                <div key={idx} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <Icon
                      icon={task.done ? "ph:check-circle-fill" : "ph:circle"}
                      className={`w-[22px] h-[22px] ${task.done ? "text-[#E8618C]" : "text-[#bdc1ca]"}`}
                    />
                    <span className="text-sm lg:text-base font-medium">{task.text}</span>
                  </div>
                </div>
              ))}

              {/* Add Button */}
              <button className="flex justify-center items-center py-2 mt-2 border-t border-dashed border-[#dee1e6] hover:bg-gray-50 transition-colors rounded-b-lg">
                <Icon icon="ph:plus" className="w-5 h-5 text-[#9095a1]" />
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#dee1e6] px-8 py-3 flex justify-between items-center z-50">
        <button className="flex flex-col items-center gap-1 text-[#9d7ee7]">
          <Icon icon="ri:home-fill" className="w-6 h-6" />
          <span className="text-[10px] font-bold">홈</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-[#9095a1]">
          <Icon icon="ph:calendar-blank" className="w-6 h-6" />
          <span className="text-[10px]">시간표</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-[#9095a1]">
          <Icon icon="ph:chart-line-up" className="w-6 h-6" />
          <span className="text-[10px]">진도표</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-[#9095a1]">
          <Icon icon="ph:user" className="w-6 h-6" />
          <span className="text-[10px]">마이</span>
        </button>
      </nav>
      
      {/* Padding for mobile bottom nav */}
      <div className="lg:hidden h-20"></div>
    </div>
  );
}