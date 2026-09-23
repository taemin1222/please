/**
 * AI 1인 취향 큐레이터 퀴즈 서비스 모듈
 */
class QuizService {
  constructor() {
    this.currentStep = 0;
    this.scores = { trackA: 0, trackB: 0 };
    this.questions = [
      {
        question: "오늘 나의 에너지와 피로도 상태는 어떤가요?",
        options: [
          {
            track: "trackA",
            title: "사람 마주칠 힘도 없어요, 완벽한 사적 고립이 필요해요",
            sub: "타인의 시선에서 100% 벗어나 나만의 안전지대에서 쉬고 싶습니다."
          },
          {
            track: "trackB",
            title: "지친 일상에 잔잔한 영감과 세련된 분위기 전환이 필요해요",
            sub: "어색한 친목은 싫지만, 좋은 음악과 와인이 있는 공간에서 환기하고 싶습니다."
          }
        ]
      },
      {
        question: "내가 꿈꾸는 호텔에서의 완벽한 저녁 시간은?",
        options: [
          {
            track: "trackA",
            title: "실크 가운을 입고 침대 위에서 즐기는 풀코스 인룸 다이닝",
            sub: "골드 트롤리로 배달되는 셰프의 고메 요리와 하프 샴페인 한 잔."
          },
          {
            track: "trackB",
            title: "스카이라운지 바에서 은은한 조명 아래 즐기는 와인 한 잔",
            sub: "소믈리에의 1:1 테이스팅 노트와 함께 잔잔한 Lo-Fi 재즈를 감상하는 밤."
          }
        ]
      },
      {
        question: "이번 1인 호캉스를 통해 가장 얻고 싶은 것은?",
        options: [
          {
            track: "trackA",
            title: "누구의 방해도 받지 않는 깊은 사색과 완벽한 숙면",
            sub: "시크릿 턴다운과 최고급 베딩에서 누리는 완전한 자아 회복."
          },
          {
            track: "trackB",
            title: "독립적이면서도 세련된 1인 소셜 라이프의 경험",
            sub: "각자의 취향을 존중하는 느슨한 연대 속에서 느끼는 지적인 해방감."
          }
        ]
      }
    ];
  }

  reset() {
    this.currentStep = 0;
    this.scores = { trackA: 0, trackB: 0 };
  }

  selectOption(track) {
    if (track === 'trackA') this.scores.trackA++;
    if (track === 'trackB') this.scores.trackB++;
    this.currentStep++;
  }

  isFinished() {
    return this.currentStep >= this.questions.length;
  }

  getResult() {
    if (this.scores.trackA >= this.scores.trackB) {
      return {
        track: "trackA",
        title: "Track A: Complete Privacy (완벽한 사적 럭셔리)",
        badge: "당신을 위한 큐레이션: 온전한 사유형",
        tagline: "눈치 볼 필요 없이 완벽하게 대접받는 1인 럭셔리 케어",
        spaceId: "sp-01",
        productId: "pkg-01",
        spaceName: "아틀리에 스위트 (레스케이프)",
        productName: "ONCE Solo Track A 풀코스 럭셔리 패키지",
        image: "02.png",
        summary: "외부와의 접촉을 차단하고 스위트 객실 내 프라이빗 디너와 샴페인을 오롯이 누리는 최상의 코스를 추천합니다."
      };
    } else {
      return {
        track: "trackB",
        title: "Track B: Soft Connection (세련된 취향의 연대)",
        badge: "당신을 위한 큐레이션: 감각적 영감형",
        tagline: "어색한 대화 없는 고품격 1인 소셜 라이프",
        spaceId: "sp-02",
        productId: "pkg-02",
        spaceName: "마크 다모르 와인 살롱 (레스케이프 26층)",
        productName: "ONCE Solo Track B 취향 살롱 네트워킹 패키지",
        image: "03.png",
        summary: "독립된 1인 좌석에서 서울 야경을 감상하며 소믈리에의 와인 셀렉션과 Lo-Fi 라이브를 만끽하는 코스를 추천합니다."
      };
    }
  }
}
