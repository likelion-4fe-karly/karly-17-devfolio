
const idInputTag = document.querySelector('.id_form_tag');
const passwordInputTag = document.querySelector('.password_form_tag');
const loginButton = document.querySelector('.login_button');

function LoginIdHandler() {
  idInputTag.setAttribute('value', idInputTag.value);
}

idInputTag.addEventListener('keyup', LoginIdHandler);

function LoginPasswordHandler() {
  passwordInputTag.setAttribute('value', passwordInputTag.value);
}
passwordInputTag.addEventListener('keyup', LoginPasswordHandler);

function LoginButtonHandler(e) {
  e.preventDefault();
  fetch('http://localhost:3000/user')
    //이부분이 promise 형태다 그럼 then이나 async await로 처리

    .then((response) => response.json())
    .then((data) => {
      const filterData = data.filter(
        //객체 1개씩
        (obj) =>
          obj.id === idInputTag.value && obj.password === passwordInputTag.value
      );
      console.log(filterData);

      if (filterData.length === 0) {
        alert('일치하지 않습니다.');
        idInputTag.value = null;
        passwordInputTag.value = null;
        return;
      }

      successLogin(filterData);
    });
}

const successLogin = (filterData) => {
  console.log(filterData);
  console.log(filterData[0].uid);
  localStorage.setItem('uid', JSON.stringify(filterData[0].uid));
  localStorage.setItem('name', filterData[0].name);
  alert('환영합니다.');

  window.location = '../../index.html';
};

loginButton.addEventListener('click', LoginButtonHandler);
