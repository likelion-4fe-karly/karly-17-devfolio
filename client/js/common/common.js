import { includeIframeToHTML } from './../../lib/include/includeIframeToHTML.js';
import {
  getNode,
  insertFirst,
  insertLast,
  saveStorage,
} from './../../lib/index.js';

includeIframeToHTML()
  .then(() => {
    const productWrapper = document.querySelector('.recent_swiper_wrapper');
    const recommendProductItem = document.querySelectorAll(
      '.index_recommend_product_swiper_wrapper ul'
    );
    const regretProductItem = document.querySelectorAll(
      '.index_regret_product_swiper_wrapper ul'
    );

    let memoItem = JSON.parse(localStorage.getItem('item'));

    const productItemHandler = (event) => {
      const aElement = event.target.closest('a');

      const cartElement = event.target.closest('div');

      // 카트 팝업 노드
      const cartPopUpContainer = document.querySelector(
        '.cart_popup_container'
      );

      // 카트 버튼
      const cartButton = document.querySelectorAll('.regret_swiper_item_cart');

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

      cartButton.forEach((button) => {
        button.addEventListener('click', cartHandler);
      });

      cartPopUpContainer.addEventListener('click', cartContainerHandler);
      cartElement.addEventListener('click', cartHandler);

      if (!aElement) return;

      const aLink = aElement.href;
      const imgSrc = aElement.children[0].src;
      const imgAlt = aElement.children[0].alt;

      // 배열 앞에 넣기
      memoItem.unshift({ aLink, imgSrc, imgAlt });

      // 배열 내 객체 중복 제거
      memoItem = memoItem.reduce(function (acc, current) {
        if (acc.findIndex(({ imgAlt }) => imgAlt === current.imgAlt) === -1) {
          acc.push(current);
        }
        return acc;
      }, []);

      saveStorage('item', memoItem);

      let markUp = '';

      productWrapper.innerHTML = '';
      memoItem.forEach((item) => {
        markUp += /* html */ `
      <a href="${item.aLink}">
        <img src="${item.imgSrc}" alt="${item.imgAlt}" />
      </a>
      `;
      });
      insertLast('.recent_swiper_wrapper', markUp);
    };

    recommendProductItem.forEach((product) => {
      product.addEventListener('click', productItemHandler);
    });

    regretProductItem.forEach((product) => {
      product.addEventListener('click', productItemHandler);
    });

    return memoItem;
  })
  .then((memoItem) => {
    let currentMarkUp = '';
    memoItem.forEach((item) => {
      currentMarkUp += /* html */ `
    <a href="${item.aLink}">
      <img src="${item.imgSrc}" alt="${item.imgAlt}" />
    </a>
    `;
    });

    insertLast('.recent_swiper_wrapper', currentMarkUp);

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
    // console.error('실패');
  });
