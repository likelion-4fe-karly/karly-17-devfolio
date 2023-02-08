import { insertLast } from '/lib/dom/insert.js';

window.onload = function () {
  fetch('http://localhost:3000/banner')
    .then((res) => res.json())
    .then((json) => {
      let html = '';
      json.forEach((image) => {
        html += /* html */ `
        <div class="swiper-slide">
          <img src="${image.src}" alt="${image.alt}" />
        </div>
        `;
      });

      insertLast('.swiper-wrapper-banner', html);
    });

  const banner_swiper = new Swiper('.index_visual_swiper', {
    centeredSlides: true,
    loop: false,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
    },
    speed: 1000,
    parallax: true,
    a11y: {
      prevSlideMessage: '이전 슬라이드',
      nextSlideMessage: '다음 슬라이드',
      slideLabelMessage:
        '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.',
    },
    navigation: {
      prevEl: '.index_visual .swiper-button-prev',
      nextEl: '.index_visual .swiper-button-next',
    },
  });
};

/* global Swiper */
let swiperPrev = document.querySelector(
  '.index_recommend_product .swiper-button-prev'
);

/* 메인 배너 */
/* 이 상품 어때? */
const recommend_swiper = new Swiper('.index_recommend_product_swiper', {
  autoplay: false,
  loop: false,
  speed: 1000,
  parallax: true,
  a11y: {
    prevSlideMessage: '이전 슬라이드',
    nextSlideMessage: '다음 슬라이드',
    slideLabelMessage:
      '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.',
  },
  keyboard: {
    enabled: true,
  },
  navigation: {
    prevEl: '.swiper_cover .swiper-button-prev',
    nextEl: '.swiper_cover .swiper-button-next',
  },
  on: {
    activeIndexChange: function () {
      if (this.realIndex === 0) {
        swiperPrev.classList.add('swiper-button-disabled');
      } else {
        swiperPrev.classList.remove('swiper-button-disabled');
      }
    },
  },
});

// 이 상품 어때요
// TODO 비동기 통신 뿌리기
fetch('http://localhost:3000/products')
  .then((res) => res.json())
  .then((json) => {
    let swiperSlideHtml = '';
    let index = 0;

    while (
      index++ <
      Math.floor(json.length / 4) + Math.floor(json.length % 4)
    ) {
      swiperSlideHtml += /*html*/ `
      <div class="swiper-slide swiper-slide-recommend${index}">
        <ul>
        </ul>
      </div>
    `;
    }

    insertLast('.index_recommend_product_swiper_wrapper', swiperSlideHtml);

    let ulArray = JSON.parse(JSON.stringify(json));
    let liHtml = '';

    // 배열 나누는 함수
    const division = (array, number) => {
      const length = array.length;
      const divide =
        Math.floor(length / number) + (Math.floor(length % number) > 0 ? 1 : 0);
      const newArray = [];

      for (let i = 0; i < divide; i++) {
        newArray.push(array.splice(0, number));
      }
      return newArray;
    };

    let newArr = division(ulArray, 4);
    let slideIndex = 0;

    newArr.forEach((arr) => {
      arr.forEach((product) => {
        let saleRatio = product.saleRatio;
        let salePrice = product.salePrice;
        let price = product.price;

        // 할인 하지 않을 때,
        if (product.saleRatio === 0) {
          saleRatio = '';
          salePrice = price + '원';
          price = '';
        } else {
          saleRatio *= 100;
          saleRatio += '%';
          salePrice += '원';
          price += '원';
        }

        liHtml += /* html */ `
            <li>
              <a
                class="index_recommend_product_swiper_item"
                href="/pages/product_detail/product_detail.html"
              >
              <img
                src="/assets/${product.image.view}"
                alt="${product.image.alt}"
              />
              <p class="recommend_swiper_item_title">
                ${product.name}
              </p>
              <div class="recommend_swiper_item_discount">
                <p class="recommend_swiper_item_sale_ratio">${saleRatio}</p>
                <p class="recommend_swiper_item_sale_price">${salePrice}</p>
              </div>
              <p class="recommend_swiper_item_price">${price}</p>
              </a>
              <div class="recommend_swiper_item_cart" tabindex="0">
                <img
                  class="recommend_swiper_item_cart_image"
                  src="/assets/index/icon_cart.png"
                  alt="장바구니 버튼"
                />
              </div>
          </li>
        `;
      });
      slideIndex++;
      insertLast(`.swiper-slide-recommend${slideIndex} ul`, liHtml);
      liHtml = '';
    });
  });

/*  놓치면 후회할 가격 */
const regret_swiper = new Swiper('.index_regret_product_swiper', {
  autoplay: false,
  loop: false,
  speed: 1000,
  parallax: true,
  pagination: {},
  a11y: {
    prevSlideMessage: '이전 슬라이드',
    nextSlideMessage: '다음 슬라이드',
    slideLabelMessage:
      '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.',
  },
  navigation: {
    prevEl: '.swiper_regret_cover .swiper-button-prev',
    nextEl: '.swiper_regret_cover .swiper-button-next',
  },
  on: {
    activeIndexChange: function () {
      if (this.realIndex === 0) {
        swiperPrev.classList.add('swiper-button-disabled');
      } else {
        swiperPrev.classList.remove('swiper-button-disabled');
      }
    },
  },
});

// 놓치면 후회할 가격
// TODO 비동기 통신 뿌리기
fetch('http://localhost:3000/products')
  .then((res) => res.json())
  .then((json) => {
    let swiperSlideHtml = '';
    let index = 0;

    while (
      index++ <
      Math.floor(json.length / 4) + Math.floor(json.length % 4)
    ) {
      swiperSlideHtml += /*html*/ `
      <div class="swiper-slide swiper-slide-regret${index}">
        <ul>
        </ul>
      </div>
    `;
    }

    insertLast('.index_regret_product_swiper_wrapper', swiperSlideHtml);

    let ulArray = JSON.parse(JSON.stringify(json));
    let liHtml = '';

    // 배열 나누는 함수
    const division = (array, number) => {
      const length = array.length;
      const divide =
        Math.floor(length / number) + (Math.floor(length % number) > 0 ? 1 : 0);
      const newArray = [];

      for (let i = 0; i < divide; i++) {
        newArray.push(array.splice(0, number));
      }
      return newArray;
    };

    let newArr = division(ulArray, 4);
    let slideIndex = 0;

    newArr.forEach((arr) => {
      arr.forEach((product) => {
        let saleRatio = product.saleRatio;
        let salePrice = product.salePrice;
        let price = product.price;

        // 할인 하지 않을 때,
        if (product.saleRatio === 0) {
          saleRatio = '';
          salePrice = price + '원';
          price = '';
        } else {
          saleRatio *= 100;
          saleRatio += '%';
          salePrice += '원';
          price += '원';
        }

        liHtml += /* html */ `
            <li>
              <a
                class="index_regret_product_swiper_item"
                href="/pages/product_detail/product_detail.html"
              >
              <img
                src="/assets/${product.image.view}"
                alt="${product.image.alt}"
              />
              <p class="regret_swiper_item_title">
                ${product.name}
              </p>
              <div class="regret_swiper_item_discount">
                <p class="regret_swiper_item_sale_ratio">${saleRatio}</p>
                <p class="regret_swiper_item_sale_price">${salePrice}</p>
              </div>
              <p class="regret_swiper_item_price">${price}</p>
              </a>
              <button class="regret_swiper_item_cart" tabindex="0">
                <img
                  src="/assets/index/icon_cart.png"
                  alt="장바구니 버튼"
                />
              </button>
          </li>
        `;
      });
      slideIndex++;
      insertLast(`.swiper-slide-regret${slideIndex} ul`, liHtml);
      liHtml = '';
    });
  });

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
    now = now.getTime();
    // 현재 시각과 스토리지에 저장된 시각을 각각 비교하여
    // 시간이 남아 있으면 true, 아니면 false 리턴
    if (!localStorage.getItem(name)) return true;
    else return parseInt(localStorage.getItem(name)) < now;
  },
};

if (handleStorage.getStorage('today')) {
  popup.classList.add('off');
} else {
  popup.classList.remove('off');
}

const noTodayHandler = () => {
  handleStorage.setStorage('today', 1);

  popup.classList.remove('off');
};

const closeHandler = () => {
  popup.classList.remove('off');
};

neverWatch.addEventListener('click', noTodayHandler);
close.addEventListener('click', closeHandler);

// ! 장바구니 POP UP 영역
const cartPopUpContainer = document.querySelector('.cart_popup_container');
const cartButton = document.querySelectorAll('.regret_swiper_item_cart');

const cartHandler = () => {
  console.log('클릭');
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
