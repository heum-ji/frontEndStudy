$(function () {
  const PRIVACY = 0; // 약관확인
  const SIGNUP = 1; // 회원가입

  // 텝 콘텐츠 버튼 불러오기
  var tabs = $(".tab");
  var tabContents = $(".tab-content");
  var step = $(".button");

  // 필수 약관 체크
  step.eq(PRIVACY).on("click", function () {
    if ($("#requirePrivacy").is(":checked")) { // 필수항목 체크 
      moveTab(PRIVACY, SIGNUP);
    } else { // 필수 항목 체크 실패
      alert("이용약관 동의를 체크해주세요");
    }
  });

  // 이용약관 전체 체크 기능
  $("#allCheck").on("click", function () {
    $("[name=agree]").prop("checked", $(this).is(":checked"));
  });

  // 상단 텝 이동 효과
  function moveTab(prevStep, nextStep) {
    // tab css 수정
    tabs.eq(prevStep).css({ "border-bottom": "1px solid black", "border-top": "10px solid transparent", "font-weight": "normal" });
    tabs.eq(nextStep).css({ "border-bottom": "none", "border-top": "10px solid black", "font-weight": "bold" });
    // tab-content 내용 변경
    tabContents.eq(prevStep).css("display", "none");
    tabContents.eq(nextStep).css("display", "block");
  }

  // 회원 가입 시
  $("input[type=submit]").on("click", function () {
    var inputs = $(".signUp input"); // 입력 창
    var comments = $(".comment"); // 확인 코멘트
    var check = false;  // 유효성 체크용

    // 화면 리셋
    inputs.css("border", "");
    comments.html("");

    // 아이디 검사
    var idReg = /^[a-zA-Z0-9]{2,10}$/;
    console.log(inputs.eq(0).val());

    if (!idReg.test(inputs.eq(0).val())) {
      comments.eq(0).html("영문자, 숫자로 2 ~ 10글자");
      inputs.eq(0).css("border", "2px solid mediumvioletred");
      check = true;
    }
    // 비밀번호
    var pwReg = /^[a-zA-Z0-9]{4,8}$/;

    if (!pwReg.test(inputs.eq(1).val())) {
      comments.eq(1).html("영문자, 숫자로 4 ~ 8글자");
      inputs.eq(1).css("border", "2px solid mediumvioletred");
      check = true;
    }
    // 비밀번호 확인
    if (inputs.eq(1).val() != inputs.eq(2).val()) {
      comments.eq(2).html("비밀번호가 일치하지 않습니다.");
      inputs.eq(2).css("border", "2px solid mediumvioletred");
      check = true;
    }
    // 이메일
    var emailReg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    if (!emailReg.test(inputs.eq(3).val())) {
      comments.eq(3).html("이메일을 확인해주세요.");
      inputs.eq(3).css("border", "2px solid mediumvioletred");
      check = true;
    }
    // 주소
    var addrReg = /^[a-zA-z]+$/;

    if (inputs.eq(4).val() == "" || addrReg.test(inputs.eq(4).val())) {
      comments.eq(4).html("영어 및 공백이 불가능합니다.");
      inputs.eq(4).css("border", "2px solid mediumvioletred");
      check = true;
    }

    // 유효성 확인
    if (check) {
      event.preventDefault(); // 기본 이벤트 제거 메서드
    }
  });

});