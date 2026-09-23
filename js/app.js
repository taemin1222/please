/**
 * [App.js] StoreMap 메인 진입점
 * 순수 바닐라 자바스크립트로 모든 모듈을 조율합니다.
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. 서비스 초기화
  const filterService = new FilterService(STORE_DATA);
  const mapService = new MapService(APP_CONFIG);
  const uiService = new UiService(APP_CONFIG);

  // 팝업 내부 인라인 버튼에서 호출 가능하도록 전역 노출
  window.appStoreMap = {
    openDetailModal: (storeId) => {
      const store = STORE_DATA.find(s => s.id === storeId);
      if (store) {
        uiService.openDetailModal(store);
      }
    }
  };

  /**
   * 상태 변경 시 화면(지도 + 리스트 + 칩 카운트) 전체 동기화 렌더러
   */
  function refreshView(maintainMapBounds = false) {
    const filteredStores = filterService.getFilteredStores();
    const categoryCounts = filterService.getCategoryCounts();

    // 1. 카테고리 칩 갱신
    uiService.renderCategoryChips(
      filterService.filterState.category,
      categoryCounts,
      (newCategory) => {
        filterService.updateFilter({ category: newCategory });
        refreshView();
      }
    );

    // 2. 상점 카드 리스트 렌더링
    uiService.renderStoreList(
      filteredStores,
      // 카드 클릭 핸들러
      (store) => {
        mapService.focusStore(store, true);
      },
      // 상세보기 클릭 핸들러
      (store) => {
        uiService.openDetailModal(store);
      },
      // 빈 상태에서 초기화 클릭 핸들러
      () => {
        resetAllFilters();
      }
    );

    // 3. 지도 마커 갱신
    mapService.renderMarkers(filteredStores);
  }

  /**
   * 모든 필터 및 검색어 초기화
   */
  function resetAllFilters() {
    filterService.resetFilters();
    uiService.elements.searchInput.value = '';
    uiService.elements.searchClearBtn.classList.remove('visible');
    uiService.elements.guSelect.value = 'all';
    uiService.elements.sortSelect.value = 'rating';
    refreshView();
    mapService.resetView();
  }

  // 2. 지도 초기화
  mapService.init(
    'map',
    // 지도 마커 클릭 시 리스트 하이라이트
    (selectedStore) => {
      uiService.selectCard(selectedStore.id);
    },
    // 지도 상세 클릭
    (selectedStore) => {
      uiService.openDetailModal(selectedStore);
    }
  );

  // 3. 구(Gu) 드롭다운 초기화
  const availableGus = filterService.getAvailableGus();
  uiService.initGuSelect(availableGus, 'all', (selectedGu) => {
    filterService.updateFilter({ gu: selectedGu });
    refreshView();
  });

  // 4. 정렬 셀렉트 이벤트 바인딩
  uiService.elements.sortSelect.addEventListener('change', (e) => {
    filterService.updateFilter({ sortBy: e.target.value });
    refreshView();
  });

  // 5. 검색창 실시간 입력 디바운스 바인딩
  let searchDebounceTimer = null;
  uiService.elements.searchInput.addEventListener('input', (e) => {
    const val = e.target.value;
    if (val.trim()) {
      uiService.elements.searchClearBtn.classList.add('visible');
    } else {
      uiService.elements.searchClearBtn.classList.remove('visible');
    }

    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(() => {
      filterService.updateFilter({ keyword: val });
      refreshView();
    }, 200);
  });

  // 검색어 삭제(X) 버튼
  uiService.elements.searchClearBtn.addEventListener('click', () => {
    uiService.elements.searchInput.value = '';
    uiService.elements.searchClearBtn.classList.remove('visible');
    filterService.updateFilter({ keyword: '' });
    refreshView();
    uiService.elements.searchInput.focus();
  });

  // 6. 플로팅 지도 컨트롤 바인딩
  const btnResetView = document.getElementById('btnResetView');
  if (btnResetView) {
    btnResetView.addEventListener('click', () => {
      mapService.resetView();
    });
  }

  const btnLocateMe = document.getElementById('btnLocateMe');
  if (btnLocateMe) {
    btnLocateMe.addEventListener('click', () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            mapService.map.flyTo([latitude, longitude], 15);
          },
          (err) => {
            alert('현재 위치 정보를 가져올 수 없습니다. 위치 권한을 확인해주세요.');
          }
        );
      } else {
        alert('이 브라우저는 위치 서비스를 지원하지 않습니다.');
      }
    });
  }

  // 7. 모달 오버레이 바깥 클릭 및 ESC 키 처리
  uiService.elements.modalOverlay.addEventListener('click', (e) => {
    if (e.target === uiService.elements.modalOverlay) {
      uiService.closeDetailModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      uiService.closeDetailModal();
    }
  });

  // 8. 첫 뷰 렌더링
  refreshView();
});
