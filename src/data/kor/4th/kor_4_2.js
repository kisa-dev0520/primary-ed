export default [
  {
    id: 1,
    question: [
      { type: "text", content: "학교 앞 횡단보도에서 신호등이 고장 나 있어요. 지금 경찰 아저씨가 직접 나와서 차와 사람들의 통행을 조절하고 있어요." },
      { type: "break" },
      { type: "break" },
      { type: "text", content: "이처럼 " },
      { type: "bold", content: "일이 돌아가고 있는 형편이나 모습" },
      { type: "text", content: "을 뭐라고 할까요?" }
    ],
    options: ["상황", "사건", "문제", "장면"],
    correct: 0,
    meanings: [
      "일이 진행되어 가는 형편이나 모양",
      "이야기 속에서 일어나는 일",
      "해결이 필요한 어려운 상황이나 질문",
      "이야기나 영화 속의 한 장면"
    ],
    explanation: [
      { type: "highlight", content: "상황" },
      { type: "text", content: "은 지금 " },
      { type: "bold", content: "일이 돌아가고 있는 형편이나 모습" },
      { type: "text", content: "을 말해요. 이 예문에서는 신호등이 고장 나서 경찰이 교통을 정리하고 있는 형편을 나타내므로 상황이에요. " },
      { type: "bold", content: "사건" },
      { type: "text", content: "은 이야기 속에서 벌어지는 일을 뜻하고, " },
      { type: "bold", content: "문제" },
      { type: "text", content: "는 해결해야 할 어려움을 뜻하는 것이지 지금의 형편을 나타내는 말은 아니에요." }
    ]
  },
  {
    id: 2,
    question: [
      { type: "text", content: "민수는 과학 시간에 현미경 사용법을 직접 해 보면서 배웠어요. 선생님이 " },
      { type: "highlight", content: "\"직접 해 봐야 오래 기억에 남는단다\"" },
      { type: "text", content: "라고 말씀하셨어요." },
      { type: "break" },
      { type: "break" },
      { type: "text", content: "이처럼 " },
      { type: "bold", content: "자기가 실제로 해 보거나 겪어 본 일" },
      { type: "text", content: "을 뭐라고 할까요?" }
    ],
    options: ["노력", "경험", "과정", "감상"],
    correct: 1,
    meanings: [
      "목적을 이루기 위하여 몸과 마음을 다해 애씀",
      "자신이 실제로 해 보거나 겪어 본 일",
      "일이 되어 가는 경로 또는 단계",
      "예술 작품을 보고 느끼거나 생각함"
    ],
    explanation: [
      { type: "highlight", content: "경험" },
      { type: "text", content: "은 " },
      { type: "bold", content: "자기가 실제로 해 보거나 겪어 본 일" },
      { type: "text", content: "을 말해요. 이 예문에서는 민수가 현미경 사용법을 직접 해 보면서 배웠으므로 경험이에요. " },
      { type: "bold", content: "노력" },
      { type: "text", content: "은 목표를 이루기 위해 힘을 쓰는 것이지 직접 해 본 일 자체를 가리키는 말은 아니에요." }
    ]
  },
  {
    id: 3,
    question: [
      { type: "text", content: "은지는 친구에게 편지를 쓰면서 " },
      { type: "highlight", content: "\"요즘 잘 지내고 있니? 감기 조심해!\"" },
      { type: "text", content: "라고 적었어요." },
      { type: "break" },
      { type: "break" },
      { type: "text", content: "이처럼 " },
      { type: "bold", content: "상대방이 잘 지내고 있는지 묻는 인사" },
      { type: "text", content: "를 뭐라고 할까요?" }
    ],
    options: ["위로", "공감", "안부", "배려"],
    correct: 2,
    meanings: [
      "따뜻한 말이나 행동으로 괴로움을 달래 줌",
      "남의 주장이나 기분에 자기도 그렇다고 느낌",
      "어떤 사람이 잘 지내고 있는지 묻는 인사",
      "도와주거나 보살펴 주려고 마음을 써 줌"
    ],
    explanation: [
      { type: "highlight", content: "안부" },
      { type: "text", content: "는 " },
      { type: "bold", content: "상대방이 잘 지내고 있는지 묻는 인사" },
      { type: "text", content: "를 말해요. 이 예문에서는 \"요즘 잘 지내고 있니?\"라고 물었으므로 안부예요. " },
      { type: "bold", content: "위로" },
      { type: "text", content: "도 따뜻한 말이지만, 위로는 힘들거나 괴로운 사람의 마음을 달래 주는 것이라는 점이 달라요." }
    ]
  },
  {
    id: 4,
    question: [
      { type: "text", content: "지훈이는 독서 감상문을 쓰기 전에, 책에서 가장 중요한 내용만 짧게 간추려 메모했어요." },
      { type: "break" },
      { type: "break" },
      { type: "text", content: "이처럼 " },
      { type: "bold", content: "말이나 글의 핵심 내용을 짧게 간추리는 것" },
      { type: "text", content: "을 뭐라고 할까요?" }
    ],
    options: ["검토", "요약", "낭독", "제시"],
    correct: 1,
    meanings: [
      "어떤 일을 결정하기 전에 내용을 자세히 따지고 조사함",
      "말이나 글의 핵심 내용을 짧게 간추림",
      "글을 소리 내어 읽음",
      "의견이나 내용을 드러내어 보여 줌"
    ],
    explanation: [
      { type: "highlight", content: "요약" },
      { type: "text", content: "은 " },
      { type: "bold", content: "말이나 글의 핵심 내용을 짧게 간추리는 것" },
      { type: "text", content: "을 말해요. 이 예문에서는 책의 중요한 내용만 골라 짧게 메모했으므로 요약이에요. " },
      { type: "bold", content: "검토" },
      { type: "text", content: "도 내용을 살피는 것이지만, 검토는 결정하기 전에 자세히 따지고 조사하는 것이라는 점이 달라요." }
    ]
  },
  {
    id: 5,
    question: [
      { type: "text", content: "수업 시간에 선생님이 발표하는 친구의 이야기를 고개를 끄덕이며 끝까지 집중해서 들었어요." },
      { type: "break" },
      { type: "break" },
      { type: "text", content: "이처럼 " },
      { type: "bold", content: "상대방의 말에 귀를 기울여 정성껏 듣는 것" },
      { type: "text", content: "을 뭐라고 할까요?" }
    ],
    options: ["경청", "공손", "대화", "전달"],
    correct: 0,
    meanings: [
      "상대방의 말을 귀를 기울여 정성껏 들음",
      "말이나 행동이 예의 바르고 겸손함",
      "마주 대하여 말을 주고받음",
      "말이나 물건을 다른 사람에게 전해 줌"
    ],
    explanation: [
      { type: "highlight", content: "경청" },
      { type: "text", content: "은 " },
      { type: "bold", content: "상대방의 말에 귀를 기울여 정성껏 듣는 것" },
      { type: "text", content: "을 말해요. 이 예문에서는 친구의 발표를 고개를 끄덕이며 끝까지 집중해서 들었으므로 경청이에요. " },
      { type: "bold", content: "대화" },
      { type: "text", content: "도 말과 관련된 것이지만, 대화는 서로 말을 주고받는 것이지 한쪽이 집중해서 듣는 것은 아니에요." }
    ]
  },
  {
    id: 6,
    question: [
      { type: "text", content: "미술관에서 유명한 화가의 그림을 보면서 " },
      { type: "highlight", content: "\"이 그림은 색깔이 참 따뜻하고 편안한 느낌이야\"" },
      { type: "text", content: "라고 생각했어요." },
      { type: "break" },
      { type: "break" },
      { type: "text", content: "이처럼 " },
      { type: "bold", content: "예술 작품을 보고 느끼거나 생각하는 것" },
      { type: "text", content: "을 뭐라고 할까요?" }
    ],
    options: ["감동", "인상", "감상", "판단"],
    correct: 2,
    meanings: [
      "아름다운 글이나 행동을 보고 마음이 깊게 움직임",
      "어떤 것을 보고 마음속에 남은 느낌",
      "예술 작품을 보고 느끼거나 생각함",
      "사물을 보고 옳고 그름을 생각하여 결정함"
    ],
    explanation: [
      { type: "highlight", content: "감상" },
      { type: "text", content: "은 " },
      { type: "bold", content: "예술 작품을 보고 느끼거나 생각하는 것" },
      { type: "text", content: "을 말해요. 이 예문에서는 화가의 그림을 보면서 따뜻하고 편안하다고 느꼈으므로 감상이에요. " },
      { type: "bold", content: "감동" },
      { type: "text", content: "도 마음이 움직이는 것이지만, 감동은 아름다운 것을 보고 마음이 깊게 움직이는 것이고, 감상은 작품을 보며 여러 생각이나 느낌을 갖는 것이라는 점이 달라요." }
    ]
  },
  {
    id: 7,
    question: [
      { type: "text", content: "동생이 시험에서 나쁜 점수를 받아 울고 있었어요. 언니가 " },
      { type: "highlight", content: "\"괜찮아, 다음에 더 잘할 수 있어\"" },
      { type: "text", content: "라고 말하며 등을 토닥여 주었어요." },
      { type: "break" },
      { type: "break" },
      { type: "text", content: "이처럼 " },
      { type: "bold", content: "따뜻한 말이나 행동으로 괴로움을 달래 주는 것" },
      { type: "text", content: "을 뭐라고 할까요?" }
    ],
    options: ["배려", "위로", "공감", "경청"],
    correct: 1,
    meanings: [
      "도와주거나 보살펴 주려고 마음을 써 줌",
      "따뜻한 말이나 행동으로 괴로움을 달래 줌",
      "남의 주장이나 기분에 자기도 그렇다고 느낌",
      "상대방의 말을 귀를 기울여 정성껏 들음"
    ],
    explanation: [
      { type: "highlight", content: "위로" },
      { type: "text", content: "는 " },
      { type: "bold", content: "따뜻한 말이나 행동으로 괴로움을 달래 주는 것" },
      { type: "text", content: "을 말해요. 이 예문에서는 시험을 못 봐서 울고 있는 동생에게 \"괜찮아\"라며 등을 토닥여 주었으므로 위로예요. " },
      { type: "bold", content: "배려" },
      { type: "text", content: "도 상대를 생각해 주는 것이지만, 배려는 도와주거나 보살펴 주려고 미리 마음을 쓰는 것이라는 점이 달라요." }
    ]
  },
  {
    id: 8,
    question: [
      { type: "text", content: "준호는 발표를 할 때 " },
      { type: "highlight", content: "\"~인 것 같아요\"" },
      { type: "text", content: "라고 자신 없이 말하는 버릇이 있었어요. 선생님이 " },
      { type: "highlight", content: "\"자신감 있게 또박또박 말하는 자세가 중요해\"" },
      { type: "text", content: "라고 조언해 주셨어요." },
      { type: "break" },
      { type: "break" },
      { type: "text", content: "이처럼 " },
      { type: "bold", content: "어떤 일이나 사람을 대하는 마음가짐이나 몸가짐" },
      { type: "text", content: "을 뭐라고 할까요?" }
    ],
    options: ["성격", "형식", "태도", "예절"],
    correct: 2,
    meanings: [
      "개인이 가지고 있는 고유한 성질이나 품성",
      "겉으로 나타나는 모양이나 일정한 틀",
      "어떤 일이나 사람을 대하는 마음가짐이나 몸가짐",
      "사람 사이에 지켜야 할 바른 도리나 말투"
    ],
    explanation: [
      { type: "highlight", content: "태도" },
      { type: "text", content: "는 " },
      { type: "bold", content: "어떤 일이나 사람을 대하는 마음가짐이나 몸가짐" },
      { type: "text", content: "을 말해요. 이 예문에서는 발표할 때 자신 없이 말하는 자세를 고치라는 조언이므로 태도예요. " },
      { type: "bold", content: "예절" },
      { type: "text", content: "도 바른 자세와 관련이 있지만, 예절은 인사를 잘 하거나 어른께 존댓말을 쓰는 것처럼 사람 사이에 지켜야 할 바른 도리를 뜻해요." }
    ]
  },
  {
    id: 9,
    question: [
      { type: "text", content: "하은이는 사회 수업에서 " },
      { type: "highlight", content: "\"세종대왕은 백성을 사랑하여 한글을 만드셨습니다\"" },
      { type: "text", content: "라는 내용을 읽으며 세종대왕이 이루어 놓은 큰 성과에 감탄했어요." },
      { type: "break" },
      { type: "break" },
      { type: "text", content: "이처럼 " },
      { type: "bold", content: "정성을 다하여 이룩한 큰 성과나 공적" },
      { type: "text", content: "을 뭐라고 할까요?" }
    ],
    options: ["동기", "노력", "업적", "가치관"],
    correct: 2,
    meanings: [
      "어떤 일이나 행동을 하게 된 직접적인 원인이나 계기",
      "목적을 이루기 위하여 몸과 마음을 다해 애씀",
      "정성을 다하여 이룩한 큰 성과나 공적",
      "어떤 것이 옳고 소중한지 판단하는 바탕이 되는 생각"
    ],
    explanation: [
      { type: "highlight", content: "업적" },
      { type: "text", content: "은 " },
      { type: "bold", content: "정성을 다하여 이룩한 큰 성과나 공적" },
      { type: "text", content: "을 말해요. 이 예문에서는 세종대왕이 백성을 위해 한글을 만든 큰 성과에 감탄했으므로 업적이에요. " },
      { type: "bold", content: "가치관" },
      { type: "text", content: "은 무엇이 옳고 소중한지 판단하는 바탕이 되는 생각이지, 이루어 낸 성과를 가리키는 말은 아니에요." }
    ]
  },
  {
    id: 10,
    question: [
      { type: "text", content: "친구가 강아지를 잃어버려서 울고 있었어요. 서연이도 예전에 키우던 햄스터가 죽었던 기억이 떠올라 가슴이 뭉클해졌어요." },
      { type: "break" },
      { type: "break" },
      { type: "text", content: "이처럼 " },
      { type: "bold", content: "남의 기분에 대해 자기도 그렇다고 느끼는 것" },
      { type: "text", content: "을 뭐라고 할까요?" }
    ],
    options: ["이해", "공감", "고려", "신중"],
    correct: 1,
    meanings: [
      "사리의 뜻을 깨달아 앎",
      "남의 주장이나 기분에 자기도 그렇다고 느낌",
      "어떤 일을 결정할 때 여러 상황을 충분히 생각함",
      "말이나 행동이 가볍지 않고 매우 조심스러움"
    ],
    explanation: [
      { type: "highlight", content: "공감" },
      { type: "text", content: "은 " },
      { type: "bold", content: "남의 기분에 대해 자기도 그렇다고 느끼는 것" },
      { type: "text", content: "을 말해요. 이 예문에서는 친구의 슬픔을 보고 자신도 비슷한 기억이 떠오르며 함께 슬퍼졌으므로 공감이에요. " },
      { type: "bold", content: "이해" },
      { type: "text", content: "도 상대의 마음을 알아주는 것이지만, 이해는 뜻이나 사정을 깨달아 아는 것이고, 공감은 상대의 감정을 함께 느끼는 것이라는 점이 달라요." }
    ]
  }
];