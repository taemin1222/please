/**
 * StoreMap 애플리케이션 환경 설정
 */
const APP_CONFIG = {
  // 지도 초기 설정
  map: {
    // 기본 지도 프로바이더: 'leaflet' (API 키 없이 브라우저에서 즉시 100% 구동)
    // 네이버 클라우드 플랫폼 Client ID가 있을 경우 'naver'로 변경 가능
    provider: 'leaflet',
    naverClientId: '', // 필요한 경우 NCP Maps Client ID 입력
    defaultCenter: {
      lat: 37.5580,
      lng: 126.9850
    },
    defaultZoom: 13,
    minZoom: 10,
    maxZoom: 18
  },

  // 카테고리 메타데이터 정의
  categories: [
    { id: 'all', name: '전체', icon: '✦', color: '#1E293B' },
    { id: 'dining', name: '파인다이닝', icon: '🍽️', color: '#E11D48' },
    { id: 'cafe', name: '카페/티살롱', icon: '☕', color: '#D97706' },
    { id: 'bar', name: '와인/칵테일바', icon: '🍸', color: '#8B5CF6' },
    { id: 'bakery', name: '베이커리', icon: '🥐', color: '#EA580C' },
    { id: 'lifestyle', name: '라이프스타일', icon: '🛍️', color: '#059669' }
  ]
};
