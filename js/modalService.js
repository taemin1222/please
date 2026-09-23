/**
 * 모달 다이얼로그 & 미디어 플레이어 서비스 모듈
 */
class ModalService {
  constructor() {
    this.modalBackdrop = document.getElementById('modalBackdrop');
    this.modalContainer = document.getElementById('modalContainer');
    this.toastEl = document.getElementById('toastMsg');
    this.currentCarouselIndex = 0;
    this.carouselImages = ['01.png', '02.png', '03.png', '04.png'];

    // 백드롭 클릭 닫기
    this.modalBackdrop.addEventListener('click', (e) => {
      if (e.target === this.modalBackdrop) {
        this.closeModal();
      }
    });

    // ESC 닫기
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeModal();
      }
    });
  }

  showToast(message) {
    this.toastEl.textContent = message;
    this.toastEl.classList.add('show');
    setTimeout(() => {
      this.toastEl.classList.remove('show');
    }, 2800);
  }

  closeModal() {
    // 비디오 재생 중지 처리
    const video = this.modalContainer.querySelector('video');
    if (video) {
      video.pause();
    }
    this.modalBackdrop.classList.remove('open');
    this.modalContainer.innerHTML = '';
  }

  /**
   * 18초 브랜드 숏폼 영상 모달 오픈 (3조 원스.mp4)
   */
  openVideoModal() {
    this.modalContainer.innerHTML = `
      <div class="video-modal-box">
        <button class="btn-modal-close" id="btnCloseModal">&times;</button>
        <div class="video-container">
          <video class="video-player-element" autoplay controls playsinline>
            <source src="3조 원스.mp4" type="video/mp4">
            브라우저가 비디오 태그를 지원하지 않습니다.
          </video>
        </div>
        <div style="padding: 1.2rem; background: #09241C; color: #FFFFFF; text-align: center;">
          <h4 style="font-size: 1.05rem; font-weight: 800; color: #E5C9A4; margin-bottom: 0.3rem;">ONCE, ONE'S BY JOSUN HOTEL</h4>
          <p style="font-size: 0.8rem; color: rgba(255, 255, 255, 0.75);">"혼자이기 때문에 더 온전하게 누리는 5성급 럭셔리"</p>
        </div>
      </div>
    `;

    this.modalBackdrop.classList.add('open');
    document.getElementById('btnCloseModal').addEventListener('click', () => this.closeModal());
  }

  /**
   * 4컷 카드뉴스 캐러셀 모달 오픈 (01.png ~ 04.png)
   */
  openCarouselModal() {
    this.currentCarouselIndex = 0;
    this.renderCarouselView();
    this.modalBackdrop.classList.add('open');
  }

  renderCarouselView() {
    const currentImg = this.carouselImages[this.currentCarouselIndex];
    const total = this.carouselImages.length;

    const dotsHtml = this.carouselImages
      .map((_, i) => `<span class="carousel-dot ${i === this.currentCarouselIndex ? 'active' : ''}"></span>`)
      .join('');

    this.modalContainer.innerHTML = `
      <div class="modal-content-box carousel-modal-box">
        <button class="btn-modal-close" id="btnCloseModal">&times;</button>
        <div style="margin-bottom: 1rem; text-align: center;">
          <span style="font-size: 0.75rem; color: #E5C9A4; font-weight:800; letter-spacing:0.1em;">INSTAGRAM CARD NEWS (${this.currentCarouselIndex + 1}/${total})</span>
          <h3 style="font-size: 1.15rem; font-weight: 800; margin-top: 0.2rem;">ONCE, ONE'S 공식 브랜드 스토리</h3>
        </div>
        <div class="carousel-slide-wrap">
          <img src="${currentImg}" alt="카드뉴스 ${this.currentCarouselIndex + 1}" class="carousel-img" />
        </div>
        <div class="carousel-nav-btns">
          <button class="btn-carousel-ctrl" id="btnPrevSlide" ${this.currentCarouselIndex === 0 ? 'disabled style="opacity:0.4;"' : ''}>&larr; 이전</button>
          <div class="carousel-dots">${dotsHtml}</div>
          <button class="btn-carousel-ctrl" id="btnNextSlide" ${this.currentCarouselIndex === total - 1 ? 'disabled style="opacity:0.4;"' : ''}>다음 &rarr;</button>
        </div>
      </div>
    `;

    document.getElementById('btnCloseModal').addEventListener('click', () => this.closeModal());
    const prevBtn = document.getElementById('btnPrevSlide');
    const nextBtn = document.getElementById('btnNextSlide');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (this.currentCarouselIndex > 0) {
          this.currentCarouselIndex--;
          this.renderCarouselView();
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (this.currentCarouselIndex < this.carouselImages.length - 1) {
          this.currentCarouselIndex++;
          this.renderCarouselView();
        }
      });
    }
  }

  /**
   * 공간(Space) 상세 모달
   */
  openSpaceDetailModal(space, onBook) {
    const featureList = space.features
      .map(f => `<li style="margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;"><span style="color:#C5A880; font-weight:800;">✦</span> ${f}</li>`)
      .join('');

    const galleryImages = space.gallery && space.gallery.length > 0 ? space.gallery : [space.image];
    const thumbHtml = galleryImages
      .map((img, idx) => `
        <button class="modal-thumb-btn ${idx === 0 ? 'active' : ''}" data-src="${img}" style="width: 70px; height: 50px; border-radius: 6px; overflow: hidden; border: 2px solid ${idx === 0 ? '#C5A880' : 'transparent'}; flex-shrink: 0; cursor: pointer; padding: 0;">
          <img src="${img}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='01.png'" />
        </button>
      `)
      .join('');

    const priceText = space.pricePerNight > 0 
      ? `₩${space.pricePerNight.toLocaleString()} <span style="font-size:0.85rem; color:#8E9BAE; font-weight:500;">/ 1박</span>` 
      : `투숙객 전용 살롱 공간`;

    this.modalContainer.innerHTML = `
      <div class="modal-content-box" style="max-width: 680px;">
        <button class="btn-modal-close" id="btnCloseModal">&times;</button>
        <div style="height: 300px; position: relative; overflow: hidden; background: #000;">
          <img id="spaceHeroImg" src="${space.image}" alt="${space.name}" style="width: 100%; height: 100%; object-fit: cover; transition: opacity 0.3s ease;" onerror="this.src='01.png'" />
          <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%); pointer-events: none;"></div>
          <div style="position: absolute; bottom: 1.2rem; left: 1.8rem; right: 1.8rem; color: #FFF; pointer-events: none;">
            <span style="font-size: 0.75rem; background: rgba(197, 168, 128, 0.25); border: 1px solid #C5A880; color: #E5C9A4; padding: 0.25rem 0.75rem; border-radius: 9999px; font-weight: 800;">
              ${space.trackName}
            </span>
            <h2 style="font-size: 1.7rem; font-weight: 800; margin-top: 0.3rem;">${space.name}</h2>
            <p style="font-size: 0.85rem; color: #E5C9A4;">📍 ${space.hotel} · ${space.theme}</p>
          </div>
        </div>

        <!-- Gallery Thumbnails -->
        <div style="display: flex; gap: 0.6rem; padding: 0.75rem 1.8rem 0; overflow-x: auto; background: #F8FAFC; border-bottom: 1px solid #E2E8F0;">
          ${thumbHtml}
        </div>

        <div style="padding: 1.6rem 1.8rem; display: flex; flex-direction: column; gap: 1.3rem;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; padding-bottom: 1rem; border-bottom: 1px solid #E2E8F0;">
            <div>
              <div style="font-size: 0.8rem; color: #8E9BAE; font-weight: 600;">1박 기준 요금</div>
              <div style="font-size: 1.6rem; font-weight: 800; color: #09241C;">${priceText}</div>
            </div>
            <div style="text-align: right; font-size: 0.85rem; color: #475569;">
              <div>정원: <strong>${space.capacity}</strong></div>
              <div>베드: <strong>${space.bedType}</strong></div>
              <div>면적: <strong>${space.size}</strong></div>
            </div>
          </div>

          <div>
            <h4 style="font-size: 1rem; font-weight: 800; color: #0F382C; margin-bottom: 0.5rem;">공간 스토리</h4>
            <p style="font-size: 0.92rem; color: #475569; line-height: 1.7;">${space.description}</p>
          </div>

          <div style="background: #F8FAFC; padding: 1.2rem; border-radius: 12px; border: 1px solid #E2E8F0;">
            <h4 style="font-size: 0.92rem; font-weight: 800; color: #0F382C; margin-bottom: 0.8rem;">1인 전담 맞춤 편의 & 어메니티</h4>
            <ul style="font-size: 0.88rem; color: #334155;">${featureList}</ul>
          </div>

          <div style="display: flex; gap: 0.8rem; margin-top: 0.5rem;">
            <button class="btn-card-secondary" id="btnModalCloseSub" style="flex: 1; padding: 0.9rem;">닫기</button>
            <button class="btn-card-primary" id="btnModalBook" style="flex: 2; padding: 0.9rem; font-size: 1rem;">
              이 공간으로 1인 호캉스 예약하기 &rarr;
            </button>
          </div>
        </div>
      </div>
    `;

    this.modalBackdrop.classList.add('open');
    document.getElementById('btnCloseModal').addEventListener('click', () => this.closeModal());
    document.getElementById('btnModalCloseSub').addEventListener('click', () => this.closeModal());
    document.getElementById('btnModalBook').addEventListener('click', () => {
      this.closeModal();
      onBook(space);
    });

    // 썸네일 클릭 시 메인 이미지 변경
    const heroImg = document.getElementById('spaceHeroImg');
    const thumbBtns = this.modalContainer.querySelectorAll('.modal-thumb-btn');
    thumbBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        thumbBtns.forEach(b => {
          b.classList.remove('active');
          b.style.borderColor = 'transparent';
        });
        btn.classList.add('active');
        btn.style.borderColor = '#C5A880';
        const newSrc = btn.getAttribute('data-src');
        if (heroImg && newSrc) {
          heroImg.style.opacity = '0.3';
          setTimeout(() => {
            heroImg.src = newSrc;
            heroImg.style.opacity = '1';
          }, 150);
        }
      });
    });
  }

  /**
   * 사진 갤러리 라이트박스 팝업
   */
  openLightboxModal(item) {
    this.modalContainer.innerHTML = `
      <div class="lightbox-modal-box">
        <button class="btn-modal-close" id="btnCloseModal">&times;</button>
        <div class="lightbox-img-wrap">
          <img src="${item.image}" alt="${item.title}" class="lightbox-img" onerror="this.src='01.png'" />
        </div>
        <div class="lightbox-caption-bar">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <span style="font-size: 0.75rem; background: rgba(197, 168, 128, 0.25); border: 1px solid #C5A880; color: #E5C9A4; padding: 0.2rem 0.6rem; border-radius: 9999px; font-weight: 800;">
                ${item.hotel} · ${item.categoryName}
              </span>
              <h3 style="font-size: 1.25rem; font-weight: 800; margin-top: 0.4rem;">${item.title}</h3>
            </div>
            <button class="btn-card-secondary" id="btnLightboxClose" style="background: rgba(255,255,255,0.15); color:#FFF; padding: 0.5rem 1rem;">
              닫기
            </button>
          </div>
          <p style="font-size: 0.88rem; color: rgba(255, 255, 255, 0.8); margin-top: 0.5rem; line-height: 1.5;">
            ${item.caption}
          </p>
        </div>
      </div>
    `;

    this.modalBackdrop.classList.add('open');
    document.getElementById('btnCloseModal').addEventListener('click', () => this.closeModal());
    document.getElementById('btnLightboxClose').addEventListener('click', () => this.closeModal());
  }

  /**
   * 상품(Product) 상세 모달
   */
  openProductDetailModal(product, onAddToCart) {
    const benefitList = product.benefits
      .map(b => `<li style="margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;"><span style="color:#0F382C; font-weight:800;">✓</span> ${b}</li>`)
      .join('');

    const originalPriceHtml = product.originalPrice > product.price 
      ? `<span style="font-size: 0.9rem; color: #8E9BAE; text-decoration: line-through;">₩${product.originalPrice.toLocaleString()}</span>` 
      : '';

    this.modalContainer.innerHTML = `
      <div class="modal-content-box" style="max-width: 640px;">
        <button class="btn-modal-close" id="btnCloseModal">&times;</button>
        <div style="height: 260px; position: relative; overflow: hidden; background: #000;">
          <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='04.png'" />
          <div style="position: absolute; top: 1.2rem; left: 1.2rem;">
            <span class="badge-product" style="position: static;">${product.discountRate !== '0%' ? product.discountRate + ' OFF' : product.badge}</span>
          </div>
        </div>

        <div style="padding: 1.8rem; display: flex; flex-direction: column; gap: 1.4rem;">
          <div>
            <span style="font-size: 0.78rem; color: #C5A880; font-weight: 800; letter-spacing: 0.05em;">${product.categoryName}</span>
            <h2 style="font-size: 1.6rem; font-weight: 800; color: #09241C; margin-top: 0.2rem;">${product.name}</h2>
            <p style="font-size: 0.92rem; color: #64748B; margin-top: 0.4rem;">${product.summary}</p>
          </div>

          <div style="display: flex; align-items: baseline; gap: 0.8rem; padding-bottom: 1rem; border-bottom: 1px solid #E2E8F0;">
            ${originalPriceHtml}
            <span style="font-size: 1.8rem; font-weight: 800; color: #0F382C;">₩${product.price.toLocaleString()}</span>
            <span style="font-size: 0.85rem; color: #16A34A; font-weight: 700;">(1인 혜택 패키지)</span>
          </div>

          <div>
            <h4 style="font-size: 0.95rem; font-weight: 800; color: #0F382C; margin-bottom: 0.4rem;">상세 안내</h4>
            <p style="font-size: 0.9rem; color: #475569; line-height: 1.65;">${product.details}</p>
          </div>

          <div style="background: #FDFBF7; padding: 1.2rem; border-radius: 12px; border: 1px solid rgba(197, 168, 128, 0.3);">
            <h4 style="font-size: 0.9rem; font-weight: 800; color: #96784E; margin-bottom: 0.6rem;">포함 혜택 리스트</h4>
            <ul style="font-size: 0.88rem; color: #334155;">${benefitList}</ul>
          </div>

          <div style="display: flex; gap: 0.8rem; margin-top: 0.5rem;">
            <button class="btn-card-secondary" id="btnModalCloseProd" style="flex: 1; padding: 0.9rem;">닫기</button>
            <button class="btn-card-primary" id="btnModalAddCart" style="flex: 2; padding: 0.9rem; font-size: 1rem;">
              🛍️ 장바구니에 담기
            </button>
          </div>
        </div>
      </div>
    `;

    this.modalBackdrop.classList.add('open');
    document.getElementById('btnCloseModal').addEventListener('click', () => this.closeModal());
    document.getElementById('btnModalCloseProd').addEventListener('click', () => this.closeModal());
    document.getElementById('btnModalAddCart').addEventListener('click', () => {
      onAddToCart(product);
      this.closeModal();
      this.showToast(`[${product.name}] 장바구니에 추가되었습니다.`);
    });
  }

  /**
   * 1인 간이 예약 신청 모달
   */
  openBookingModal(targetItem, onConfirm) {
    const today = new Date().toISOString().split('T')[0];

    this.modalContainer.innerHTML = `
      <div class="modal-content-box" style="max-width: 520px; padding: 2rem;">
        <button class="btn-modal-close" id="btnCloseModal">&times;</button>
        <div style="text-align: center; margin-bottom: 1.5rem;">
          <span style="font-size: 0.75rem; background: #0F382C; color: #E5C9A4; padding: 0.2rem 0.7rem; border-radius: 9999px; font-weight: 800;">
            1인 전용 예약 시뮬레이터 (NO-DB)
          </span>
          <h3 style="font-size: 1.4rem; font-weight: 800; color: #09241C; margin-top: 0.6rem;">
            ${targetItem ? targetItem.name : 'ONCE 1인 호캉스 예약'}
          </h3>
          <p style="font-size: 0.85rem; color: #64748B;">오직 당신만을 위한 프라이빗 일정을 설계합니다.</p>
        </div>

        <form id="bookingForm" style="display: flex; flex-direction: column; gap: 1rem;">
          <div>
            <label style="display: block; font-size: 0.82rem; font-weight: 700; color: #334155; margin-bottom: 0.3rem;">체크인 희망일</label>
            <input type="date" id="bookDate" min="${today}" value="${today}" required 
              style="width: 100%; padding: 0.75rem; border: 1px solid #CBD5E1; border-radius: 8px; font-size: 0.9rem;" />
          </div>

          <div>
            <label style="display: block; font-size: 0.82rem; font-weight: 700; color: #334155; margin-bottom: 0.3rem;">원하는 트랙 선택</label>
            <select id="bookTrack" style="width: 100%; padding: 0.75rem; border: 1px solid #CBD5E1; border-radius: 8px; font-size: 0.9rem; background: #FFF;">
              <option value="trackA">Track A: Complete Privacy (객실 내 프라이빗 디너)</option>
              <option value="trackB">Track B: Soft Connection (와인 살롱 프리패스)</option>
            </select>
          </div>

          <div>
            <label style="display: block; font-size: 0.82rem; font-weight: 700; color: #334155; margin-bottom: 0.3rem;">예약자 성명</label>
            <input type="text" id="bookName" placeholder="예: 김조선" required 
              style="width: 100%; padding: 0.75rem; border: 1px solid #CBD5E1; border-radius: 8px; font-size: 0.9rem;" />
          </div>

          <div>
            <label style="display: block; font-size: 0.82rem; font-weight: 700; color: #334155; margin-bottom: 0.3rem;">연락처</label>
            <input type="tel" id="bookPhone" placeholder="010-0000-0000" required 
              style="width: 100%; padding: 0.75rem; border: 1px solid #CBD5E1; border-radius: 8px; font-size: 0.9rem;" />
          </div>

          <div style="background: #F1F5F9; padding: 1rem; border-radius: 8px; font-size: 0.8rem; color: #475569;">
            🔒 <strong>1인 환대 보장</strong>: 1인 투숙 고객의 편안한 체류를 위해 체크인부터 퇴실까지 전담 1:1 컨시어지 케어가 제공됩니다.
          </div>

          <button type="submit" class="btn-card-primary" style="padding: 1rem; font-size: 1.05rem; margin-top: 0.5rem;">
            1인 럭셔리 예약 신청 완료하기
          </button>
        </form>
      </div>
    `;

    this.modalBackdrop.classList.add('open');
    document.getElementById('btnCloseModal').addEventListener('click', () => this.closeModal());

    document.getElementById('bookingForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const date = document.getElementById('bookDate').value;
      const track = document.getElementById('bookTrack').value;
      const name = document.getElementById('bookName').value;

      this.closeModal();
      onConfirm({ date, track, name, item: targetItem });
    });
  }

  /**
   * 예약 완료 축하 모달
   */
  openBookingCompleteModal(info) {
    const bookingCode = 'ONCE-' + Math.floor(100000 + Math.random() * 900000);

    this.modalContainer.innerHTML = `
      <div class="modal-content-box" style="max-width: 480px; padding: 2.5rem; text-align: center;">
        <div style="width: 60px; height: 60px; background: #0F382C; color: #E5C9A4; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; margin: 0 auto 1.2rem;">
          ✓
        </div>
        <span style="font-size: 0.75rem; color: #C5A880; font-weight: 800; letter-spacing: 0.08em;">RESERVATION CONFIRMED</span>
        <h2 style="font-size: 1.6rem; font-weight: 800; color: #09241C; margin: 0.4rem 0 0.8rem;">
          ${info.name}님, 예약이 확정되었습니다
        </h2>
        <p style="font-size: 0.88rem; color: #64748B; line-height: 1.6;">
          "한 번 와도, 혼자 와도 우리 사람"<br>
          오직 한 사람만을 위한 5성급 럭셔리 케어로 모시겠습니다.
        </p>

        <div style="background: #F8FAFC; border: 1px dashed #CBD5E1; border-radius: 12px; padding: 1.2rem; margin: 1.5rem 0; text-align: left; font-size: 0.88rem;">
          <div style="margin-bottom: 0.4rem;"><strong>예약 번호:</strong> <span style="color: #0F382C; font-weight: 800;">${bookingCode}</span></div>
          <div style="margin-bottom: 0.4rem;"><strong>체크인 날짜:</strong> ${info.date}</div>
          <div style="margin-bottom: 0.4rem;"><strong>선택 코스:</strong> ${info.track === 'trackA' ? 'Track A (완벽한 사적 휴식)' : 'Track B (와인 살롱 연대)'}</div>
          <div><strong>예약 상품:</strong> ${info.item ? info.item.name : 'ONCE 프리미엄 1인 스테이'}</div>
        </div>

        <button class="btn-card-primary" id="btnBookingDone" style="width: 100%; padding: 0.9rem;">
          확인
        </button>
      </div>
    `;

    this.modalBackdrop.classList.add('open');
    document.getElementById('btnBookingDone').addEventListener('click', () => this.closeModal());
  }
}
