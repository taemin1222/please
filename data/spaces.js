/**
 * [ONCE, ONE'S BY JOSUN HOTEL]
 * 공간(Spaces) 데이터셋 (No-DB 정적 데이터)
 * 트랙:
 *  - trackA: Complete Privacy (나만의 완벽한 고립 휴식, 인룸 다이닝)
 *  - trackB: Soft Connection (취향 기반의 느슨한 소셜 살롱, 와인 라운지)
 */

const SPACE_DATA = [
  {
    id: "sp-01",
    name: "아틀리에 스위트",
    hotel: "레스케이프 호텔",
    track: "trackA",
    trackName: "Track A: Complete Privacy",
    theme: "19세기 파리지앵 부티크 스위트",
    tagline: "눈치 볼 필요 없이 완벽하게 누리는 나만의 은신처",
    capacity: "1인 전용 (최대 1인)",
    bedType: "시몬스 뷰티레스트 프리미엄 킹",
    size: "52㎡",
    pricePerNight: 420000,
    rating: 4.9,
    reviewsCount: 128,
    image: "02.png", // 폴더 내 에셋
    gallery: [
      "02.png",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80"
    ],
    features: [
      "객실 내 프라이빗 디너 트롤리 서비스",
      "하이파이 LP 사운드 시스템 & 턴테이블",
      "딥 릴랙싱 독립 욕조 & 전용 배스 솔트",
      "시크릿 턴다운 & 나이트 티 어메니티"
    ],
    description: "화려한 프렌치 벨벳 인테리어와 클래식한 브라스 가구가 어우러진 공간. 외부와의 소음을 차단하고 온전히 자신만의 사유에 몰입할 수 있도록 설계된 1인 럭셔리의 정점입니다."
  },
  {
    id: "sp-02",
    name: "마크 다모르 와인 살롱",
    hotel: "레스케이프 호텔 26층",
    track: "trackB",
    trackName: "Track B: Soft Connection",
    theme: "스타라이트 스카이 살롱",
    tagline: "어색한 대화 없는 취향 기반의 고품격 소셜 공간",
    capacity: "1인 투숙객 전용 라운지 바",
    bedType: "독립형 1인 벨벳 라운지 체어",
    size: "스카이라운지 전체",
    pricePerNight: 0, // 살롱 공간
    rating: 4.85,
    reviewsCount: 95,
    image: "01.png", // 폴더 내 에셋
    gallery: [
      "01.png",
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1000&q=80"
    ],
    features: [
      "웰컴 샴페인 글라스 프리패스",
      "소믈리에 1:1 테이스팅 노트 제공",
      "독립형 1인 전용 벨벳 체어 배치",
      "Lo-Fi 재즈 라이브 세션 감상"
    ],
    description: "타인의 시선에서 자유로운 독립 좌석 배치와 은은한 무드 조명 속에서, 프리미엄 와인과 함께 자연스러운 영감을 교류하는 세련된 취향 공동체 공간입니다."
  },
  {
    id: "sp-03",
    name: "웨스틴 헤리티지 이그제큐티브 스위트",
    hotel: "웨스틴 조선 서울",
    track: "trackA",
    trackName: "Track A: Complete Privacy",
    theme: "환구단 전망의 클래식 럭셔리",
    tagline: "100년 역사의 품격으로 완성되는 가장 극진한 환대",
    capacity: "1인 전용 (최대 1인)",
    bedType: "웨스틴 헤븐리 베드 킹",
    size: "60㎡",
    pricePerNight: 480000,
    rating: 4.95,
    reviewsCount: 210,
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=80"
    ],
    features: [
      "환구단 사적지 프라이빗 뷰",
      "웨스틴 클럽 1인 전용 콰이어트 좌석",
      "조선델리 웰컴 고메 바스켓 증정",
      "다이슨 슈퍼소닉 & 네스프레소 버츄오 머신"
    ],
    description: "유서 깊은 환구단을 내려다보며 구름 위의 휴식을 선사하는 헤븐리 베드와 함께, 번잡한 일상을 벗어나 완벽한 웰빙 리셋을 경험할 수 있는 공간입니다."
  },
  {
    id: "sp-04",
    name: "살롱 드 환구 (소셜 티 & 와인 라운지)",
    hotel: "웨스틴 조선 서울 1층",
    track: "trackB",
    trackName: "Track B: Soft Connection",
    theme: "한국적 정취와 모던 살롱의 조화",
    tagline: "낮에는 티 마스터의 오마카세, 밤에는 내추럴 와인 살롱",
    capacity: "1인 웰컴 살롱 라운지",
    bedType: "오토만 1인 소파 & 서가 좌석",
    size: "환구단 조망 전용 구역",
    pricePerNight: 0,
    rating: 4.8,
    reviewsCount: 140,
    image: "03.png", // 폴더 내 에셋
    gallery: [
      "03.png",
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80"
    ],
    features: [
      "시그니처 애프터눈 티 페어링 세트",
      "월간 북 큐레이션 서가 열람",
      "뱅앤올룹슨 노이즈캔슬링 헤드폰 대여",
      "부담 없는 취향 교류 북클럽 운영"
    ],
    description: "사계절의 정취를 품은 환구단을 배경으로 잔잔한 음악과 함께 독서와 티, 와인을 자유롭게 음미하는 1인 친화형 문화 살롱입니다."
  },
  {
    id: "sp-05",
    name: "그랜드 오션 웰니스 스위트",
    hotel: "그랜드 조선 부산",
    track: "trackA",
    trackName: "Track A: Complete Privacy",
    theme: "해운대 오션뷰 마인드풀니스",
    tagline: "파도 소리만을 룸메이트 삼는 온전한 치유의 시간",
    capacity: "1인 전용 (최대 1인)",
    bedType: "그랜드 프리미엄 킹",
    size: "58㎡",
    pricePerNight: 450000,
    rating: 4.9,
    reviewsCount: 88,
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80"
    ],
    features: [
      "전면 통유리 해운대 파노라마 오션뷰",
      "인룸 싱잉볼 & 명상 아로마 키트",
      "사우나 & 인피니티 풀 1인 무제한 이용권",
      "유기농 콜드프레스 웰컴 주스"
    ],
    description: "해운대의 푸른 파도를 오롯이 마주하며 내면의 소리에 귀 기울이는 웰니스 특화 1인 스위트룸입니다."
  },
  {
    id: "sp-06",
    name: "비블리오테크 라운지 & 바",
    hotel: "그랜드 조선 부산 4층",
    track: "trackB",
    trackName: "Track B: Soft Connection",
    theme: "바다를 품은 아티잔 라이브러리",
    tagline: "예술 서적과 시그니처 몰트 위스키의 만남",
    capacity: "1인 라운지 체어",
    bedType: "-",
    size: "라이브러리 살롱",
    pricePerNight: 0,
    rating: 4.75,
    reviewsCount: 65,
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1000&q=80"
    ],
    features: [
      "글로벌 아트북 & 매거진 큐레이션",
      "싱글몰트 위스키 3종 플라이트",
      "바다를 향한 독립형 리클라이너 좌석",
      "심야 사일런트 리딩 세션"
    ],
    description: "잔잔한 파도 소리를 배경으로 엄선된 예술 서적을 읽으며 소믈리에의 위스키 테이스팅을 경험하는 품격 있는 공간입니다."
  }
];
