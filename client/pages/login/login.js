const {
  localStorage: storage,
  JSON: { stringify: serialize, parse: deserialize },
} = globalThis;

// storage.setItem('isLogin', true)
storage.setItem('userId', 'like');
storage.setItem('userPwd', 'lion');
storage.setItem('userName', '멋사4기');

const formContainer = document.querySelector('.form_container');

const Handler = (e) => {
  const button = e.target.closest('button');

  if (!button) return;

  if (button.classList.contains('login_button')) {
    const userId = document.querySelector('.id_form_tag');
    const userPwd = document.querySelector('.password_form_tag');

    if (
      storage.getItem('userId') === userId.value &&
      storage.getItem('userPwd') === userPwd.value
    ) {
      storage.setItem('isLogin', true);

      window.location = '../../../index.html';
    } else {
      alert('아이디 또는 비밀번호가 틀립니다.');
    }
  }
};

formContainer.addEventListener('click', Handler);
