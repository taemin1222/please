/**
 * UI 렌더링 및 DOM 인터랙션 서비스 모듈
 */
class UiService {
  constructor(config) {
    this.config = config;
    this.selectedStoreId = null;

    // DOM 요소 캐싱
    this.elements = {
      categoryChipsContainer: document.getElementById('categoryChips'),
      guSelect: document.getElementById('guSelect'),
      sortSelect: document.getElementById('sortSelect'),
      searchInput: document.getElementById('searchInput'),
      searchClearBtn: document.getElementById('searchClearBtn'),
      storeListContainer: document.getElementById('storeListContainer'),
      summaryCount: document.getElementById('summaryCount'),
      modalOverlay: document.getElementById('modalOverlay'),
      modalContent: document.getElementById('modalContent')
    };
  }

  /**
   * 구 선택 드롭다운 옵션 초기화
   */
  initGuSelect(gus, currentGu, onChange) {
    this.elements.guSelect.innerHTML = '<option value="all">전체 지역 (서울)</option>';
    gus.forEach(gu => {
      const opt = document.createElement('option');
      opt.value = gu;
      opt.textContent = `${gu} (${gu === '중구' || gu === '종로구' ? '강북' : '강남'})`;
      if (gu === currentGu) opt.selected = true;
      this.elements.guSelect.appendChild(opt);
    });

    this.elements.guSelect.addEventListener('change', (e) => {
      onChange(e.target.value);
    });
  }

  /**
   * 카테고리 칩 목록 렌더링
   */
  renderCategoryChips(activeCategory, categoryCounts, onSelect) {
    this.elements.categoryChipsContainer.innerHTML = '';

    this.config.categories.forEach(cat => {
      const count = categoryCounts[cat.id] || 0;
      const btn = document.createElement('button');
      btn.className = `chip-btn ${cat.id === activeCategory ? 'active' : ''}`;
      btn.setAttribute('data-category', cat.id);
      btn.innerHTML = `
        <span class="chip-icon">${cat.icon}</span>
        <span class="chip-name">${cat.name}</span>
        <span class="chip-count">${count}</span>
      `;

      btn.addEventListener('click', () => {
        onSelect(cat.id);
      });

      this.elements.categoryChipsContainer.appendChild(btn);
    });
  }

  /**
   * 상점 목록 카드 렌더링
   */
  renderStoreList(stores, onCardClick, onDetailClick, onResetFilters) {
    this.elements.storeListContainer.innerHTML = '';
    this.elements.summaryCount.innerHTML = `총 <span>${stores.length}</span>개의 스팟`;

    if (stores.length === 0) {
      // Empty State
      this.elements.storeListContainer.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🧭</div>
          <div class="empty-text">조건에 맞는 상점을 찾지 못했습니다</div>
          <div class="empty-subtext">검색어 철자를 확인하거나 필터를 초기화해 보세요.</div>
          <button class="btn-reset-filters" id="btnEmptyReset">모든 필터 초기화</button>
        </div>
      `;

      const resetBtn = document.getElementById('btnEmptyReset');
      if (resetBtn && onResetFilters) {
        resetBtn.addEventListener('click', onResetFilters);
      }
      return;
    }

    stores.forEach(store => {
      const categoryMeta = this.config.categories.find(c => c.id === store.category);
      const catColor = categoryMeta ? categoryMeta.color : '#0F382C';

      const card = document.createElement('div');
      card.className = `store-card ${store.id === this.selectedStoreId ? 'selected' : ''}`;
      card.setAttribute('data-store-id', store.id);

      const tagsHtml = store.tags
        .slice(0, 3)
        .map(tag => `<span class="tag-pill">#${tag}</span>`)
        .join('');

      card.innerHTML = `
        <div class="card-image-wrap">
          <img src="${store.imageUrl}" alt="${store.name}" class="card-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80'" />
          <span class="card-category-badge" style="background-color: ${catColor};">
            ${store.categoryName}
          </span>
          <span class="card-rating-badge">★ ${store.rating.toFixed(1)}</span>
        </div>
        <div class="card-content">
          <div class="card-header-row">
            <h3 class="card-title">${store.name}</h3>
            <span class="card-region">${store.gu} ${store.dong}</span>
          </div>
          <p class="card-desc">${store.description}</p>
          <div class="card-tags">${tagsHtml}</div>
          <div class="card-footer-row">
            <span class="card-price">${store.priceRange} · ${store.operatingHours.split('(')[0]}</span>
            <button class="btn-detail-quick" data-store-id="${store.id}">
              상세보기 &rarr;
            </button>
          </div>
        </div>
      `;

      // 카드 전체 클릭 -> 지도 위치 이동
      card.addEventListener('click', (e) => {
        // 상세보기 버튼 클릭 시엔 카드 클릭 이벤트 대신 모달 열기
        if (e.target.closest('.btn-detail-quick')) {
          onDetailClick(store);
          return;
        }
        this.selectCard(store.id);
        onCardClick(store);
      });

      this.elements.storeListContainer.appendChild(card);
    });
  }

  /**
   * 사이드바 특정 카드 하이라이트 및 자동 스크롤
   */
  selectCard(storeId) {
    this.selectedStoreId = storeId;
    const cards = this.elements.storeListContainer.querySelectorAll('.store-card');
    cards.forEach(card => {
      if (parseInt(card.getAttribute('data-store-id'), 10) === storeId) {
        card.classList.add('selected');
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        card.classList.remove('selected');
      }
    });
  }

  /**
   * 상세 모달 열기
   */
  openDetailModal(store) {
    if (!store) return;
    const categoryMeta = this.config.categories.find(c => c.id === store.category);
    const catColor = categoryMeta ? categoryMeta.color : '#0F382C';

    const tagsHtml = store.tags.map(tag => `<span class="tag-pill">#${tag}</span>`).join('');

    // 네이버 지도 및 카카오맵 길찾기 검색 URL 인코딩
    const naverSearchUrl = `https://map.naver.com/v5/search/${encodeURIComponent(store.name + ' ' + store.gu)}`;
    const kakaoSearchUrl = `https://map.kakao.com/link/search/${encodeURIComponent(store.name)}`;

    this.elements.modalContent.innerHTML = `
      <div class="modal-dialog">
        <button class="modal-close-btn" id="modalCloseBtn" aria-label="닫기">&times;</button>
        <div class="modal-hero-image-wrap">
          <img src="${store.imageUrl}" alt="${store.name}" class="modal-hero-img" onerror="this.src='https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'" />
          <div class="modal-hero-overlay"></div>
          <div class="modal-hero-info">
            <span class="modal-category-badge" style="background-color: ${catColor};">
              ${store.categoryName}
            </span>
            <h2 class="modal-title">${store.name}</h2>
          </div>
        </div>

        <div class="modal-body">
          <div class="modal-meta-bar">
            <span class="meta-rating">★ ${store.rating.toFixed(1)}</span>
            <span class="meta-reviews">방문자리뷰 ${store.reviewsCount}건</span>
            <span class="meta-price">${store.priceRange}</span>
            <span class="meta-gu">📍 ${store.gu} ${store.dong}</span>
          </div>

          <div>
            <div class="modal-section-title">소개</div>
            <p class="modal-desc-text">${store.description}</p>
          </div>

          <div>
            <div class="modal-section-title">스팟 특징</div>
            <div class="card-tags">${tagsHtml}</div>
          </div>

          <div class="modal-detail-list">
            <div class="modal-detail-item">
              <span class="detail-label">도로명 주소</span>
              <span class="detail-value">${store.address}</span>
            </div>
            <div class="modal-detail-item">
              <span class="detail-label">영업 시간</span>
              <span class="detail-value">${store.operatingHours}</span>
            </div>
            <div class="modal-detail-item">
              <span class="detail-label">문의 전화</span>
              <span class="detail-value"><a href="tel:${store.phone}" style="color: #0F382C; font-weight:700; text-decoration:underline;">${store.phone}</a></span>
            </div>
          </div>

          <div class="modal-actions">
            <a href="${naverSearchUrl}" target="_blank" rel="noopener noreferrer" class="btn-action-primary">
              네이버 지도 길찾기 ↗
            </a>
            <a href="${kakaoSearchUrl}" target="_blank" rel="noopener noreferrer" class="btn-action-secondary">
              카카오맵 검색 ↗
            </a>
          </div>
        </div>
      </div>
    `;

    this.elements.modalOverlay.classList.add('open');

    // 닫기 버튼 바인딩
    const closeBtn = document.getElementById('modalCloseBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeDetailModal());
    }
  }

  /**
   * 상세 모달 닫기
   */
  closeDetailModal() {
    this.elements.modalOverlay.classList.remove('open');
  }
}
