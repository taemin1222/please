/**
 * 필터 & 검색 & 정렬 서비스 모듈
 */
class FilterService {
  constructor(initialStores) {
    this.allStores = initialStores || [];
    this.filterState = {
      category: 'all',
      gu: 'all',
      keyword: '',
      sortBy: 'rating' // 'rating' | 'reviews' | 'name'
    };
  }

  /**
   * 필터 상태 업데이트
   */
  updateFilter(patch) {
    this.filterState = { ...this.filterState, ...patch };
  }

  /**
   * 현재 상태 초기화
   */
  resetFilters() {
    this.filterState = {
      category: 'all',
      gu: 'all',
      keyword: '',
      sortBy: 'rating'
    };
  }

  /**
   * 다중 조건 필터링 및 정렬 수행
   */
  getFilteredStores() {
    const { category, gu, keyword, sortBy } = this.filterState;
    const cleanKeyword = keyword.trim().toLowerCase();

    let results = this.allStores.filter(store => {
      // 1. 카테고리 필터
      if (category !== 'all' && store.category !== category) {
        return false;
      }

      // 2. 지역(구) 필터
      if (gu !== 'all' && store.gu !== gu) {
        return false;
      }

      // 3. 키워드 검색 (상점명, 주소, 동, 태그, 설명)
      if (cleanKeyword) {
        const matchName = store.name.toLowerCase().includes(cleanKeyword);
        const matchAddress = store.address.toLowerCase().includes(cleanKeyword);
        const matchDong = store.dong.toLowerCase().includes(cleanKeyword);
        const matchDesc = store.description.toLowerCase().includes(cleanKeyword);
        const matchTags = store.tags.some(tag => tag.toLowerCase().includes(cleanKeyword));

        if (!matchName && !matchAddress && !matchDong && !matchDesc && !matchTags) {
          return false;
        }
      }

      return true;
    });

    // 정렬
    results.sort((a, b) => {
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (sortBy === 'reviews') {
        return b.reviewsCount - a.reviewsCount;
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name, 'ko');
      }
      return 0;
    });

    return results;
  }

  /**
   * 고유한 구(Gu) 목록 추출
   */
  getAvailableGus() {
    const gus = new Set();
    this.allStores.forEach(s => {
      if (s.gu) gus.add(s.gu);
    });
    return Array.from(gus).sort((a, b) => a.localeCompare(b, 'ko'));
  }

  /**
   * 카테고리별 상점 개수 카운트 계산
   */
  getCategoryCounts() {
    const { gu, keyword } = this.filterState;
    const cleanKeyword = keyword.trim().toLowerCase();

    // 현재 구 및 검색어 조건에 부합하는 기준 대상 추출
    const baseStores = this.allStores.filter(store => {
      if (gu !== 'all' && store.gu !== gu) return false;
      if (cleanKeyword) {
        const matchName = store.name.toLowerCase().includes(cleanKeyword);
        const matchAddress = store.address.toLowerCase().includes(cleanKeyword);
        const matchDong = store.dong.toLowerCase().includes(cleanKeyword);
        const matchTags = store.tags.some(tag => tag.toLowerCase().includes(cleanKeyword));
        if (!matchName && !matchAddress && !matchDong && !matchTags) return false;
      }
      return true;
    });

    const counts = { all: baseStores.length };
    baseStores.forEach(store => {
      counts[store.category] = (counts[store.category] || 0) + 1;
    });

    return counts;
  }
}
