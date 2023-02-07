import { generateRandomString } from './randomString.js';

generateRandomString;

const id = document.getElementById('id');
const password = document.getElementById('pw');
const checkPw = document.getElementById('confirmpw');
const name = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const confirmButton = document.querySelector('.confirm_check');
const emailConfirmButton = document.querySelector('.email_confirm_check');
const signupButton = document.querySelector('.signup_btn');
const Congratulations = document.querySelector('.congratulations');

//정규표현식 비밀번호 영문자 + 숫자 (5~17자리 입력 )
const pwdCheck = /^[a-zA-Z0-9]{5,17}$/g;
//오직 영어만!!  = true
const onlyEn = /^[a-zA-Z]*$/;
//영어랑 숫자
const numberAndEn = /^[a-zA-Z0-9]*$/;
//숫자만
const phonenumber = /^[0-9]+$/;
//한글
const korean = /^[ㄱ-ㅎ|가-힣]+$/;
//숫자 한글
const koreaAndNumber = /^[ㄱ-ㅎ|가-힣0-9]+$/;
//영어 한글 영어를 쓸수가 없는 에러
const EnAndkorean = /^[a-z|A-Z|ㄱ-ㅎ|가-힣|]+$/;

//키보드를 한번에 빨리치면 안먹는다.
function idHandler(e) {
  const errorID = document.querySelector('.error_id');

  //id.value = target;
  id.setAttribute('value', id.value);
  console.log(id.value);
  //console.log(numberAndEn.test(id.value));

  if (
    (id.value.length > 0 && id.value.length < 6) ||
    phonenumber.test(id.value) ||
    korean.test(id.value) ||
    koreaAndNumber.test(id.value) ||
    EnAndkorean.test(id.value)
  ) {
    errorID.style.display = 'inline';
  } else if (id.value.length == 0) {
    errorID.style.display = 'inline';
  } else if (numberAndEn.test(id.value) || onlyEn.test(id.value)) {
    errorID.style.display = 'none';
  } else {
    errorID.style.display = 'none';
  }
}

id.addEventListener('keyup', idHandler);

function checkHandler(e) {
  fetch('http://localhost:3000/user')
    //이부분이 promise 형태다 그럼 then이나 async await로 처리

    .then((response) => response.json())
    .then((data) => {
      const filterData = data.filter(
        //객체 1개씩
        (obj) => obj.id === id.value
      );
      console.log(filterData);
      //console.log(id.value);
      if (filterData.length == 1) {
        alert('이미 추가되어있는 아이디입니다.');
        id.value = null;
      } else if (id.value == '') {
        alert('6자 이상 16자 이하 영문 혹은 영문과 숫자를 조합하세요');
      } else if (
        phonenumber.test(id.value) ||
        korean.test(id.value) ||
        (id.value.length > 0 && id.value.length < 6) ||
        koreaAndNumber.test(id.value) ||
        EnAndkorean.test(id.value)
      ) {
        alert('양식에 맞지 않아요!!!!');
        id.value = null;
      } else {
        alert('사용가능한 ID입니다.');
        confirmButton.style.color = 'rgb(221, 221, 221)';
        confirmButton.style.border = ' 1px solid rgb(221, 221, 221)';
        confirmButton.setAttribute('disabled', '');
        id.setAttribute('disabled', '');
      }
    });
}

confirmButton.addEventListener('click', checkHandler);

function pwHandler(e) {
  const errorPw = document.querySelector('.error_pw');
  const noneErrorPw = document.querySelector('.none_error_pw');
  const target = e.target.value;
  console.log(password.value);

  if (target.length > 0 && target.length < 10) {
    noneErrorPw.style.display = 'none';
    errorPw.style.display = 'inline';
  } else if (target.length == 0) {
    errorPw.style.display = 'none';
    noneErrorPw.style.display = 'inline';
  } else {
    errorPw.style.display = 'none';
  }
}
password.addEventListener('keyup', pwHandler);

function pwConfirmHandler(e) {
  const error_confirm_pw = document.querySelector('.error_confirm_pw');
  const none_error_confirm_pw = document.querySelector(
    '.none_error_confirm_pw'
  );
  const asd = e.target.value;
  console.log(asd);

  if (password.value !== checkPw.value) {
    none_error_confirm_pw.style.display = 'none';
    error_confirm_pw.style.display = 'inline';
  } else if (asd.length == 0) {
    error_confirm_pw.style.display = 'none';
    none_error_confirm_pw.style.display = 'inline';
  } else {
    error_confirm_pw.style.display = 'none';
  }
}
checkPw.addEventListener('keyup', pwConfirmHandler);

function nameHandler(e) {
  const ErrorName = document.querySelector('.error_name');
  const target = e.target.value;

  if (target.length == 0) {
    ErrorName.style.display = 'inline';
  } else {
    ErrorName.style.display = 'none';
  }
}
name.addEventListener('keyup', nameHandler);

function emailHandler(e) {
  const ErrorEmail = document.querySelector('.error_email');
  const NoneErrorEmail = document.querySelector('.error_none_email');

  console.log(email.value);

  if (email.value.includes('.c')) {
    ErrorEmail.style.display = 'none';
    NoneErrorEmail.style.display = 'none';
  } else if (email.value.length == 0) {
    ErrorEmail.style.display = 'none';
    NoneErrorEmail.style.display = 'inline';
  } else {
    NoneErrorEmail.style.display = 'none';
    ErrorEmail.style.display = 'inline';
  }
}
email.addEventListener('keyup', emailHandler);

function EmailCheckHandler(e) {
  fetch('http://localhost:3000/user')
    //이부분이 promise 형태다 그럼 then이나 async await로 처리

    .then((response) => response.json())
    .then((data) => {
      const filterData = data.filter(
        //객체 1개씩
        (obj) => obj.email == email.value
      );
      if (filterData.length == 1) {
        alert('이미 추가되어있는 이메일입니다.');
        email.value = null;
      } else if (email.value.length == 0) {
        alert('이메일을 적어주세요.');
      } else if (email.value.includes('.com') == false) {
        alert('이메일 형식으로 입력해주세요.');
        email.value = null;
      } else {
        alert('사용가능한 이메일 입니다.');
        emailConfirmButton.style.color = 'rgb(221, 221, 221)';
        emailConfirmButton.style.border = ' 1px solid rgb(221, 221, 221)';
        emailConfirmButton.setAttribute('disabled', '');
        email.setAttribute('disabled', '');
      }
    });
}

emailConfirmButton.addEventListener('click', EmailCheckHandler);

function phoneHandler(e) {
  const errorPhone = document.querySelector('.error_phone');
  const regexp = /[^0-9]/gi;
  phone.value = phone.value.replace(regexp, '');

  if (phone.value.length == 0) {
    errorPhone.style.display = 'inline';
  } else if (phonenumber.test(phone.value) == true) {
    errorPhone.style.display = 'none';
  }
}
phone.addEventListener('keyup', phoneHandler);

//버튼 클릭 시 로컬 스토리지 저장
function signupHandler(e) {
  e.preventDefault();
  const currentUid = generateRandomString(10);

  fetch('http://localhost:3000/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: id.value,
      password: password.value,
      email: email.value,
      uid: currentUid,
      name: name.value,
    }),
  })
    .then((response) => console.log(response.json()))
    .then((data) => console.log(data));
  window.location = '../../index.html';
}

Congratulations.addEventListener('click', signupHandler);

const signupContairer = document.querySelector('.signup_wrapper');
function joinHandler() {
  if (id.value && password.value && name.value && email.value && phone.value) {
    Congratulations.style.color = 'var(--primary)';
    Congratulations.style.cursor = 'pointer';
    Congratulations.style.border = ' 1px solid var(--primary)';
    Congratulations.removeAttribute('disabled', 'disabled');
    Congratulations.setAttribute('abled', 'abled');
  } else if (
    id.value == '' ||
    password.value !== checkPw.value ||
    password.value == 0 ||
    name.value == '' ||
    email.value == '' ||
    phone.value == ''
  ) {
    Congratulations.removeAttribute('style');
    Congratulations.style.color = 'rgb(221, 221, 221)';
    Congratulations.style.border = ' 1px solid rgb(221, 221, 221)';
    Congratulations.removeAttribute('abled', 'abled');
    Congratulations.setAttribute('disabled', 'disabled');
  }
}

signupContairer.addEventListener('keyup', joinHandler);

const agreeCheckAll = document.querySelector('input[name=all_agree]');
let agreeCheck = document.querySelectorAll('input[name=agree]');

agreeCheckAll.addEventListener('click', (e) => {
  agreeCheckAll.classList.toggle('active');

  agreeCheck.forEach((check) => {
    if (agreeCheckAll.classList.contains('active')) {
      check.setAttribute('checked', true);
    } else {
      check.setAttribute('checked', false);
    }
    check.checked = e.target.checked;
  });
});

agreeCheck.forEach((node) => {
  node.addEventListener('click', () => {
    node.classList.toggle('on');
    if (node.classList.contains('on')) {
      node.setAttribute('checked', true);
      if (
        agreeCheck[0].checked &&
        agreeCheck[1].checked &&
        agreeCheck[2].checked &&
        agreeCheck[3].checked
      ) {
        agreeCheckAll.checked = true;
      }
    } else {
      node.setAttribute('checked', false);
      if (
        !agreeCheck[0].checked ||
        !agreeCheck[1].checked ||
        !agreeCheck[2].checked ||
        !agreeCheck[3].checked
      ) {
        agreeCheckAll.checked = false;
      }
    }
  });
});
