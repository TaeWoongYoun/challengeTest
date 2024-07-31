document.addEventListener('DOMContentLoaded', function() {
    // 모달 요소 가져오기
    var modal = document.getElementById('scheduleModal');
    var openModalBtn = document.getElementById('openModalBtn');
    var closeModalBtn = document.querySelector('.close');
    
    // 모달 열기 버튼 클릭 시 모달 표시
    openModalBtn.addEventListener('click', function() {
        modal.style.display = 'block';
    });
    
    // 모달 닫기 버튼 클릭 시 모달 숨기기
    closeModalBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // 모달 외부 클릭 시 모달 숨기기
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // 폼 제출 시 AJAX 요청 보내기
    var scheduleForm = document.getElementById('scheduleForm');
    scheduleForm.addEventListener('submit', function(event) {
        event.preventDefault(); // 폼의 기본 제출 동작을 막음
        
        var formData = new FormData(scheduleForm); // FormData 객체 생성
        var xhr = new XMLHttpRequest(); // 새로운 XMLHttpRequest 객체 생성
        xhr.open('POST', 'create_schedule.php', true); // 요청 초기화
        
        // 요청이 완료되었을 때 실행될 콜백 함수 설정
        xhr.onload = function() {
            if (xhr.status === 200) {
                alert(xhr.responseText); // 서버로부터의 응답을 사용자에게 알림
                modal.style.display = 'none'; // 모달 숨기기
            } else {
                alert('일정 생성 중 오류가 발생했습니다.'); // 오류 메시지 표시
            }
        };
        
        xhr.onerror = function() {
            alert('일정 생성 중 오류가 발생했습니다.'); // 네트워크 오류 메시지 표시
        };
        
        xhr.send(formData); // 폼 데이터 전송
    });
});
