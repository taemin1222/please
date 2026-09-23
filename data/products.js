/**
 * [ONCE, ONE'S BY JOSUN HOTEL]
 * 상품 & 패키지(Products) 데이터셋 (No-DB 정적 데이터)
 * 카테고리:
 *  - package: 1인 전용 올인원 호캉스 패키지
 *  - gourmet: 인룸 파인다이닝 & 식음/와인 페어링
 *  - goods: 한정판 브랜드 굿즈 & 라이프스타일
 */

const PRODUCT_DATA = [
  // ── [1. 1인 전용 올인원 호캉스 패키지] ──
  {
    id: "pkg-01",
    category: "package",
    categoryName: "1인 스테이 패키지",
    track: "trackA",
    name: "ONCE Solo Track A 풀코스 럭셔리 패키지",
    badge: "BEST CHOICE",
    price: 490000,
    originalPrice: 620000,
    discountRate: "21%",
    image: "02.png", // 폴더 내 에셋
    summary: "스위트 객실 1박 + 인룸 고메 4코스 디너 + 하프 샴페인 + 한정판 레더 키홀더",
    benefits: [
      "아틀리에 스위트 or 헤리티지 스위트 1박",
      "객실 내 1인 파인다이닝 디너 코스 서빙 (골드 트롤리)",
      "루이 로드레 하프 보틀 샴페인 1병 & 캐비어 카나페",
      "조선호텔 금박 각인 브라운 레더 키홀더 증정",
      "레이트 체크아웃 (14:00까지 무료 연장)"
    ],
    details: "오직 혼자만의 온전한 휴식을 위해 설계된 시그니처 패키지입니다. 외부 접촉을 최소화하고 객실 안에서 5성급 셰프의 고메 코스와 프리미엄 샴페인을 프라이빗하게 즐기실 수 있습니다."
  },
  {
    id: "pkg-02",
    category: "package",
    categoryName: "1인 스테이 패키지",
    track: "trackB",
    name: "ONCE Solo Track B 취향 살롱 네트워킹 패키지",
    badge: "MD PICK",
    price: 450000,
    originalPrice: 550000,
    discountRate: "18%",
    image: "03.png", // 폴더 내 에셋
    summary: "스위트 객실 1박 + 마크 다모르 와인 살롱 프리패스 + 테이스팅 노트 + 웰컴 기프트",
    benefits: [
      "디럭스 스위트 객실 1박",
      "26층 마크 다모르 1인 와인 살롱 올데이 프리패스",
      "소믈리에 3종 와인 테이스팅 & 아티잔 치즈 플래터",
      "JOSUN ONE'S 1인 취향 살롱 커뮤니티 초대권",
      "조선델리 시그니처 구움과자 웰컴 박스"
    ],
    details: "독립된 혼자만의 시간과 함께 세련된 취향의 교류를 원하는 분을 위한 패키지입니다. 부담 없는 느슨한 소셜 살롱에서 영감을 얻어보세요."
  },

  // ── [2. 인룸 고메 & 식음/와인 페어링] ──
  {
    id: "food-01",
    category: "gourmet",
    categoryName: "고메 & 룸서비스",
    track: "trackA",
    name: "팔레드신 1인 시그니처 고메 테이스팅 세트",
    badge: "MICHELIN",
    price: 135000,
    originalPrice: 160000,
    discountRate: "15%",
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80",
    summary: "미쉐린 가이드 팔레드신의 바삭한 북경오리와 수제 딤섬 4종 1인 맞춤 페어링",
    benefits: [
      "시그니처 바삭한 북경오리 롤 (1인 서빙)",
      "수제 딤섬 4종 (트러플 쇼마이, 샤오롱바오 등)",
      "소흥주 마리네이드 특선 냉채",
      "프리미엄 10년 숙성 보이차 팟 서빙"
    ],
    details: "객실 내 골드 트롤리로 정갈하게 서비스되는 1인 전용 중식 미식 코스입니다."
  },
  {
    id: "food-02",
    category: "gourmet",
    categoryName: "고메 & 룸서비스",
    track: "trackB",
    name: "살롱 나이트 와인 & 샤퀴테리 셀렉션",
    badge: "POPULAR",
    price: 85000,
    originalPrice: 105000,
    discountRate: "19%",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80",
    summary: "조선호텔 헤리티지 하프 보틀 와인 1병 & 최고급 이베리코 하몽 플래터",
    benefits: [
      "소믈리에 셀렉트 하프 보틀 와인 (레드 or 화이트 택1)",
      "스페인 이베리코 베요타 하몽 & 3종 아티잔 치즈",
      "수제 그리시니 & 트러플 올리브 마리네이드"
    ],
    details: "깊어가는 밤, 객실이나 살롱에서 잔을 기울이며 즐기기 좋은 완벽한 1인 와인 페어링입니다."
  },

  // ── [3. 한정판 브랜드 굿즈 & 라이프스타일] ──
  {
    id: "goods-01",
    category: "goods",
    categoryName: "브랜드 굿즈",
    track: "all",
    name: "ONCE 한정판 브라운 레더 키홀더 & 브라스 키",
    badge: "LIMITED EDITION",
    price: 68000,
    originalPrice: 68000,
    discountRate: "0%",
    image: "04.png", // 폴더 내 에셋
    summary: "조선호텔 엠블럼 24K 금박 각인 최상급 이탈리안 베지터블 레더 키홀더",
    benefits: [
      "이탈리아 최고급 베지터블 소가죽 100%",
      "조선호텔앤리조트 시그니처 엠블럼 24K 금박 각인",
      "영문 이니셜 무료 각인 서비스 (최대 3자)",
      "프리미엄 하드케이스 & 정품 보증서 동봉"
    ],
    details: "기획서 메인 포스터와 카드뉴스에 수록된 시그니처 굿즈. 쓸수록 깊어지는 가죽의 태닝과 품격을 느껴보세요."
  },
  {
    id: "goods-02",
    category: "goods",
    categoryName: "브랜드 굿즈",
    track: "all",
    name: "ONCE 시그니처 에메랄드 벨벳 가운 & 슬리퍼",
    badge: "EXCLUSIVE",
    price: 180000,
    originalPrice: 220000,
    discountRate: "18%",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80",
    summary: "극상의 부드러움을 선사하는 조선호텔 1인 전용 딥 에메랄드 벨벳 배스로브 세트",
    benefits: [
      "극세사 고밀도 벨벳 원단으로 보온성과 우아한 드레이프성 극대화",
      "골드 샴페인 자수 브랜드 로고 포인트",
      "메모리폼 컴포트 벨벳 슬리퍼 세트 구성"
    ],
    details: "객실의 아늑함을 집에서도 그대로 누릴 수 있는 시그니처 홈웨어 에디션입니다."
  }
];
