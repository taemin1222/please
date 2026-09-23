/**
 * 지도 서비스 모듈 (Leaflet 기반 & 무키 즉시 실행)
 */
class MapService {
  constructor(config) {
    this.config = config;
    this.map = null;
    this.markersLayer = null;
    this.markerMap = new Map(); // storeId -> marker instance
    this.onMarkerSelectCallback = null;
    this.onDetailClickCallback = null;
  }

  /**
   * 지도 초기화
   */
  init(containerId, onMarkerSelect, onDetailClick) {
    this.onMarkerSelectCallback = onMarkerSelect;
    this.onDetailClickCallback = onDetailClick;

    const { defaultCenter, defaultZoom, minZoom, maxZoom } = this.config.map;

    // Leaflet 맵 객체 생성
    this.map = L.map(containerId, {
      center: [defaultCenter.lat, defaultCenter.lng],
      zoom: defaultZoom,
      minZoom: minZoom,
      maxZoom: maxZoom,
      zoomControl: false // 커스텀 위치 컨트롤 배치
    });

    // 줌 컨트롤 우측 하단 배치
    L.control.zoom({ position: 'bottomright' }).addTo(this.map);

    // 고해상도 모던 타일 레이어 (CartoDB Positron: 밝고 깔끔한 도시 지도)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(this.map);

    // 마커들을 담을 레이어 그룹
    this.markersLayer = L.layerGroup().addTo(this.map);
  }

  /**
   * 카테고리별 커스텀 핀 아이콘 생성
   */
  createPinIcon(store) {
    const categoryMeta = this.config.categories.find(c => c.id === store.category) || {
      color: '#0F382C',
      icon: '📍'
    };

    const html = `
      <div class="custom-pin" data-store-id="${store.id}">
        <div class="pin-bubble" style="background-color: ${categoryMeta.color};">
          <span class="pin-icon">${categoryMeta.icon}</span>
        </div>
        <div class="pin-pulse"></div>
      </div>
    `;

    return L.divIcon({
      html: html,
      className: 'map-custom-marker-wrapper',
      iconSize: [38, 48],
      iconAnchor: [19, 48],
      popupAnchor: [0, -46]
    });
  }

  /**
   * 인포윈도우(팝업) HTML 생성
   */
  createPopupContent(store) {
    const categoryMeta = this.config.categories.find(c => c.id === store.category);
    const catColor = categoryMeta ? categoryMeta.color : '#0F382C';

    return `
      <div class="info-window-card">
        <div class="iw-image-wrap">
          <img src="${store.imageUrl}" alt="${store.name}" class="iw-img" onerror="this.src='https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80'" />
          <span class="iw-category-tag" style="background-color: ${catColor};">
            ${store.categoryName}
          </span>
        </div>
        <div class="iw-body">
          <div class="iw-title">${store.name}</div>
          <div class="iw-address">📍 ${store.gu} ${store.dong} · ${store.priceRange}</div>
          <button class="iw-btn" onclick="window.appStoreMap.openDetailModal(${store.id})">
            상세 정보 보기
          </button>
        </div>
      </div>
    `;
  }

  /**
   * 필터링된 상점 목록으로 마커 갱신
   */
  renderMarkers(stores) {
    this.markersLayer.clearLayers();
    this.markerMap.clear();

    if (!stores || stores.length === 0) return;

    const bounds = [];

    stores.forEach(store => {
      const icon = this.createPinIcon(store);
      const marker = L.marker([store.lat, store.lng], { icon: icon });

      // 팝업 바인딩
      const popupContent = this.createPopupContent(store);
      marker.bindPopup(popupContent, {
        closeButton: true,
        autoPan: true,
        autoPanPadding: [50, 50]
      });

      // 마커 클릭 시 사이드바 연동
      marker.on('click', () => {
        if (this.onMarkerSelectCallback) {
          this.onMarkerSelectCallback(store);
        }
      });

      marker.addTo(this.markersLayer);
      this.markerMap.set(store.id, marker);
      bounds.push([store.lat, store.lng]);
    });

    // 마커가 1개 이상이면 모든 마커가 보이도록 지도 영역 자동 피팅 (상점 2개 이상일 때)
    if (bounds.length > 1) {
      this.map.fitBounds(bounds, { padding: [60, 60], maxZoom: 15 });
    } else if (bounds.length === 1) {
      this.map.setView(bounds[0], 15);
    }
  }

  /**
   * 특정 상점에 포커스 및 팝업 열기
   */
  focusStore(store, openPopup = true) {
    if (!store) return;
    const marker = this.markerMap.get(store.id);

    this.map.flyTo([store.lat, store.lng], 16, {
      duration: 0.8,
      easeLinearity: 0.25
    });

    if (marker && openPopup) {
      setTimeout(() => {
        marker.openPopup();
      }, 400);
    }
  }

  /**
   * 기본 시점으로 복원
   */
  resetView() {
    const { defaultCenter, defaultZoom } = this.config.map;
    this.map.flyTo([defaultCenter.lat, defaultCenter.lng], defaultZoom, {
      duration: 0.8
    });
    this.map.closePopup();
  }
}
