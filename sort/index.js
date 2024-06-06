$(document).ready(function () {
    const selectedFestivals = []; // 선택된 축제 요소를 저장하는 배열

    // 축제 요소 클릭 이벤트 핸들러
    $('.festivals').on('click', function () {
        const $this = $(this); // 현재 클릭된 축제 요소를 jQuery 객체로 저장
        if ($this.hasClass('selected')) {
            // 선택 해제
            $this.removeClass('selected'); // 선택 상태 클래스 제거
            selectedFestivals.splice(selectedFestivals.indexOf($this), 1); // 선택된 요소 배열에서 제거
        } else {
            // 선택
            $this.addClass('selected'); // 선택 상태 클래스 추가
            selectedFestivals.push($this); // 선택된 요소를 배열에 추가
        }
        updateOrder(); // 선택된 요소의 순서를 업데이트
    });

    // 드래그 앤 드롭 이벤트 핸들러
    $('.festivals').on('dragstart', function (e) {
        $(this).addClass('dragging'); // 드래그 시작 시 'dragging' 클래스 추가
    }).on('dragover', function (e) {
        e.preventDefault(); // 기본 드래그 동작 방지
    }).on('drop', function (e) {
        e.preventDefault(); // 기본 드롭 동작 방지
        const $draggedItem = $('.dragging').removeClass('dragging'); // 드래그된 항목을 찾아서 'dragging' 클래스 제거
        const $this = $(this); // 현재 드롭된 축제 요소를 jQuery 객체로 저장
        if ($this.is($draggedItem)) return; // 드래그된 요소와 드롭된 요소가 같으면 함수 종료

        const bounding = $this[0].getBoundingClientRect(); // 드롭된 요소의 경계 상자 정보 가져오기
        const offset = bounding.y + (bounding.height / 2); // 요소의 중심 좌표 계산

        if (e.originalEvent.clientY > offset) {
            $draggedItem.insertAfter($this); // 드래그된 요소가 드롭된 요소 아래에 들어갈 경우
        } else {
            $draggedItem.insertBefore($this); // 드래그된 요소가 드롭된 요소 위에 들어갈 경우
        }

        updateOrder(); // 선택된 요소의 순서를 업데이트
    }).on('dragend', function () {
        $(this).removeClass('dragging'); // 드래그 종료 시 'dragging' 클래스 제거
    });

    // 선택된 요소의 순서를 업데이트하는 함수
    function updateOrder() {
        selectedFestivals.forEach(($festival, index) => {
            $festival.attr('data-order', index + 1); // 선택된 요소의 순서를 업데이트
        });
    }
});
