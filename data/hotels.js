/**
 * [ONCE, ONE'S BY JOSUN HOTEL]
 * 호텔 지점 데이터 및 사진 갤러리 컬렉션
 */

const HOTEL_LOCATIONS = [
  {
    id: "hotel-lescape",
    name: "레스케이프 호텔 (L'Escape Hotel)",
    brand: "조선호텔앤리조트",
    tagline: "19세기 파리지앵 부티크 & 벨벳 럭셔리",
    track: "Track A & Track B",
    address: "서울특별시 중구 퇴계로 67 (회현동1가)",
    subway: "4호선 회현역 7번 출구 연결",
    phone: "02-317-4000",
    lat: 37.5583,
    lng: 126.9782,
    zoom: 16,
    image: "01.png",
    featuredSpaces: ["아틀리에 스위트 (Track A)", "마크 다모르 26층 와인 살롱 (Track B)", "팔레드신 고메"],
    description: "프랑스 벨에포크 시대의 화려함과 은밀한 낭만을 재현한 부티크 호텔로, 1인 투숙객에게 완벽한 프라이빗 휴식과 고품격 와인 살롱을 선사합니다."
  },
  {
    id: "hotel-westin",
    name: "웨스틴 조선 서울 (The Westin Josun Seoul)",
    brand: "조선호텔앤리조트",
    tagline: "100년 헤리티지와 환구단 뷰의 클래식 럭셔리",
    track: "Track A & Track B",
    address: "서울특별시 중구 소공로 106 (소공동)",
    subway: "1·2호선 시청역 6번 출구 도보 5분 / 2호선 을지로입구역 8번 출구",
    phone: "02-771-0500",
    lat: 37.5645,
    lng: 126.9803,
    zoom: 16,
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80",
    featuredSpaces: ["웨스틴 헤리티지 스위트 (Track A)", "살롱 드 환구 (Track B)", "조선델리 더 부티크"],
    description: "대한민국 특급호텔의 효시이자 환구단의 고즈넉한 역사를 품은 럭셔리 호텔. 1인을 위한 최상급 턴다운 서비스와 헤븐리 베드가 준비되어 있습니다."
  },
  {
    id: "hotel-grand-busan",
    name: "그랜드 조선 부산 (Grand Josun Busan)",
    brand: "조선호텔앤리조트",
    tagline: "해운대 오션 파노라마 & 마인드풀 웰니스",
    track: "Track A & Track B",
    address: "부산광역시 해운대구 해운대해변로 292 (중동)",
    subway: "2호선 해운대역 3·5번 출구 도보 8분",
    phone: "051-922-5000",
    lat: 35.1598,
    lng: 129.1627,
    zoom: 16,
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80",
    featuredSpaces: ["그랜드 오션 웰니스 스위트 (Track A)", "비블리오테크 바 (Track B)", "인피니티 오션 풀"],
    description: "탁 트인 해운대 바다를 프라이빗하게 조망하며 온전한 재충전과 마인드풀니스를 누리는 1인 웰니스 호캉스의 명소입니다."
  }
];

const HOTEL_GALLERY = [
  {
    id: "gal-01",
    title: "1인 전용 웰컴 라운지 바",
    hotel: "레스케이프 호텔 26층",
    category: "salon",
    categoryName: "소셜 살롱",
    image: "01.png",
    caption: "에메랄드 벨벳 조명 아래 샴페인을 즐기는 Track B 소셜 와인 살롱"
  },
  {
    id: "gal-02",
    title: "아틀리에 스위트 인룸 다이닝",
    hotel: "레스케이프 호텔",
    category: "room",
    categoryName: "스위트 객실",
    image: "02.png",
    caption: "골드 트롤리로 정갈하게 서빙되는 Track A 1인 프라이빗 고메 테이스팅 디너"
  },
  {
    id: "gal-03",
    title: "살롱 드 환구 티 & 와인",
    hotel: "웨스틴 조선 서울",
    category: "salon",
    categoryName: "소셜 살롱",
    image: "03.png",
    caption: "사계절 환구단 정취를 감상하며 라이브 재즈와 함께 즐기는 프라이빗 살롱"
  },
  {
    id: "gal-04",
    title: "한정판 브라운 레더 키홀더",
    hotel: "조선호텔 공식 굿즈",
    category: "amenity",
    categoryName: "어메니티 & 굿즈",
    image: "04.png",
    caption: "조선호텔 엠블럼 24K 금박 각인 최상급 이탈리안 베지터블 레더 웰컴 키트"
  },
  {
    id: "gal-05",
    title: "웨스틴 헤리티지 이그제큐티브 스위트",
    hotel: "웨스틴 조선 서울",
    category: "room",
    categoryName: "스위트 객실",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80",
    caption: "최상의 수면을 선사하는 시그니처 헤븐리 베드와 환구단 뷰"
  },
  {
    id: "gal-06",
    title: "해운대 오션 파노라마 웰니스",
    hotel: "그랜드 조선 부산",
    category: "room",
    categoryName: "스위트 객실",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80",
    caption: "파도 소리만을 룸메이트 삼는 오션뷰 마인드풀니스 스위트"
  },
  {
    id: "gal-07",
    title: "마크 다모르 시그니처 칵테일",
    hotel: "레스케이프 호텔",
    category: "dining",
    categoryName: "다이닝 & 바",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1000&q=80",
    caption: "월드클래스 믹솔로지스트가 선보이는 독창적인 1인 페어링 칵테일"
  },
  {
    id: "gal-08",
    title: "조선델리 시그니처 아티잔 디저트",
    hotel: "웨스틴 조선 서울",
    category: "dining",
    categoryName: "다이닝 & 바",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80",
    caption: "100년 전통 파티시에의 샤인머스캣 케이크와 웰컴 구움과자"
  },
  {
    id: "gal-09",
    title: "아틀리에 스위트 딥 릴랙싱 욕조",
    hotel: "레스케이프 호텔",
    category: "amenity",
    categoryName: "어메니티 & 굿즈",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80",
    caption: "하루의 피로를 말끔히 씻어내는 프렌치 클래식 독립형 욕조와 아로마 배스 솔트"
  }
];
