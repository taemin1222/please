/**
 * 공간(Spaces) 서비스 모듈
 */
class SpaceService {
  constructor(spaces) {
    this.spaces = spaces || [];
    this.currentFilter = 'all'; // 'all' | 'trackA' | 'trackB' | '레스케이프' | '웨스틴조선'
  }

  filterSpaces(filterKey) {
    this.currentFilter = filterKey;
    if (filterKey === 'all') return this.spaces;
    if (filterKey === 'trackA' || filterKey === 'trackB') {
      return this.spaces.filter(s => s.track === filterKey);
    }
    return this.spaces.filter(s => s.hotel.includes(filterKey));
  }

  renderCards(container, filteredList, onDetailClick, onBookClick) {
    container.innerHTML = '';

    if (!filteredList || filteredList.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem; color: #94A3B8;">
          <p style="font-size: 1.1rem; font-weight: 700; color: #475569;">선택한 조건의 공간이 없습니다.</p>
        </div>
      `;
      return;
    }

    filteredList.forEach(space => {
      const card = document.createElement('article');
      card.className = 'luxury-card';

      const trackBadgeClass = space.track === 'trackA' ? 'badge-track-a' : 'badge-track-b';
      const trackBadgeText = space.track === 'trackA' ? 'TRACK A · PRIVACY' : 'TRACK B · SALON';

      const priceText = space.pricePerNight > 0 
        ? `₩${space.pricePerNight.toLocaleString()}` 
        : `투숙객 전용 살롱`;

      const priceSub = space.pricePerNight > 0 ? `/ 1박` : `무료 입장`;

      const featurePills = space.features
        .slice(0, 3)
        .map(f => `<span class="feature-pill">✦ ${f}</span>`)
        .join('');

      card.innerHTML = `
        <div class="card-media-wrap">
          <img src="${space.image}" alt="${space.name}" class="card-media-img" loading="lazy" onerror="this.src='01.png'" />
          <span class="card-track-badge ${trackBadgeClass}">${trackBadgeText}</span>
        </div>
        <div class="card-body">
          <div class="card-location-row">
            <span>📍 ${space.hotel}</span>
            <span class="card-rating-text">★ ${space.rating.toFixed(2)}</span>
          </div>
          <h3 class="card-title">${space.name}</h3>
          <p class="card-tagline">"${space.tagline}"</p>
          <p class="card-desc">${space.description}</p>
          <div class="card-feature-pills">${featurePills}</div>
          <div class="card-footer">
            <div class="card-price-wrap">
              <span class="price-current">${priceText}</span>
              <span class="price-unit">${priceSub} (${space.capacity})</span>
            </div>
            <div class="card-action-btns">
              <button class="btn-card-secondary btn-space-detail" data-id="${space.id}">상세보기</button>
              <button class="btn-card-primary btn-space-book" data-id="${space.id}">1인 예약</button>
            </div>
          </div>
        </div>
      `;

      card.querySelector('.btn-space-detail').addEventListener('click', () => onDetailClick(space));
      card.querySelector('.btn-space-book').addEventListener('click', () => onBookClick(space));

      container.appendChild(card);
    });
  }
}
