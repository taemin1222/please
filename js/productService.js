/**
 * 상품 & 패키지(Products) 서비스 모듈
 */
class ProductService {
  constructor(products) {
    this.products = products || [];
    this.currentFilter = 'all'; // 'all' | 'package' | 'gourmet' | 'goods'
  }

  filterProducts(filterKey) {
    this.currentFilter = filterKey;
    if (filterKey === 'all') return this.products;
    return this.products.filter(p => p.category === filterKey);
  }

  renderCards(container, filteredList, onDetailClick, onAddToCart) {
    container.innerHTML = '';

    if (!filteredList || filteredList.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem; color: #94A3B8;">
          <p style="font-size: 1.1rem; font-weight: 700; color: #475569;">선택한 조건의 상품이 없습니다.</p>
        </div>
      `;
      return;
    }

    filteredList.forEach(product => {
      const card = document.createElement('article');
      card.className = 'luxury-card';

      const discountBadge = product.discountRate !== '0%' 
        ? `<span class="badge-product">${product.discountRate} OFF</span>` 
        : (product.badge ? `<span class="badge-product" style="background:#0F382C; border:1px solid #C5A880;">${product.badge}</span>` : '');

      const originalPriceHtml = product.originalPrice > product.price 
        ? `<span class="price-original">₩${product.originalPrice.toLocaleString()}</span>` 
        : '';

      const benefitPills = product.benefits
        .slice(0, 3)
        .map(b => `<span class="feature-pill">✓ ${b}</span>`)
        .join('');

      card.innerHTML = `
        <div class="card-media-wrap">
          <img src="${product.image}" alt="${product.name}" class="card-media-img" loading="lazy" onerror="this.src='04.png'" />
          ${discountBadge}
        </div>
        <div class="card-body">
          <div class="card-location-row">
            <span>🎁 ${product.categoryName}</span>
            <span style="color:#C5A880; font-weight:700;">1인 맞춤 패키지</span>
          </div>
          <h3 class="card-title">${product.name}</h3>
          <p class="card-tagline">${product.summary}</p>
          <div class="card-feature-pills">${benefitPills}</div>
          <div class="card-footer">
            <div class="card-price-wrap">
              ${originalPriceHtml}
              <span class="price-current">₩${product.price.toLocaleString()}</span>
            </div>
            <div class="card-action-btns">
              <button class="btn-card-secondary btn-prod-detail" data-id="${product.id}">상세보기</button>
              <button class="btn-card-primary btn-prod-cart" data-id="${product.id}">장바구니 담기</button>
            </div>
          </div>
        </div>
      `;

      card.querySelector('.btn-prod-detail').addEventListener('click', () => onDetailClick(product));
      card.querySelector('.btn-prod-cart').addEventListener('click', () => onAddToCart(product));

      container.appendChild(card);
    });
  }
}
