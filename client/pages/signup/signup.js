// function checkSignup() {
const id = document.getElementById('id');
const password = document.getElementById('pw');
const checkPw = document.getElementById('confirmpw');
const name = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');

//정규표현식 비밀번호 영문자 + 숫자 + 특수문자 조합(3~20자리 입력 )
const pwdCheck = /^[a-z]+[a-z0-9]{5,17}$/g;
const onlyEn = /^[a-z|A-Z]+$/;
const numberAndEn = /^[a-z|A-Z|0-9|]+$/;

//키보드를 한번에 빨리치면 안먹는다.
function idHandler(e) {
  const target = e.target.value;
  console.log(target);
  const idContainer = document.getElementsByClassName('id_write');

  if (target.length == 5) {
    let newErrorTitle =
      '<div class = "error_id">6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합하세요.</div>';
    idContainer[0].insertAdjacentHTML('afterend', newErrorTitle);
    document.getElementsByClassName('error_id')[0].style.cssText =
      'font-size : 13px; color: rgb(240, 63, 64); margin-top: -4px; display: flex; margin-left: 149px; padding: 0 0 10px 0';
  } //영어 소문자 이거나 숫자 + 소문자
  else if (
    (target.length == 6 && numberAndEn.test(target) == true) ||
    (target.length == 6 && onlyEn.test(target) == true)
  ) {
    const removeErrorMg = document.querySelector('.error_id');
    removeErrorMg.remove();
  }
}
id.addEventListener('keyup', idHandler);

function pwHandler(e) {
  const pwContainer = document.getElementsByClassName('password_write');

  if (e.target.value === 'a') {
    let newErrorTitle =
      '<div class = "error_pw">최소 10자 이상 입력해주세요.</div>';
    pwContainer[0].insertAdjacentHTML('afterend', newErrorTitle);
    document.getElementsByClassName('error_pw')[0].style.cssText =
      'font-size : 13px; color: rgb(240, 63, 64); margin-top: -4px; display: flex; margin-left: 149px; padding: 0 0 10px 0';
  }
}
password.addEventListener('input', pwHandler);

function pwConfirmHandler(e) {
  const pwConfirmContainer =
    document.getElementsByClassName('password_confirm');

  if (e.target.value != 'a') {
    let newErrorTitle =
      '<div class = "error_confirm_pw">동일한 비밀번호를 입력해주세요.</div>';
    pwConfirmContainer[0].insertAdjacentHTML('afterend', newErrorTitle);
    document.getElementsByClassName('error_confirm_pw')[0].style.cssText =
      'font-size : 13px; color: rgb(240, 63, 64); margin-top: -4px; display: flex; margin-left: 149px; padding: 0 0 10px 0';
  }
}
checkPw.addEventListener('input', pwConfirmHandler);

function nameHandler(e) {
  const nameContainer = document.getElementsByClassName('name_container');

  if (e.target.value == '') {
    let newErrorTitle = '<div class = "error_name">이름을 입력해 주세요.</div>';
    nameContainer[0].insertAdjacentHTML('afterend', newErrorTitle);
    document.getElementsByClassName('error_name')[0].style.cssText =
      'font-size : 13px; color: rgb(240, 63, 64); margin-top: -4px; display: flex; margin-left: 149px; padding: 0 0 10px 0';
  }
}
name.addEventListener('input', nameHandler);

function emailHandler(e) {
  const emailContainer = document.getElementsByClassName('email_container');

  if (e.target.value === 'a') {
    let newErrorTitle =
      '<div class = "error_email">이메일 형식으로 입력해주세요.</div>';
    emailContainer[0].insertAdjacentHTML('afterend', newErrorTitle);
    document.getElementsByClassName('error_email')[0].style.cssText =
      'font-size : 13px; color: rgb(240, 63, 64); margin-top: -4px; display: flex; margin-left: 149px; padding: 0 0 10px 0';
  } else if (e.target.value === '') {
    let newErrorTitle =
      '<div class = "none_email_error">이메일을 입력해 주세요.</div>';
    emailContainer[0].insertAdjacentHTML('afterend', newErrorTitle);
    document.getElementsByClassName('none_email_error')[0].style.cssText =
      'font-size : 13px; color: rgb(240, 63, 64); margin-top: -4px; display: flex; margin-left: 149px; padding: 0 0 10px 0';
  }
}
email.addEventListener('input', emailHandler);

//숫자만 입력 숫자 외는 경고문 ,  다 지워도 경고문
function phoneHandler(e) {
  const phoneContainer = document.getElementsByClassName('phone_container');

  if (e.target.value === 'a') {
    let newErrorTitle =
      '<div class = "phone_error">휴대폰 번호를 입력해 주세요.</div>';
    phoneContainer[0].insertAdjacentHTML('afterend', newErrorTitle);
    document.getElementsByClassName('phone_error')[0].style.cssText =
      'font-size : 13px; color: rgb(240, 63, 64); margin-top: -4px; display: flex; margin-left: 149px; padding: 0 0 10px 0';
  } else if (e.target.value === '') {
    let newErrorTitle =
      '<div class = "phone_none_error">휴대폰 번호를 입력해 주세요.</div>';
    phoneContainer[0].insertAdjacentHTML('afterend', newErrorTitle);
    document.getElementsByClassName('phone_none_error')[0].style.cssText =
      'font-size : 13px; color: rgb(240, 63, 64); margin-top: -4px; display: flex; margin-left: 149px; padding: 0 0 10px 0';
  }
}
phone.addEventListener('input', phoneHandler);
