const idInputTag = document.querySelector('.id_form_tag');
const passwordInputTag = document.querySelector('.password_form_tag');
const loginButton = document.querySelector('.login_button');

function LoginIdHandler(e) {
  idInputTag.setAttribute('value', idInputTag.value);
}

idInputTag.addEventListener('keyup', LoginIdHandler);

function LoginPasswordHandler() {
  passwordInputTag.setAttribute('value', passwordInputTag.value);
}
passwordInputTag.addEventListener('keyup', LoginPasswordHandler);

function LoginButtonHandler(e) {
  fetch('http://localhost:3000/user')
    //이부분이 promise 형태다 그럼 then이나 async await로 처리

    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        console.log(passwordInputTag.value);

        if (
          passwordInputTag.value == Object.values(data[i])[1] &&
          idInputTag.value == Object.values(data[i])[0]
        ) {
          console.log(Object.values(data[i])[3]);
          localStorage.setItem('uid', Object.values(data[i])[3]);
          alert('합격입니다.');
          return;
        } else {
          continue;
        }
      }
      idInputTag.value = null;
      passwordInputTag.value = null;
      return;
    });
}

loginButton.addEventListener('click', LoginButtonHandler);
