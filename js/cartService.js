/**
 * [No-DB] 로컬스토리지 기반 장바구니 서비스
 */
class CartService {
  constructor() {
    this.storageKey = 'once_ones_cart_v1';
    this.items = this.loadFromStorage();
    this.onCartChangeCallbacks = [];
  }

  loadFromStorage() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

  saveToStorage() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.items));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
    this.notifyChange();
  }

  onChange(callback) {
    this.onCartChangeCallbacks.push(callback);
  }

  notifyChange() {
    this.onCartChangeCallbacks.forEach(cb => cb(this.items));
  }

  addItem(item, type = 'product') {
    const existing = this.items.find(i => i.id === item.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({
        id: item.id,
        name: item.name,
        price: item.price || item.pricePerNight || 0,
        image: item.image,
        type: type,
        categoryName: item.categoryName || item.trackName || '호캉스',
        quantity: 1
      });
    }
    this.saveToStorage();
  }

  removeItem(id) {
    this.items = this.items.filter(i => i.id !== id);
    this.saveToStorage();
  }

  updateQuantity(id, delta) {
    const target = this.items.find(i => i.id === id);
    if (!target) return;
    target.quantity += delta;
    if (target.quantity <= 0) {
      this.removeItem(id);
    } else {
      this.saveToStorage();
    }
  }

  getTotalAmount() {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  getTotalCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  clear() {
    this.items = [];
    this.saveToStorage();
  }

  renderDrawer(container, onCheckout) {
    const itemsWrap = container.querySelector('.cart-items-wrap');
    const totalAmountEl = container.querySelector('.total-amount');

    totalAmountEl.textContent = `₩${this.getTotalAmount().toLocaleString()}`;

    if (this.items.length === 0) {
      itemsWrap.innerHTML = `
        <div class="cart-empty-state">
          <div style="font-size: 2.5rem; margin-bottom: 0.8rem;">🛍️</div>
          <p style="font-weight: 700; color: #475569; margin-bottom: 0.3rem;">장바구니가 비어 있습니다</p>
          <p style="font-size: 0.8rem; color: #94A3B8;">원하는 1인 패키지나 공간을 담아보세요.</p>
        </div>
      `;
      return;
    }

    itemsWrap.innerHTML = '';
    this.items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'cart-item-card';
      card.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.src='01.png'" />
        <div class="cart-item-info">
          <div>
            <span style="font-size: 0.72rem; color: #C5A880; font-weight:700;">${item.categoryName}</span>
            <div class="cart-item-name">${item.name}</div>
          </div>
          <div class="cart-item-price">₩${(item.price * item.quantity).toLocaleString()}</div>
          <div class="cart-item-actions">
            <button class="btn-qty btn-minus" data-id="${item.id}">-</button>
            <span style="font-size: 0.85rem; font-weight: 700; min-width: 18px; text-align: center;">${item.quantity}</span>
            <button class="btn-qty btn-plus" data-id="${item.id}">+</button>
            <button class="btn-remove-item" data-id="${item.id}">삭제</button>
          </div>
        </div>
      `;

      card.querySelector('.btn-minus').addEventListener('click', () => this.updateQuantity(item.id, -1));
      card.querySelector('.btn-plus').addEventListener('click', () => this.updateQuantity(item.id, 1));
      card.querySelector('.btn-remove-item').addEventListener('click', () => this.removeItem(item.id));

      itemsWrap.appendChild(card);
    });

    const checkoutBtn = container.querySelector('.btn-cart-checkout');
    if (checkoutBtn) {
      checkoutBtn.onclick = () => onCheckout(this.items, this.getTotalAmount());
    }
  }
}
