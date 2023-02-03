import { includeIframeToHTML } from './../../lib/include/includeIframeToHTML.js';
import { getNode, insertFirst } from './../../lib/index.js';

includeIframeToHTML()
  .then(() => {
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

    // ! 뷰티 플랫폼 POP UP 영역
    const popup = document.querySelector('.beauty_popup');
    const neverWatch = document.querySelector('.beauty_popup_never_watch');
    const close = document.querySelector('.beauty_popup_close');

    /* 스토리지 제어 함수 정의 */
    var handleStorage = {
      // 스토리지에 데이터 쓰기(이름, 만료일)
      setStorage: function (name, exp) {
        // 만료 시간 구하기(exp를 ms단위로 변경)
        var date = new Date();
        date = date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);

        // 로컬 스토리지에 저장하기
        // (값을 따로 저장하지 않고 만료 시간을 저장)
        localStorage.setItem(name, date);
      },
      // 스토리지 읽어오기
      getStorage: function (name) {
        var now = new Date();
        now = now.setTime(now.getTime());
        // 현재 시각과 스토리지에 저장된 시각을 각각 비교하여
        // 시간이 남아 있으면 true, 아니면 false 리턴
        return parseInt(localStorage.getItem(name)) > now;
      },
    };

    if (handleStorage.getStorage('today')) {
      popup.classList.add('off');
    } else {
      popup.classList.remove('off');
    }

    const noTodayHandler = () => {
      handleStorage.setStorage('today', 1);

      popup.classList.add('off');
    };

    const closeHandler = () => {
      popup.classList.add('off');
    };

    neverWatch.addEventListener('click', noTodayHandler);
    close.addEventListener('click', closeHandler);

    // ! 장바구니 POP UP 영역
    const cartPopUpContainer = document.querySelector('.cart_popup_container');
    const cartButton = document.querySelector('.cart_button');

    const cartHandler = () => {
      cartPopUpContainer.classList.add('on');
    };

    const cartContainerHandler = (e) => {
      const button = e.target.closest('button');

      if (!button) return;

      if (button.classList.contains('cart_popup_cancel')) {
        cartPopUpContainer.classList.remove('on');
      }

      if (button.classList.contains('cart_popup_save')) {
        cartPopUpContainer.classList.remove('on');
      }
    };

    cartButton.addEventListener('click', cartHandler);
    cartPopUpContainer.addEventListener('click', cartContainerHandler);
  })
  .catch(() => {
    console.error('실패');
  });
