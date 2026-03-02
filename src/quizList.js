// src/quizList.js

// 🌟 [핵심 해결책] Vite 전용 기능: data 폴더 안의 모든 .js 파일을 미리 스캔해서 준비합니다.
const modules = import.meta.glob('./data/**/*.js');

// 1️⃣ 파일명 앞글자(코드)를 실제 과목명으로 바꿔주는 사전
const subjectMap = {
  kor: "국어",
  soc: "사회",
  sci: "과학",
  math: "수학",
  eng: "영어"
};

// 2️⃣ 파일명(id) 하나만 던져주면 모든 속성을 뚝딱 만들어내는 공장 함수
const createQuizMeta = (id) => {
  const [subjCode, gradeNum, part] = id.split("_");

  const subject = subjectMap[subjCode] || "기타";
  const grade = `${gradeNum}학년`;
  const title = `${grade} ${subject} 어휘 ${part}`;

  // 스캔해둔 경로와 똑같이 모양을 맞춥니다.
  const targetPath = `./data/${subjCode}/${gradeNum}th/${id}.js`;

  return {
    id: id,
    title: title,
    subject: subject,
    grade: grade,
    // 🌟 미리 준비된 모듈 객체에서 정확한 로더 함수를 꺼내 연결합니다.
    loader: modules[targetPath] || (() => Promise.reject(new Error(`파일을 찾을 수 없습니다: ${targetPath}`)))
  };
};

// 3️⃣ 🌟 과목 및 학년별로 퀴즈 파일명을 세분화하여 관리한다.

// --- [국어] ---
const quiz_kor_4th = [
  "kor_4_1",
  "kor_4_2",
];
const quiz_kor_5th = [
  // "kor_5_1",
];
const quiz_kor_6th = [
  // "kor_6_1",
];

// --- [수학] ---
const quiz_math_4th = [
  // "math_4_1",
];
const quiz_math_5th = [
  // "math_5_1",
];
const quiz_math_6th = [
  // "math_6_1",
];

// --- [과학] ---
const quiz_sci_4th = [
  // "sci_4_1",
];
const quiz_sci_5th = [
  // "sci_5_1",
];
const quiz_sci_6th = [
  // "sci_6_1",
];

// --- [사회] ---
const quiz_soc_4th = [
  // "soc_4_1",
];
const quiz_soc_5th = [
  // "soc_5_1",
];
const quiz_soc_6th = [
  // "soc_6_1",
];

// --- [영어] ---
const quiz_eng_4th = [
  // "eng_4_1",
];

// 4️⃣ 흩어져 있는 과목/학년별 배열들을 하나로 싹 모은다.
const allQuizFiles = [
  ...quiz_kor_4th,
  ...quiz_kor_5th,
  ...quiz_kor_6th,
  ...quiz_math_4th,
  ...quiz_math_5th,
  ...quiz_math_6th,
  ...quiz_sci_4th,
  ...quiz_sci_5th,
  ...quiz_sci_6th,
  ...quiz_soc_4th,
  ...quiz_soc_5th,
  ...quiz_soc_6th,
  ...quiz_eng_4th
];

// 5️⃣ 합쳐진 배열을 돌면서 QUIZ_INDEX 배열을 자동 완성하여 내보낸다.
export const QUIZ_INDEX = allQuizFiles.map(createQuizMeta);