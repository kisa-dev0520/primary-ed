import { Icon } from '@iconify/react';

export default function Home({ setScreen }) {
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
          <button onClick={() => setScreen("timetable")} className="flex items-center gap-3 px-4 py-3 text-[#9095a1] hover:bg-gray-50 rounded-xl transition-all">
            <Icon icon="ph:calendar-blank" className="w-5 h-5" />
            시간표
          </button>
          <button onClick={() => setScreen("books")} className="flex items-center gap-3 px-4 py-3 text-[#9095a1] hover:bg-gray-50 rounded-xl transition-all">
            <Icon icon="ph:chart-line-up" className="w-5 h-5" />
            진도표
          </button>
          <button onClick={() => setScreen("quiz")} className="flex items-center gap-3 px-4 py-3 text-[#9095a1] hover:bg-gray-50 rounded-xl transition-all">
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
        {/* Mobile Status Bar Placeholder */}
        <div className="lg:hidden w-full h-10 flex justify-between items-center px-6">
          <svg data-svg-id="SVG_1" className="w-[72px] h-[40px]">
        <g transform="matrix(1 0 0 1 0 0)">
          <g style={{  }}>
            <g transform="matrix(1 0 0 1 36 20)">
              <g style={{  }}>
                <g transform="matrix(1 0 0 1 -2.07 2.14)">
                  <path style={{ stroke: "none", strokeWidth: "1", strokeDasharray: "none", strokeLinecap: "butt", strokeDashoffset: "0", strokeLinejoin: "miter", strokeMiterlimit: "4", fill: "rgb(23,26,31)", fillRule: "nonzero", opacity: "1" }} transform=" translate(-33.93, -22.14)" d="M 33.7866 16.7856 C 31.5754 16.7856 30 18.2974 30 20.3673 L 30 20.3815 C 30 22.3171 31.3705 23.7442 33.3274 23.7442 C 34.7261 23.7442 35.6163 23.0307 35.9907 22.2253 L 36.132 22.2253 C 36.132 22.303 36.1249 22.3807 36.1249 22.4584 C 36.0472 24.4082 35.362 25.9907 33.7442 25.9907 C 32.847 25.9907 32.2183 25.5244 31.9498 24.8109 L 31.9286 24.7403 L 30.1342 24.7403 L 30.1484 24.818 C 30.4733 26.3792 31.8721 27.4884 33.7442 27.4884 C 36.3086 27.4884 37.8557 25.4538 37.8557 22.0204 L 37.8557 22.0063 C 37.8557 18.3328 35.9624 16.7856 33.7866 16.7856 Z M 33.7795 22.3454 C 32.6209 22.3454 31.7803 21.4977 31.7803 20.3179 L 31.7803 20.3038 C 31.7803 19.1664 32.6774 18.2692 33.8007 18.2692 C 34.931 18.2692 35.8141 19.1805 35.8141 20.3461 L 35.8141 20.3603 C 35.8141 21.5118 34.931 22.3454 33.7795 22.3454 Z" strokeLinecap="round" />
                </g>
                <g transform="matrix(1 0 0 1 4.72 2.13)">
                  <path style={{ stroke: "none", strokeWidth: "1", strokeDasharray: "none", strokeLinecap: "butt", strokeDashoffset: "0", strokeLinejoin: "miter", strokeMiterlimit: "4", fill: "rgb(23,26,31)", fillRule: "nonzero", opacity: "1" }} transform=" translate(-40.72, -22.13)" d="M 40.7158 20.6287 C 41.3657 20.6287 41.839 20.1342 41.839 19.5125 C 41.839 18.8838 41.3657 18.3963 40.7158 18.3963 C 40.0729 18.3963 39.5925 18.8838 39.5925 19.5125 C 39.5925 20.1342 40.0729 20.6287 40.7158 20.6287 Z M 40.7158 25.8706 C 41.3657 25.8706 41.839 25.3831 41.839 24.7544 C 41.839 24.1257 41.3657 23.6382 40.7158 23.6382 C 40.0729 23.6382 39.5925 24.1257 39.5925 24.7544 C 39.5925 25.3831 40.0729 25.8706 40.7158 25.8706 Z" strokeLinecap="round" />
                </g>
                <g transform="matrix(1 0 0 1 11.58 2.14)">
                  <path style={{ stroke: "none", strokeWidth: "1", strokeDasharray: "none", strokeLinecap: "butt", strokeDashoffset: "0", strokeLinejoin: "miter", strokeMiterlimit: "4", fill: "rgb(23,26,31)", fillRule: "nonzero", opacity: "1" }} transform=" translate(-47.58, -22.14)" d="M 48.521 27.234 L 50.2659 27.234 L 50.2659 25.2772 L 51.6364 25.2772 L 51.6364 23.7724 L 50.2659 23.7724 L 50.2659 17.04 L 47.6873 17.04 C 46.3027 19.1452 44.8545 21.4906 43.5334 23.7866 L 43.5334 25.2772 L 48.521 25.2772 L 48.521 27.234 Z M 45.2289 23.8148 L 45.2289 23.7088 C 46.2179 21.978 47.3977 20.0918 48.4432 18.4953 L 48.5492 18.4953 L 48.5492 23.8148 L 45.2289 23.8148 Z" strokeLinecap="round" />
                </g>
                <g transform="matrix(1 0 0 1 19.1 2.14)">
                  <path style={{ stroke: "none", strokeWidth: "1", strokeDasharray: "none", strokeLinecap: "butt", strokeDashoffset: "0", strokeLinejoin: "miter", strokeMiterlimit: "4", fill: "rgb(23,26,31)", fillRule: "nonzero", opacity: "1" }} transform=" translate(-55.1, -22.14)" d="M 55.5137 27.234 L 57.3364 27.234 L 57.3364 17.04 L 55.5208 17.04 L 52.8575 18.9121 L 52.8575 20.6287 L 55.3936 18.8343 L 55.5137 18.8343 L 55.5137 27.234 Z" strokeLinecap="round" />
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
          <svg data-svg-id="SVG_2" className="w-[96px] h-[40px]">
        <g transform="matrix(1 0 0 1 0 0)">
          <g style={{  }}>
            <g transform="matrix(1 0 0 1 48 20)">
              <g style={{  }}>
                <g transform="matrix(1 0 0 1 17.19 1.7)">
                  <path style={{ stroke: "rgb(23,26,31)", strokeWidth: "1", strokeDasharray: "none", strokeLinecap: "butt", strokeDashoffset: "0", strokeLinejoin: "miter", strokeMiterlimit: "4", fill: "none", fillRule: "nonzero", opacity: "0.35" }} transform=" translate(-65.19, -21.7)" d="M 55.0532 20.1702 C 55.0532 18.2372 56.6202 16.6702 58.5532 16.6702 L 71.8298 16.6702 C 73.7628 16.6702 75.3298 18.2372 75.3298 20.1702 L 75.3298 23.234 C 75.3298 25.167 73.7628 26.734 71.8298 26.734 L 58.5532 26.734 C 56.6202 26.734 55.0532 25.167 55.0532 23.234 L 55.0532 20.1702 Z" strokeLinecap="round" />
                </g>
                <g transform="matrix(1 0 0 1 29.28 2.22)">
                  <path style={{ stroke: "none", strokeWidth: "1", strokeDasharray: "none", strokeLinecap: "butt", strokeDashoffset: "0", strokeLinejoin: "miter", strokeMiterlimit: "4", fill: "rgb(23,26,31)", fillRule: "nonzero", opacity: "0.4" }} transform=" translate(-77.28, -22.22)" d="M 76.6808 20.4255 L 76.6808 24.0173 C 77.4035 23.7131 77.8734 23.0054 77.8734 22.2214 C 77.8734 21.4374 77.4035 20.7297 76.6808 20.4255 Z" strokeLinecap="round" />
                </g>
                <g transform="matrix(1 0 0 1 17.19 1.7)">
                  <path style={{ stroke: "none", strokeWidth: "1", strokeDasharray: "none", strokeLinecap: "butt", strokeDashoffset: "0", strokeLinejoin: "miter", strokeMiterlimit: "4", fill: "rgb(23,26,31)", fillRule: "nonzero", opacity: "1" }} transform=" translate(-65.19, -21.7)" d="M 56.2553 19.8723 C 56.2553 18.7677 57.1508 17.8723 58.2553 17.8723 L 72.1277 17.8723 C 73.2322 17.8723 74.1277 18.7677 74.1277 19.8723 L 74.1277 23.5319 C 74.1277 24.6364 73.2322 25.5319 72.1277 25.5319 L 58.2553 25.5319 C 57.1508 25.5319 56.2553 24.6364 56.2553 23.5319 L 56.2553 19.8723 Z" strokeLinecap="round" />
                </g>
                <g transform="matrix(1 0 0 1 -6.64 2.06)">
                  <path style={{ stroke: "none", strokeWidth: "1", strokeDasharray: "none", strokeLinecap: "butt", strokeDashoffset: "0", strokeLinejoin: "miter", strokeMiterlimit: "4", fill: "rgb(23,26,31)", fillRule: "evenodd", opacity: "1" }} transform=" translate(-41.36, -22.06)" d="M 41.3621 19.2234 C 43.4613 19.2235 45.4802 20.0468 47.0016 21.5232 C 47.1162 21.6372 47.2993 21.6357 47.4121 21.52 L 48.5072 20.3918 C 48.5644 20.3331 48.5962 20.2536 48.5957 20.1708 C 48.5953 20.0881 48.5625 20.0089 48.5047 19.9509 C 44.5116 16.0447 38.212 16.0447 34.2189 19.9509 C 34.161 20.0089 34.1282 20.088 34.1277 20.1707 C 34.1271 20.2535 34.1589 20.3331 34.216 20.3918 L 35.3115 21.52 C 35.4242 21.6359 35.6075 21.6374 35.722 21.5232 C 37.2435 20.0467 39.2627 19.2234 41.3621 19.2234 Z M 41.3923 22.6292 C 42.5456 22.6291 43.6579 23.0667 44.5128 23.857 C 44.6284 23.9691 44.8106 23.9667 44.9233 23.8515 L 46.0172 22.7233 C 46.0748 22.6642 46.1067 22.5839 46.1059 22.5005 C 46.1051 22.417 46.0715 22.3374 46.0127 22.2795 C 43.4093 19.8075 39.3775 19.8075 36.774 22.2795 C 36.7152 22.3374 36.6816 22.4171 36.6809 22.5005 C 36.6801 22.584 36.7122 22.6642 36.7699 22.7233 L 37.8634 23.8515 C 37.9762 23.9667 38.1583 23.9691 38.274 23.857 C 39.1283 23.0673 40.2397 22.6297 41.3923 22.6292 Z M 43.6166 24.8312 C 43.6183 24.9149 43.5861 24.9955 43.5276 25.0541 L 41.6354 27.0032 C 41.58 27.0605 41.5044 27.0928 41.4255 27.0928 C 41.3466 27.0928 41.2709 27.0605 41.2155 27.0032 L 39.323 25.0541 C 39.2645 24.9955 39.2324 24.9148 39.2341 24.8311 C 39.2358 24.7475 39.2713 24.6683 39.3322 24.6122 C 40.5406 23.5689 42.3104 23.5689 43.5188 24.6122 C 43.5796 24.6683 43.615 24.7475 43.6166 24.8312 Z" strokeLinecap="round" />
                </g>
                <g transform="matrix(1 0 0 1 -26.21 2.98)">
                  <path style={{ stroke: "none", strokeWidth: "1", strokeDasharray: "none", strokeLinecap: "butt", strokeDashoffset: "0", strokeLinejoin: "miter", strokeMiterlimit: "4", fill: "rgb(23,26,31)", fillRule: "nonzero", opacity: "1" }} transform=" translate(-21.79, -22.98)" d="M 20.5106 19.5744 C 20.5106 19.1044 20.8917 18.7234 21.3617 18.7234 L 22.2128 18.7234 C 22.6828 18.7234 23.0638 19.1044 23.0638 19.5744 L 23.0638 26.3829 C 23.0638 26.853 22.6828 27.234 22.2128 27.234 L 21.3617 27.234 C 20.8917 27.234 20.5106 26.853 20.5106 26.3829 L 20.5106 19.5744 Z" strokeLinecap="round" />
                </g>
                <g transform="matrix(1 0 0 1 -21.96 2.13)">
                  <path style={{ stroke: "none", strokeWidth: "1", strokeDasharray: "none", strokeLinecap: "butt", strokeDashoffset: "0", strokeLinejoin: "miter", strokeMiterlimit: "4", fill: "rgb(23,26,31)", fillRule: "nonzero", opacity: "1" }} transform=" translate(-26.04, -22.13)" d="M 24.766 17.8723 C 24.766 17.4023 25.147 17.0212 25.617 17.0212 L 26.4681 17.0212 C 26.9381 17.0212 27.3191 17.4023 27.3191 17.8723 L 27.3191 26.3829 C 27.3191 26.853 26.9381 27.234 26.4681 27.234 L 25.617 27.234 C 25.147 27.234 24.766 26.853 24.766 26.3829 L 24.766 17.8723 Z" strokeLinecap="round" />
                </g>
                <g transform="matrix(1 0 0 1 -30.47 4.47)">
                  <path style={{ stroke: "none", strokeWidth: "1", strokeDasharray: "none", strokeLinecap: "butt", strokeDashoffset: "0", strokeLinejoin: "miter", strokeMiterlimit: "4", fill: "rgb(23,26,31)", fillRule: "nonzero", opacity: "1" }} transform=" translate(-17.53, -24.47)" d="M 16.2553 22.5531 C 16.2553 22.0831 16.6364 21.7021 17.1064 21.7021 L 17.9574 21.7021 C 18.4275 21.7021 18.8085 22.0831 18.8085 22.5531 L 18.8085 26.3829 C 18.8085 26.853 18.4275 27.234 17.9574 27.234 L 17.1064 27.234 C 16.6364 27.234 16.2553 26.853 16.2553 26.3829 L 16.2553 22.5531 Z" strokeLinecap="round" />
                </g>
                <g transform="matrix(1 0 0 1 -34.72 5.53)">
                  <path style={{ stroke: "none", strokeWidth: "1", strokeDasharray: "none", strokeLinecap: "butt", strokeDashoffset: "0", strokeLinejoin: "miter", strokeMiterlimit: "4", fill: "rgb(23,26,31)", fillRule: "nonzero", opacity: "1" }} transform=" translate(-13.28, -25.53)" d="M 12 24.6808 C 12 24.2108 12.381 23.8297 12.8511 23.8297 L 13.7021 23.8297 C 14.1722 23.8297 14.5532 24.2108 14.5532 24.6808 L 14.5532 26.3829 C 14.5532 26.853 14.1722 27.234 13.7021 27.234 L 12.8511 27.234 C 12.381 27.234 12 26.853 12 26.3829 L 12 24.6808 Z" strokeLinecap="round" />
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
        </div>

        {/* Header Section */}
        <header className="px-6 pt-4 pb-6 lg:pt-10 lg:px-12">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <div className="relative w-[70px] h-[70px] lg:w-24 lg:h-24 rounded-full overflow-hidden border-2 border-white shadow-md">
                <img 
                  src="./assets/IMG_1.jpg" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl lg:text-4xl font-bold">초롱이</h1>
                  <button className="p-1">
                    <svg data-svg-id="SVG_4" className="w-[14px] h-[14px] text-[#bdc1ca]">
    <g transform="matrix(1 0 0 1 0 0)">
      <g style={{  }}>
        <g transform="matrix(0.58 0 0 0.58 7 7)">
          <path style={{ stroke: "none", strokeWidth: "1", strokeDasharray: "none", strokeLinecap: "butt", strokeDashoffset: "0", strokeLinejoin: "miter", strokeMiterlimit: "4", fill: "rgb(189,193,202)", fillRule: "nonzero", opacity: "1" }} transform=" translate(-12, -12)" d="M 21.0001 4.81895 C 21.0001 4.33656 20.8079 3.87397 20.4669 3.53282 C 20.1259 3.19183 19.6639 2.99981 19.1817 2.99962 C 18.6995 2.99956 18.2357 3.19009 17.8946 3.53087 L 17.8956 3.53185 L 4.54791 16.8824 C 4.43193 16.9981 4.34594 17.1408 4.29791 17.2975 L 3.24908 20.7486 L 6.70611 19.7008 L 6.82037 19.6588 C 6.93205 19.6093 7.03415 19.5395 7.12115 19.4527 L 20.4669 6.10509 L 20.5879 5.9713 C 20.8531 5.64775 21 5.24091 21.0001 4.81895 Z M 23.0001 4.81895 C 22.9999 5.76856 22.6463 6.68195 22.0118 7.38243 L 21.8809 7.51915 L 8.53326 20.8688 C 8.18555 21.2154 7.75786 21.472 7.28815 21.6149 L 2.93463 22.9352 L 2.9317 22.9361 C 2.67259 23.014 2.39721 23.0196 2.13483 22.9537 C 1.87238 22.8877 1.63206 22.7523 1.44049 22.5611 C 1.24886 22.3698 1.1124 22.1293 1.04596 21.8668 C 0.979645 21.6045 0.985155 21.3292 1.06256 21.0699 L 1.06451 21.066 L 2.38483 16.7135 L 2.3858 16.7106 L 2.44537 16.5367 C 2.57447 16.1925 2.76594 15.8752 3.00983 15.6002 L 3.1358 15.4654 L 16.4805 2.11778 L 16.6182 1.98692 C 17.3188 1.35279 18.2322 0.999499 19.1817 0.999619 C 20.1944 0.999806 21.1659 1.40254 21.8819 2.11876 C 22.5978 2.835 23.0002 3.80625 23.0001 4.81895 Z" strokeLinecap="round" />
        </g>
        <g transform="matrix(0.58 0 0 0.58 9.92 4.08)">
          <path style={{ stroke: "none", strokeWidth: "1", strokeDasharray: "none", strokeLinecap: "butt", strokeDashoffset: "0", strokeLinejoin: "miter", strokeMiterlimit: "4", fill: "rgb(189,193,202)", fillRule: "nonzero", opacity: "1" }} transform=" translate(-17, -7)" d="M 14.293 4.29296 C 14.6591 3.92685 15.2381 3.90425 15.6309 4.2246 L 15.707 4.29296 L 19.707 8.29296 L 19.7754 8.36913 C 20.0957 8.76191 20.0731 9.34091 19.707 9.70703 C 19.3409 10.0731 18.7619 10.0957 18.3691 9.77538 L 18.293 9.70703 L 14.293 5.70703 L 14.2246 5.63085 C 13.9043 5.23808 13.9268 4.65908 14.293 4.29296 Z" strokeLinecap="round" />
        </g>
      </g>
    </g>
  </svg>
                  </button>
                </div>
                <p className="text-xs lg:text-base text-[#9095a1] font-light mt-1">
                  4학년은 중요한 학년이야! 화이팅!
                </p>
              </div>
            </div>
            <button className="lg:hidden p-2">
              <svg data-svg-id="SVG_3" className="w-5 h-5 text-[#323743]">
    <g transform="matrix(1 0 0 1 0 0)">
      <g style={{  }}>
        <g transform="matrix(0.71 0 0 0.71 10 10)">
          <line style={{ stroke: "rgb(50,55,67)", strokeWidth: "2.4", strokeDasharray: "none", strokeLinecap: "square", strokeDashoffset: "0", strokeLinejoin: "miter", strokeMiterlimit: "10", fill: "none", fillRule: "nonzero", opacity: "1" }} x1="-11" y1="0" x2="11" y2="0" />
        </g>
        <g transform="matrix(0.71 0 0 0.71 10 5)">
          <line style={{ stroke: "rgb(50,55,67)", strokeWidth: "2.4", strokeDasharray: "none", strokeLinecap: "square", strokeDashoffset: "0", strokeLinejoin: "miter", strokeMiterlimit: "10", fill: "none", fillRule: "nonzero", opacity: "1" }} x1="-11" y1="0" x2="11" y2="0" />
        </g>
        <g transform="matrix(0.71 0 0 0.71 10 15)">
          <line style={{ stroke: "rgb(50,55,67)", strokeWidth: "2.4", strokeDasharray: "none", strokeLinecap: "square", strokeDashoffset: "0", strokeLinejoin: "miter", strokeMiterlimit: "10", fill: "none", fillRule: "nonzero", opacity: "1" }} x1="-11" y1="0" x2="11" y2="0" />
        </g>
      </g>
    </g>
  </svg>
            </button>
          </div>

          {/* Quiz Rating */}
          <div className="flex justify-end items-center gap-2 mt-4 lg:mt-0">
            <span className="text-sm font-light text-[#171a1f]">오늘의 퀴즈</span>
            <div className="flex gap-0.5">
              <svg data-svg-id="SVG_6" className="w-3.5 h-3.5 text-[#f3c63f]">
          <g transform="matrix(1 0 0 1 0 0)">
            <g style={{  }}>
              <g transform="matrix(0.58 0 0 0.58 7 6.88)">
                <path style={{ stroke: "none", strokeWidth: "1", strokeDasharray: "none", strokeLinecap: "butt", strokeDashoffset: "0", strokeLinejoin: "miter", strokeMiterlimit: "4", fill: "rgb(243,198,63)", fillRule: "nonzero", opacity: "1" }} transform=" translate(-12, -11.79)" d="M 11.2367 2.20032 C 11.5192 1.52111 12.4814 1.52112 12.7639 2.20033 L 15.0875 7.78692 C 15.2066 8.07326 15.4759 8.2689 15.785 8.29369 L 21.8162 8.7772 C 22.5495 8.83599 22.8468 9.75107 22.2881 10.2296 L 17.693 14.1659 C 17.4575 14.3676 17.3546 14.6842 17.4266 14.9858 L 18.8305 20.8712 C 19.0012 21.5868 18.2227 22.1523 17.595 21.7689 L 12.4314 18.615 C 12.1668 18.4534 11.8339 18.4534 11.5693 18.615 L 6.4057 21.7689 C 5.77793 22.1523 4.99951 21.5868 5.17019 20.8712 L 6.57408 14.9858 C 6.64604 14.6842 6.54318 14.3676 6.30766 14.1659 L 1.71252 10.2296 C 1.15385 9.75107 1.45118 8.83599 2.18445 8.7772 L 8.21565 8.29369 C 8.52477 8.2689 8.79405 8.07326 8.91315 7.78692 L 11.2367 2.20032 Z" strokeLinecap="round" />
              </g>
            </g>
          </g>
        </svg>
              <svg data-svg-id="SVG_7" className="w-3.5 h-3.5 text-[#f3c63f]">
          <g transform="matrix(1 0 0 1 0 0)">
            <g style={{  }}>
              <g transform="matrix(0.58 0 0 0.58 7 6.88)">
                <path style={{ stroke: "none", strokeWidth: "1", strokeDasharray: "none", strokeLinecap: "butt", strokeDashoffset: "0", strokeLinejoin: "miter", strokeMiterlimit: "4", fill: "rgb(243,198,63)", fillRule: "nonzero", opacity: "1" }} transform=" translate(-12, -11.79)" d="M 11.2367 2.20032 C 11.5192 1.52111 12.4814 1.52112 12.7639 2.20033 L 15.0875 7.78692 C 15.2066 8.07326 15.4759 8.2689 15.785 8.29369 L 21.8162 8.7772 C 22.5495 8.83599 22.8468 9.75107 22.2881 10.2296 L 17.693 14.1659 C 17.4575 14.3676 17.3546 14.6842 17.4266 14.9858 L 18.8305 20.8712 C 19.0012 21.5868 18.2227 22.1523 17.595 21.7689 L 12.4314 18.615 C 12.1668 18.4534 11.8339 18.4534 11.5693 18.615 L 6.4057 21.7689 C 5.77793 22.1523 4.99951 21.5868 5.17019 20.8712 L 6.57408 14.9858 C 6.64604 14.6842 6.54318 14.3676 6.30766 14.1659 L 1.71252 10.2296 C 1.15385 9.75107 1.45118 8.83599 2.18445 8.7772 L 8.21565 8.29369 C 8.52477 8.2689 8.79405 8.07326 8.91315 7.78692 L 11.2367 2.20032 Z" strokeLinecap="round" />
              </g>
            </g>
          </g>
        </svg>
              <svg data-svg-id="SVG_8" className="w-3.5 h-3.5 text-[#f3c63f]">
          <g transform="matrix(1 0 0 1 0 0)">
            <g style={{  }}>
              <g transform="matrix(0.58 0 0 0.58 7 6.88)">
                <path style={{ stroke: "none", strokeWidth: "1", strokeDasharray: "none", strokeLinecap: "butt", strokeDashoffset: "0", strokeLinejoin: "miter", strokeMiterlimit: "4", fill: "rgb(243,198,63)", fillRule: "nonzero", opacity: "1" }} transform=" translate(-12, -11.79)" d="M 11.2367 2.20032 C 11.5192 1.52111 12.4814 1.52112 12.7639 2.20033 L 15.0875 7.78692 C 15.2066 8.07326 15.4759 8.2689 15.785 8.29369 L 21.8162 8.7772 C 22.5495 8.83599 22.8468 9.75107 22.2881 10.2296 L 17.693 14.1659 C 17.4575 14.3676 17.3546 14.6842 17.4266 14.9858 L 18.8305 20.8712 C 19.0012 21.5868 18.2227 22.1523 17.595 21.7689 L 12.4314 18.615 C 12.1668 18.4534 11.8339 18.4534 11.5693 18.615 L 6.4057 21.7689 C 5.77793 22.1523 4.99951 21.5868 5.17019 20.8712 L 6.57408 14.9858 C 6.64604 14.6842 6.54318 14.3676 6.30766 14.1659 L 1.71252 10.2296 C 1.15385 9.75107 1.45118 8.83599 2.18445 8.7772 L 8.21565 8.29369 C 8.52477 8.2689 8.79405 8.07326 8.91315 7.78692 L 11.2367 2.20032 Z" strokeLinecap="round" />
              </g>
            </g>
          </g>
        </svg>
              <svg data-svg-id="SVG_9" className="w-3.5 h-3.5 text-[#f3c63f]">
          <g transform="matrix(1 0 0 1 0 0)">
            <g style={{  }}>
              <g transform="matrix(0.58 0 0 0.58 7 6.88)">
                <path style={{ stroke: "none", strokeWidth: "1", strokeDasharray: "none", strokeLinecap: "butt", strokeDashoffset: "0", strokeLinejoin: "miter", strokeMiterlimit: "4", fill: "rgb(243,198,63)", fillRule: "nonzero", opacity: "1" }} transform=" translate(-12, -11.79)" d="M 11.2367 2.20032 C 11.5192 1.52111 12.4814 1.52112 12.7639 2.20033 L 15.0875 7.78692 C 15.2066 8.07326 15.4759 8.2689 15.785 8.29369 L 21.8162 8.7772 C 22.5495 8.83599 22.8468 9.75107 22.2881 10.2296 L 17.693 14.1659 C 17.4575 14.3676 17.3546 14.6842 17.4266 14.9858 L 18.8305 20.8712 C 19.0012 21.5868 18.2227 22.1523 17.595 21.7689 L 12.4314 18.615 C 12.1668 18.4534 11.8339 18.4534 11.5693 18.615 L 6.4057 21.7689 C 5.77793 22.1523 4.99951 21.5868 5.17019 20.8712 L 6.57408 14.9858 C 6.64604 14.6842 6.54318 14.3676 6.30766 14.1659 L 1.71252 10.2296 C 1.15385 9.75107 1.45118 8.83599 2.18445 8.7772 L 8.21565 8.29369 C 8.52477 8.2689 8.79405 8.07326 8.91315 7.78692 L 11.2367 2.20032 Z" strokeLinecap="round" />
              </g>
            </g>
          </g>
        </svg>
              <svg data-svg-id="SVG_10" className="w-3.5 h-3.5 text-[#dee1e6]">
          <g transform="matrix(1 0 0 1 0 0)">
            <g style={{  }}>
              <g transform="matrix(0.58 0 0 0.58 7 6.88)">
                <path style={{ stroke: "none", strokeWidth: "1", strokeDasharray: "none", strokeLinecap: "butt", strokeDashoffset: "0", strokeLinejoin: "miter", strokeMiterlimit: "4", fill: "rgb(222,225,230)", fillRule: "nonzero", opacity: "1" }} transform=" translate(-12, -11.79)" d="M 11.2367 2.20032 C 11.5192 1.52111 12.4814 1.52112 12.7639 2.20033 L 15.0875 7.78692 C 15.2066 8.07326 15.4759 8.2689 15.785 8.29369 L 21.8162 8.7772 C 22.5495 8.83599 22.8468 9.75107 22.2881 10.2296 L 17.693 14.1659 C 17.4575 14.3676 17.3546 14.6842 17.4266 14.9858 L 18.8305 20.8712 C 19.0012 21.5868 18.2227 22.1523 17.595 21.7689 L 12.4314 18.615 C 12.1668 18.4534 11.8339 18.4534 11.5693 18.615 L 6.4057 21.7689 C 5.77793 22.1523 4.99951 21.5868 5.17019 20.8712 L 6.57408 14.9858 C 6.64604 14.6842 6.54318 14.3676 6.30766 14.1659 L 1.71252 10.2296 C 1.15385 9.75107 1.45118 8.83599 2.18445 8.7772 L 8.21565 8.29369 C 8.52477 8.2689 8.79405 8.07326 8.91315 7.78692 L 11.2367 2.20032 Z" strokeLinecap="round" />
              </g>
            </g>
          </g>
        </svg>
            </div>
            <button className="ml-1">
              <svg data-svg-id="SVG_5" className="w-4 h-4 text-[#424856]">
          <g transform="matrix(1 0 0 1 0 0)">
            <g style={{  }}>
              <g transform="matrix(0.67 0 0 0.67 8.2 8)">
                <path style={{ stroke: "none", strokeWidth: "1", strokeDasharray: "none", strokeLinecap: "butt", strokeDashoffset: "0", strokeLinejoin: "miter", strokeMiterlimit: "4", fill: "rgb(66,72,86)", fillRule: "nonzero", opacity: "1" }} transform=" translate(-12.3, -12)" d="M 7.00004 19.3909 L 8.60913 21 L 17.6091 12 L 8.60913 3 L 7.00004 4.60909 L 14.3909 12 L 7.00004 19.3909 Z" strokeLinecap="round" />
              </g>
            </g>
          </g>
        </svg>
            </button>
          </div>
        </header>

        {/* Word of the Day & Quick Actions Grid */}
        <div className="px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          {/* Word of the Day Card */}
          <section className="lg:col-span-7 bg-[#f2f2fd] rounded-[16px] p-6 lg:p-10 flex flex-col items-center text-center lg:text-left lg:items-start">
            <h2 className="text-[32px] lg:text-5xl font-bold text-[#E8618C] mb-4">배려</h2>
            <p className="text-sm lg:text-lg leading-[24px] lg:leading-[32px] text-[#323743]">
              친구와 크게 싸웠는데, 서로 미안하다고 말하고 나쁜 감정을 풀어서 다시 사이좋게 지내게 되었어요.<br className="hidden lg:block" />
              이처럼 싸움을 멈추고 나쁜 감정을 풀어 사이좋게 지내는 것을 배려라고 해요.
            </p>
          </section>

          {/* Quick Actions */}
          <section className="lg:col-span-5 grid grid-cols-4 lg:grid-cols-2 gap-4 lg:gap-6 py-4">
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 lg:w-20 lg:h-20 bg-[#9d7ee7] rounded-full flex items-center justify-center shadow-sm hover:scale-105 transition-transform cursor-pointer">
                <svg data-svg-id="SVG_13" className="w-9 h-9 lg:w-12 lg:h-12 text-white">
        <g transform="matrix(1 0 0 1 0 0)">
          <g style={{  }}>
            <g transform="matrix(0.95 0 0 0.95 27.79 10.23)">
              <path style={{ stroke: "none", strokeWidth: "1", strokeDasharray: "none", strokeLinecap: "butt", strokeDashoffset: "0", strokeLinejoin: "miter", strokeMiterlimit: "4", fill: "rgb(255,255,255)", fillRule: "nonzero", opacity: "1" }} transform=" translate(-25.25, -6.76)" d="M 27.914 12.5 L 30.122 10.292 C 31.292479506661557 9.120615037326733 31.292479506661557 7.222384962673265 30.122 6.050999999999999 L 25.949 1.878 C 24.762074798619782 0.7456805195942127 22.894925201380218 0.7456805195942127 21.708000000000002 1.8780000000000003 L 19.5 4.086 Z" strokeLinecap="round" />
            </g>
            <g transform="matrix(0.95 0 0 0.95 21.67 29.43)">
              <rect style={{ stroke: "none", strokeWidth: "1", strokeDasharray: "none", strokeLinecap: "butt", strokeDashoffset: "0", strokeLinejoin: "miter", strokeMiterlimit: "4", fill: "rgb(255,255,255)", fillRule: "nonzero", opacity: "1" }} x="-9.6065" y="-2.475" rx="0" ry="0" width="19.213" height="4.95" />
            </g>
            <g transform="matrix(0.95 0 0 0.95 9.72 28.28)">
              <path style={{ stroke: "none", strokeWidth: "1", strokeDasharray: "none", strokeLinecap: "butt", strokeDashoffset: "0", strokeLinejoin: "miter", strokeMiterlimit: "4", fill: "rgb(255,255,255)", fillRule: "nonzero", opacity: "1" }} transform=" translate(-6.23, -25.77)" d="M 3.118 20.532 C 3.0761031076954732 20.611321132359326 3.0445139471595017 20.695670912088357 3.024 20.783 L 1.024 29.783 C 0.9581833827342726 30.079075153254067 1.0302979461007835 30.389021116975698 1.2200538135354158 30.62563268528302 C 1.409809680970048 30.862244253590344 1.6966976413315462 30.999947953164803 2 31 C 2.0729978373275832 31.00004102928319 2.1457753897701846 30.991991899059123 2.2170000000000005 30.976 L 11.217 28.976 C 11.304329087911645 28.955486052840495 11.388678867640674 28.923896892304526 11.468 28.881999999999998 Z" strokeLinecap="round" />
            </g>
            <g transform="matrix(0.95 0 0 0.95 17 24.76)">
              <rect style={{ stroke: "none", strokeWidth: "1", strokeDasharray: "none", strokeLinecap: "butt", strokeDashoffset: "0", strokeLinejoin: "miter", strokeMiterlimit: "4", fill: "rgb(255,255,255)", fillRule: "nonzero", opacity: "1" }} x="-9.6065" y="-2.475" rx="0" ry="0" width="19.213" height="4.95" />
            </g>
          </g>
        </g>
      </svg>
              </div>
              <span className="text-sm lg:text-base font-semibold">오늘의 공부</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 lg:w-20 lg:h-20 bg-[#9d7ee7] rounded-full flex items-center justify-center shadow-sm hover:scale-105 transition-transform cursor-pointer">
                <svg data-svg-id="SVG_12" className="w-9 h-9 lg:w-12 lg:h-12">
        <g transform="matrix(1.03 0 0 1 0 0)">
          <g style={{  }}>
            <g transform="matrix(1 0 0 1 19 19)">
              <g style={{  }}>
                <g transform="matrix(0.58 0 0 0.59 0.28 -11.08)">
                  <path style={{ stroke: "none", strokeWidth: "1", strokeDasharray: "none", strokeLinecap: "butt", strokeDashoffset: "0", strokeLinejoin: "miter", strokeMiterlimit: "4", fill: "rgb(255,255,255)", fillRule: "nonzero", opacity: "1" }} transform=" translate(-32.98, -13.33)" d="M 21.6495 6.66666 C 21.6495 6.13622 21.4388 5.62752 21.0637 5.25244 C 20.6887 4.87737 20.18 4.66666 19.6495 4.66666 C 19.1191 4.66666 18.6104 4.87737 18.2353 5.25244 C 17.8602 5.62752 17.6495 6.13622 17.6495 6.66666 L 17.6495 10.88 C 13.8095 11.1867 11.2922 11.9387 9.44152 13.792 C 7.58819 15.6427 6.83619 18.1627 6.52686 22 L 59.4389 22 C 59.1295 18.16 58.3775 15.6427 56.5242 13.792 C 54.6735 11.9387 52.1535 11.1867 48.3162 10.8773 L 48.3162 6.66666 C 48.3162 6.13622 48.1055 5.62752 47.7304 5.25244 C 47.3553 4.87737 46.8466 4.66666 46.3162 4.66666 C 45.7858 4.66666 45.277 4.87737 44.902 5.25244 C 44.5269 5.62752 44.3162 6.13622 44.3162 6.66666 L 44.3162 10.7013 C 42.5429 10.6667 40.5535 10.6667 38.3162 10.6667 L 27.6495 10.6667 C 25.4122 10.6667 23.4229 10.6667 21.6495 10.7013 L 21.6495 6.66666 Z" strokeLinecap="round" />
                </g>
                <g transform="matrix(0.58 0 0 0.59 0.28 6.14)">
                  <path style={{ stroke: "none", strokeWidth: "1", strokeDasharray: "none", strokeLinecap: "butt", strokeDashoffset: "0", strokeLinejoin: "miter", strokeMiterlimit: "4", fill: "rgb(255,255,255)", fillRule: "evenodd", opacity: "1" }} transform=" translate(-32.98, -42.33)" d="M 6.31641 32 C 6.31641 29.7627 6.31641 27.7733 6.35107 26 L 59.6151 26 C 59.6497 27.7733 59.6497 29.7627 59.6497 32 L 59.6497 37.3333 C 59.6497 47.3893 59.6497 52.4187 56.5244 55.5413 C 53.4017 58.6667 48.3724 58.6667 38.3164 58.6667 L 27.6497 58.6667 C 17.5937 58.6667 12.5644 58.6667 9.44174 55.5413 C 6.31641 52.4187 6.31641 47.3893 6.31641 37.3333 L 6.31641 32 Z M 46.3164 37.3333 C 47.0236 37.3333 47.7019 37.0524 48.202 36.5523 C 48.7021 36.0522 48.9831 35.3739 48.9831 34.6667 C 48.9831 33.9594 48.7021 33.2811 48.202 32.781 C 47.7019 32.281 47.0236 32 46.3164 32 C 45.6092 32 44.9309 32.281 44.4308 32.781 C 43.9307 33.2811 43.6497 33.9594 43.6497 34.6667 C 43.6497 35.3739 43.9307 36.0522 44.4308 36.5523 C 44.9309 37.0524 45.6092 37.3333 46.3164 37.3333 Z M 46.3164 48 C 47.0236 48 47.7019 47.7191 48.202 47.219 C 48.7021 46.7189 48.9831 46.0406 48.9831 45.3333 C 48.9831 44.6261 48.7021 43.9478 48.202 43.4477 C 47.7019 42.9476 47.0236 42.6667 46.3164 42.6667 C 45.6092 42.6667 44.9309 42.9476 44.4308 43.4477 C 43.9307 43.9478 43.6497 44.6261 43.6497 45.3333 C 43.6497 46.0406 43.9307 46.7189 44.4308 47.219 C 44.9309 47.7191 45.6092 48 46.3164 48 Z M 35.6497 34.6667 C 35.6497 35.3739 35.3688 36.0522 34.8687 36.5523 C 34.3686 37.0524 33.6903 37.3333 32.9831 37.3333 C 32.2758 37.3333 31.5976 37.0524 31.0975 36.5523 C 30.5974 36.0522 30.3164 35.3739 30.3164 34.6667 C 30.3164 33.9594 30.5974 33.2811 31.0975 32.781 C 31.5976 32.281 32.2758 32 32.9831 32 C 33.6903 32 34.3686 32.281 34.8687 32.781 C 35.3688 33.2811 35.6497 33.9594 35.6497 34.6667 Z M 35.6497 45.3333 C 35.6497 46.0406 35.3688 46.7189 34.8687 47.219 C 34.3686 47.7191 33.6903 48 32.9831 48 C 32.2758 48 31.5976 47.7191 31.0975 47.219 C 30.5974 46.7189 30.3164 46.0406 30.3164 45.3333 C 30.3164 44.6261 30.5974 43.9478 31.0975 43.4477 C 31.5976 42.9476 32.2758 42.6667 32.9831 42.6667 C 33.6903 42.6667 34.3686 42.9476 34.8687 43.4477 C 35.3688 43.9478 35.6497 44.6261 35.6497 45.3333 Z M 19.6497 37.3333 C 20.357 37.3333 21.0353 37.0524 21.5354 36.5523 C 22.0355 36.0522 22.3164 35.3739 22.3164 34.6667 C 22.3164 33.9594 22.0355 33.2811 21.5354 32.781 C 21.0353 32.281 20.357 32 19.6497 32 C 18.9425 32 18.2642 32.281 17.7641 32.781 C 17.264 33.2811 16.9831 33.9594 16.9831 34.6667 C 16.9831 35.3739 17.264 36.0522 17.7641 36.5523 C 18.2642 37.0524 18.9425 37.3333 19.6497 37.3333 Z M 19.6497 48 C 20.357 48 21.0353 47.7191 21.5354 47.219 C 22.0355 46.7189 22.3164 46.0406 22.3164 45.3333 C 22.3164 44.6261 22.0355 43.9478 21.5354 43.4477 C 21.0353 42.9476 20.357 42.6667 19.6497 42.6667 C 18.9425 42.6667 18.2642 42.9476 17.7641 43.4477 C 17.264 43.9478 16.9831 44.6261 16.9831 45.3333 C 16.9831 46.0406 17.264 46.7189 17.7641 47.219 C 18.2642 47.7191 18.9425 48 19.6497 48 Z" strokeLinecap="round" />
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
              </div>
              <span className="text-sm lg:text-base font-semibold">시간표</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 lg:w-20 lg:h-20 bg-[#9d7ee7] rounded-full flex items-center justify-center shadow-sm hover:scale-105 transition-transform cursor-pointer">
                <svg data-svg-id="SVG_14" className="w-9 h-9 lg:w-12 lg:h-12 text-white">
        <g transform="matrix(1 0 0 1 0 0)">
          <g style={{  }}>
            <g transform="matrix(0.95 0 0 0.95 9.5 19)">
              <path style={{ stroke: "none", strokeWidth: "1", strokeDasharray: "none", strokeLinecap: "butt", strokeDashoffset: "0", strokeLinejoin: "miter", strokeMiterlimit: "4", fill: "rgb(255,255,255)", fillRule: "nonzero", opacity: "1" }} transform=" translate(-6, -16)" d="M 6 0 C 5.448 0 5 0.448 5 1 L 5 31 C 5 31.552 5.448 32 6 32 C 6.552 32 7 31.552 7 31 L 7 1 C 7 0.448 6.552 0 6 0 z" strokeLinecap="round" />
            </g>
            <g transform="matrix(0.95 0 0 0.95 21.85 15.2)">
              <path style={{ stroke: "none", strokeWidth: "1", strokeDasharray: "none", strokeLinecap: "butt", strokeDashoffset: "0", strokeLinejoin: "miter", strokeMiterlimit: "4", fill: "rgb(255,255,255)", fillRule: "nonzero", opacity: "1" }} transform=" translate(-19, -12)" d="M 28.447 11.105 L 10.447 2.1050000000000004 C 10.136999999999999 1.9510000000000005 9.768999999999998 1.9670000000000005 9.473999999999998 2.1490000000000005 C 9.18 2.332 9 2.653 9 3 L 9 21 C 9 21.347 9.18 21.668 9.474 21.851 C 9.635 21.95 9.817 22 10 22 C 10.153 22 10.306 21.965 10.447 21.895 L 28.447 12.895 C 28.786 12.725 29 12.379 29 12 C 29 11.621 28.786 11.275 28.447 11.105 z" strokeLinecap="round" />
            </g>
          </g>
        </g>
      </svg>
              </div>
              <span className="text-sm lg:text-base font-semibold">진도표</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 lg:w-20 lg:h-20 bg-[#E8618C] rounded-full flex items-center justify-center shadow-sm hover:scale-105 transition-transform cursor-pointer">
                <svg data-svg-id="SVG_11" className="w-9 h-9 lg:w-12 lg:h-12 text-white">
            <g transform="matrix(1 0 0 1 0 0)">
              <g style={{  }}>
                <g transform="matrix(1.58 0 0 1.58 19 19)">
                  <path style={{ stroke: "none", strokeWidth: "1", strokeDasharray: "none", strokeLinecap: "butt", strokeDashoffset: "0", strokeLinejoin: "miter", strokeMiterlimit: "4", fill: "rgb(255,255,255)", fillRule: "nonzero", opacity: "1" }} transform=" translate(-12, -12)" d="M 12.555 17.025 C 11.931 15.797999999999998 11.201 14.559999999999999 9.774 14.559999999999999 C 9.502999999999998 14.559999999999999 9.228 14.605999999999998 8.979 14.716999999999999 L 8.495 13.749999999999998 C 9.084999999999999 13.240999999999998 10.039 12.838999999999999 11.264999999999999 12.838999999999999 C 13.172999999999998 12.838999999999999 14.153999999999998 13.761 14.931999999999999 14.932999999999998 C 15.390999999999998 13.931999999999999 15.61 12.578999999999997 15.61 10.902999999999999 C 15.61 6.714999999999999 14.302 4.566999999999998 11.244 4.566999999999998 C 8.23 4.566999999999998 6.926 6.714999999999998 6.926 10.902999999999999 C 6.926 15.066999999999998 8.231 17.194 11.244 17.194 C 11.722 17.194 12.157 17.143 12.555 17.025 L 12.555 17.025 z M 13.302 18.486 C 12.641 18.664 11.939 18.76 11.242999999999999 18.76 C 7.228999999999998 18.76 3.3019999999999987 15.558000000000002 3.3019999999999987 10.902000000000001 C 3.303 6.203 7.229 3 11.243 3 C 15.324000000000002 3 19.215 6.179 19.215 10.902999999999999 C 19.215 13.530999999999999 17.989 15.665999999999999 16.208 17.046 C 16.779999999999998 17.907 17.365 18.482 18.195999999999998 18.482 C 19.095 18.482 19.456999999999997 17.794999999999998 19.523999999999997 17.246 L 20.691 17.246 C 20.761 17.976 20.39 21 17.117 21 C 15.128 21 14.082 19.854 13.295000000000002 18.504 L 13.302 18.486 L 13.302 18.486 z" strokeLinecap="round" />
                </g>
              </g>
            </g>
          </svg>
              </div>
              <span className="text-sm lg:text-base font-semibold">어휘 퀴즈</span>
            </div>
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
                <svg data-svg-id="SVG_15" className="w-3 h-3">
      <g transform="matrix(1 0 0 1 0 0)">
        <g style={{  }}>
          <g transform="matrix(0.5 0 0 0.5 6.15 6)">
            <path style={{ stroke: "none", strokeWidth: "1", strokeDasharray: "none", strokeLinecap: "butt", strokeDashoffset: "0", strokeLinejoin: "miter", strokeMiterlimit: "4", fill: "rgb(66,72,86)", fillRule: "nonzero", opacity: "1" }} transform=" translate(-12.3, -12)" d="M 7.00004 19.3909 L 8.60913 21 L 17.6091 12 L 8.60913 3 L 7.00004 4.60909 L 14.3909 12 L 7.00004 19.3909 Z" strokeLinecap="round" />
          </g>
        </g>
      </g>
    </svg>
              </button>
            </div>
            
            <div className="border border-[#dee1e6] rounded-[10px] p-4 lg:p-6 flex flex-col gap-4 bg-white soft-card-shadow">
              {[
                { title: "삼국지 워크지 제 3화", time: "오전 6:40~8:30", id: "SVG_16" },
                { title: "우공비 Q+Q 표준 4-1", time: "오전 6:40~8:30", id: "SVG_17" },
                { title: "초등 영어 문장 쓰기가 먼저...", time: "오전 6:40~8:30", id: "SVG_18" },
                { title: "영어 사전 읽기", time: "오전 6:40~8:30", id: "SVG_19" },
                { title: "드래곤 마스터스 음독", time: "오전 6:40~8:30", id: "SVG_20" },
                { title: "[복습] 교과서 4-1 : 1단원", time: "오전 6:40~8:30", id: "SVG_21" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <svg data-svg-id={item.id} className="w-[22px] h-[22px] text-[#bdc1ca] group-hover:text-[#9d7ee7] transition-colors"></svg>
                    <span className="text-sm lg:text-base font-medium text-[#323743]">{item.title}</span>
                  </div>
                  <span className="text-[12px] text-[#6f7787] font-light">{item.time}</span>
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

            <div className="border border-[#dee1e6] rounded-[10px] p-4 lg:p-6 flex flex-col gap-5 bg-white soft-card-shadow">
              {/* Task 1 */}
              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <svg data-svg-id="SVG_22" className="w-[22px] h-[22px] text-[#bdc1ca]">
    <g transform="matrix(1 0 0 1 0 0)">
      <g style={{  }}>
        <g transform="matrix(0.79 0 0 0.79 11 11)">
          <circle style={{ stroke: "rgb(189,193,202)", strokeWidth: "2.4", strokeDasharray: "none", strokeLinecap: "square", strokeDashoffset: "0", strokeLinejoin: "miter", strokeMiterlimit: "10", fill: "none", fillRule: "nonzero", opacity: "1" }} cx="0" cy="0" r="10" />
        </g>
      </g>
    </g>
  </svg>
                  <span className="text-sm lg:text-base font-medium">[내일까지] 영어 노트 가져가기</span>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg data-svg-id="SVG_23" className="w-4 h-4 text-[#bdc1ca] hover:text-red-400">
    <g transform="matrix(1 0 0 1 0 0)">
      <g style={{  }}>
        <g transform="matrix(0.57 0 0 0.57 8 2.86)">
          <path style={{ stroke: "none", strokeWidth: "1", strokeDasharray: "none", strokeLinecap: "butt", strokeDashoffset: "0", strokeLinejoin: "miter", strokeMiterlimit: "4", fill: "rgb(189,193,202)", fillRule: "nonzero", opacity: "1" }} transform=" translate(-12, -3)" d="M 23 4 L 17 4 L 17 1 C 17 0.44799999999999995 16.552 0 16 0 L 8 0 C 7.448 0 7 0.448 7 1 L 7 4 L 1 4 C 0.44799999999999995 4 0 4.448 0 5 C 0 5.552 0.448 6 1 6 L 23 6 C 23.552 6 24 5.552 24 5 C 24 4.448 23.552 4 23 4 Z M 9 2 L 15 2 L 15 4 L 9 4 L 9 2 Z" strokeLinecap="round" />
        </g>
        <g transform="matrix(0.57 0 0 0.57 8 10.29)">
          <path style={{ stroke: "none", strokeWidth: "1", strokeDasharray: "none", strokeLinecap: "butt", strokeDashoffset: "0", strokeLinejoin: "miter", strokeMiterlimit: "4", fill: "rgb(189,193,202)", fillRule: "nonzero", opacity: "1" }} transform=" translate(-12, -16)" d="M 3 8 L 3 21 C 3 22.657 4.343 24 6 24 L 18 24 C 19.657 24 21 22.657 21 21 L 21 8 L 3 8 Z M 9 18 C 9 18.552 8.553 19 8 19 C 7.446999999999999 19 7 18.552 7 18 L 7 13 C 7 12.448 7.447 12 8 12 C 8.553 12 9 12.448 9 13 L 9 18 Z M 13 18 C 13 18.552 12.553 19 12 19 C 11.447 19 11 18.552 11 18 L 11 13 C 11 12.448 11.447 12 12 12 C 12.553 12 13 12.448 13 13 L 13 18 Z M 17 18 C 17 18.552 16.553 19 16 19 C 15.447 19 15 18.552 15 18 L 15 13 C 15 12.448 15.447 12 16 12 C 16.553 12 17 12.448 17 13 L 17 18 Z" strokeLinecap="round" />
        </g>
      </g>
    </g>
  </svg>
                </button>
              </div>

              {/* Task 2 - Completed */}
              <div className="flex items-center justify-between group">
                <div className="flex items-start gap-3">
                  <svg data-svg-id="SVG_24" className="w-[22px] h-[22px] text-[#E8618C] mt-0.5">
        <g transform="matrix(1 0 0 1 0 0)">
          <g style={{  }}>
            <g transform="matrix(0.79 0 0 0.79 11 11)">
              <path style={{ stroke: "none", strokeWidth: "1", strokeDasharray: "none", strokeLinecap: "butt", strokeDashoffset: "0", strokeLinejoin: "miter", strokeMiterlimit: "4", fill: "rgb(232,97,140)", fillRule: "nonzero", opacity: "1" }} transform=" translate(-12, -12)" d="M 7.793 20.293 L 1.207 13.707 C 0.8160000000000001 13.316 0.8160000000000001 12.683 1.207 12.293000000000001 L 2.793 10.707 C 3.184 10.316 3.817 10.316 4.207 10.707 L 8.5 15 L 19.793 3.707 C 20.183999999999997 3.316 20.817 3.316 21.207 3.707 L 22.793 5.293 C 23.183999999999997 5.684 23.183999999999997 6.317 22.793 6.707 L 9.206999999999999 20.293 C 8.815999999999999 20.683999999999997 8.183 20.683999999999997 7.792999999999999 20.293 Z" strokeLinecap="round" />
            </g>
          </g>
        </g>
      </svg>
                  <span className="text-sm lg:text-base font-medium leading-tight">
                    [월요일 시험] 기초학력고사 <br />!! 공부하기
                  </span>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg data-svg-id="SVG_25" className="w-4 h-4 text-[#bdc1ca] hover:text-red-400">
    <g transform="matrix(1 0 0 1 0 0)">
      <g style={{  }}>
        <g transform="matrix(0.57 0 0 0.57 8 2.86)">
          <path style={{ stroke: "none", strokeWidth: "1", strokeDasharray: "none", strokeLinecap: "butt", strokeDashoffset: "0", strokeLinejoin: "miter", strokeMiterlimit: "4", fill: "rgb(189,193,202)", fillRule: "nonzero", opacity: "1" }} transform=" translate(-12, -3)" d="M 23 4 L 17 4 L 17 1 C 17 0.44799999999999995 16.552 0 16 0 L 8 0 C 7.448 0 7 0.448 7 1 L 7 4 L 1 4 C 0.44799999999999995 4 0 4.448 0 5 C 0 5.552 0.448 6 1 6 L 23 6 C 23.552 6 24 5.552 24 5 C 24 4.448 23.552 4 23 4 Z M 9 2 L 15 2 L 15 4 L 9 4 L 9 2 Z" strokeLinecap="round" />
        </g>
        <g transform="matrix(0.57 0 0 0.57 8 10.29)">
          <path style={{ stroke: "none", strokeWidth: "1", strokeDasharray: "none", strokeLinecap: "butt", strokeDashoffset: "0", strokeLinejoin: "miter", strokeMiterlimit: "4", fill: "rgb(189,193,202)", fillRule: "nonzero", opacity: "1" }} transform=" translate(-12, -16)" d="M 3 8 L 3 21 C 3 22.657 4.343 24 6 24 L 18 24 C 19.657 24 21 22.657 21 21 L 21 8 L 3 8 Z M 9 18 C 9 18.552 8.553 19 8 19 C 7.446999999999999 19 7 18.552 7 18 L 7 13 C 7 12.448 7.447 12 8 12 C 8.553 12 9 12.448 9 13 L 9 18 Z M 13 18 C 13 18.552 12.553 19 12 19 C 11.447 19 11 18.552 11 18 L 11 13 C 11 12.448 11.447 12 12 12 C 12.553 12 13 12.448 13 13 L 13 18 Z M 17 18 C 17 18.552 16.553 19 16 19 C 15.447 19 15 18.552 15 18 L 15 13 C 15 12.448 15.447 12 16 12 C 16.553 12 17 12.448 17 13 L 17 18 Z" strokeLinecap="round" />
        </g>
      </g>
    </g>
  </svg>
                </button>
              </div>

              {/* Task 3 */}
              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <svg data-svg-id="SVG_26" className="w-[22px] h-[22px] text-[#bdc1ca]">
    <g transform="matrix(1 0 0 1 0 0)">
      <g style={{  }}>
        <g transform="matrix(0.79 0 0 0.79 11 11)">
          <circle style={{ stroke: "rgb(189,193,202)", strokeWidth: "2.4", strokeDasharray: "none", strokeLinecap: "square", strokeDashoffset: "0", strokeLinejoin: "miter", strokeMiterlimit: "10", fill: "none", fillRule: "nonzero", opacity: "1" }} cx="0" cy="0" r="10" />
        </g>
      </g>
    </g>
  </svg>
                  <span className="text-sm lg:text-base font-medium">학급 회장 나간다! 📌 준비물 : 공약</span>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg data-svg-id="SVG_27" className="w-4 h-4 text-[#bdc1ca] hover:text-red-400">
    <g transform="matrix(1 0 0 1 0 0)">
      <g style={{  }}>
        <g transform="matrix(0.57 0 0 0.57 8 2.86)">
          <path style={{ stroke: "none", strokeWidth: "1", strokeDasharray: "none", strokeLinecap: "butt", strokeDashoffset: "0", strokeLinejoin: "miter", strokeMiterlimit: "4", fill: "rgb(189,193,202)", fillRule: "nonzero", opacity: "1" }} transform=" translate(-12, -3)" d="M 23 4 L 17 4 L 17 1 C 17 0.44799999999999995 16.552 0 16 0 L 8 0 C 7.448 0 7 0.448 7 1 L 7 4 L 1 4 C 0.44799999999999995 4 0 4.448 0 5 C 0 5.552 0.448 6 1 6 L 23 6 C 23.552 6 24 5.552 24 5 C 24 4.448 23.552 4 23 4 Z M 9 2 L 15 2 L 15 4 L 9 4 L 9 2 Z" strokeLinecap="round" />
        </g>
        <g transform="matrix(0.57 0 0 0.57 8 10.29)">
          <path style={{ stroke: "none", strokeWidth: "1", strokeDasharray: "none", strokeLinecap: "butt", strokeDashoffset: "0", strokeLinejoin: "miter", strokeMiterlimit: "4", fill: "rgb(189,193,202)", fillRule: "nonzero", opacity: "1" }} transform=" translate(-12, -16)" d="M 3 8 L 3 21 C 3 22.657 4.343 24 6 24 L 18 24 C 19.657 24 21 22.657 21 21 L 21 8 L 3 8 Z M 9 18 C 9 18.552 8.553 19 8 19 C 7.446999999999999 19 7 18.552 7 18 L 7 13 C 7 12.448 7.447 12 8 12 C 8.553 12 9 12.448 9 13 L 9 18 Z M 13 18 C 13 18.552 12.553 19 12 19 C 11.447 19 11 18.552 11 18 L 11 13 C 11 12.448 11.447 12 12 12 C 12.553 12 13 12.448 13 13 L 13 18 Z M 17 18 C 17 18.552 16.553 19 16 19 C 15.447 19 15 18.552 15 18 L 15 13 C 15 12.448 15.447 12 16 12 C 16.553 12 17 12.448 17 13 L 17 18 Z" strokeLinecap="round" />
        </g>
      </g>
    </g>
  </svg>
                </button>
              </div>

              {/* Add Button */}
              <button className="flex justify-center items-center py-2 mt-2 border-t border-dashed border-[#dee1e6] hover:bg-gray-50 transition-colors rounded-b-lg">
                <svg data-svg-id="SVG_28" className="w-5 h-5 text-[#9095a1]">
    <g transform="matrix(1 0 0 1 0 0)">
      <g style={{  }}>
        <g transform="matrix(0.71 0 0 0.71 10 10)">
          <line style={{ stroke: "rgb(144,149,161)", strokeWidth: "2.4", strokeDasharray: "none", strokeLinecap: "square", strokeDashoffset: "0", strokeLinejoin: "miter", strokeMiterlimit: "10", fill: "none", fillRule: "nonzero", opacity: "1" }} x1="0" y1="-10" x2="0" y2="10" />
        </g>
        <g transform="matrix(0.71 0 0 0.71 10 10)">
          <line style={{ stroke: "rgb(144,149,161)", strokeWidth: "2.4", strokeDasharray: "none", strokeLinecap: "square", strokeDashoffset: "0", strokeLinejoin: "miter", strokeMiterlimit: "10", fill: "none", fillRule: "nonzero", opacity: "1" }} x1="10" y1="0" x2="-10" y2="0" />
        </g>
      </g>
    </g>
  </svg>
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* Mobile Bottom Navigation - Only on Mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#dee1e6] px-8 py-3 flex justify-between items-center z-50">
        <button className="flex flex-col items-center gap-1 text-[#9d7ee7]">
          <Icon icon="ri:home-fill" className="w-6 h-6" />
          <span className="text-[10px] font-bold">홈</span>
        </button>
        <button onClick={() => setScreen("timetable")} className="flex flex-col items-center gap-1 text-[#9095a1]">
          <Icon icon="ph:calendar-blank" className="w-6 h-6" />
          <span className="text-[10px]">시간표</span>
        </button>
        <button onClick={() => setScreen("books")} className="flex flex-col items-center gap-1 text-[#9095a1]">
          <Icon icon="ph:chart-line-up" className="w-6 h-6" />
          <span className="text-[10px]">진도표</span>
        </button>
        <button onClick={() => setScreen("quiz")} className="flex flex-col items-center gap-1 text-[#9095a1]">
          <Icon icon="ph:user" className="w-6 h-6" />
          <span className="text-[10px]">마이</span>
        </button>
      </nav>
      
      {/* Padding for mobile bottom nav */}
      <div className="lg:hidden h-20"></div>
    </div>
  );
}