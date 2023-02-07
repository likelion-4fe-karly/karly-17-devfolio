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

    //로그인 기능
    const userName = localStorage.getItem('name');
    const signUpLink = document.querySelector('.sign_up_link');
    const blank = document.querySelector('.blank');
    const loginLink = document.querySelector('.login_link');
    const centerLink = document.querySelector('.center_link');

    if (localStorage.getItem('uid')) {
      signUpLink.style.display = 'none';
      blank.style.display = 'none';
      loginLink.style.display = 'none';
      centerLink.style.display = 'none';
      insertFirst(
        '.header_login ul',
        /* html */ `
              <li class="userName"><button>${userName}</button>님</li>  
              <li class="newbar" aria-hidden="true"></li>
              <li class="logout "><button>로그아웃</button></li>        
          `
      );
    }

    // 로그아웃 이벤트 핸들러
    const logoutPage = document.querySelector('.logout');

    function logoutPageHandler(e) {
      console.log('로그아웃 됩니다.');
      localStorage.removeItem('uid');
      localStorage.removeItem('name');
      const user = getNode('.userName');
      const bar = getNode('.newbar');
      const logout = getNode('.logout');
      user.remove();
      bar.remove();
      logout.remove();

      signUpLink.style.display = 'inline-block';
      blank.style.display = 'inline-block';
      loginLink.style.display = 'inline-block';
      centerLink.style.display = 'inline-block';
      window.location.reload();
    }

    logoutPage.addEventListener('click', logoutPageHandler);
  })
  .catch(() => {
    console.error('실패');
  });
