import { includeIframeToHTML } from './../../lib/include/includeIframeToHTML.js';
import { getNode, insertFirst } from './../../lib/index.js';

includeIframeToHTML()
  .then(() => {
    // 카테고리 이벤트 핸들러
    const body = document.querySelector('body');
    const bodyHandler = (e) => {
      const category = e.target.closest('button');
      const subCategory = document.querySelector('.category_menu');
      if (!category || !category.classList.contains('nav_category_button')) {
        subCategory.style.display = 'none';
        return;
      }
      subCategory.style.display = 'block';
    };

    body.addEventListener('click', bodyHandler);

    // 로그인 버튼 이벤트 핸들러
    const userName = localStorage.getItem('userName');
    const signUpLink = document.querySelector('.sign_up_link');
    const blank = document.querySelector('.blank');
    const loginLink = document.querySelector('.login_link');

    if (localStorage.getItem('isLogin') === 'true') {
      signUpLink.style.display = 'none';
      blank.style.display = 'none';
      loginLink.style.display = 'none';
      insertFirst(
        '.header_login ul',
        /* html */ `
              <li class="userName"><button>${userName}</button>님</li>  
              <li class="newbar" aria-hidden="true"></li>      
          `
      );
    }

    // 로그아웃 이벤트 핸들러
    const logOut = document.querySelector('.userName button');

    const logOutHandler = () => {
      localStorage.setItem('isLogin', false);
      const user = getNode('.userName');
      const bar = getNode('.newbar');
      user.remove();
      bar.remove();

      signUpLink.style.display = 'inline-block';
      blank.style.display = 'inline-block';
      loginLink.style.display = 'inline-block';
    };

    logOut.addEventListener('click', logOutHandler);
  })
  .catch(() => {
    console.error('실패');
  });
