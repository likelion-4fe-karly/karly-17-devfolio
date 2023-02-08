import { insertLast, insertFirst } from '/lib/dom/insert.js';

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
    const mainRendering = (area) => {
      let swiperSlideHtml = '';
      let index = 0;

      while (
        index++ <
        Math.floor(json.length / 4) + Math.floor(json.length % 4)
      ) {
        swiperSlideHtml += /*html*/ `
      <div class="swiper-slide swiper-slide-${area}${index}">
        <ul>
        </ul>
      </div>
    `;
      }

      insertLast(`.index_${area}_product_swiper_wrapper`, swiperSlideHtml);

      let ulArray = JSON.parse(JSON.stringify(json));
      let liHtml = '';

      // 배열 나누는 함수
      const division = (array, number) => {
        const length = array.length;
        const divide =
          Math.floor(length / number) +
          (Math.floor(length % number) > 0 ? 1 : 0);
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
            salePrice = price;
          } else {
            saleRatio *= 100;
          }

          liHtml += /* html */ `
            <li>
              <a id=${product.id}
                class="index_${area}_product_swiper_item"
                href="/pages/product_detail/product_detail.html"
              >
              <img
                src="/assets/${product.image.view}"
                alt="${product.image.alt}"
              />
              <p class="${area}_swiper_item_title">
                ${product.name}
              </p>
              <div class="${area}_swiper_item_discount">
              ${
                saleRatio === 0
                  ? ``
                  : `<p class="${area}_swiper_item_sale_ratio">${saleRatio}%</p>`
              }
                <p class="${area}_swiper_item_sale_price">${salePrice}원</p>
              </div>
              ${
                saleRatio === 0
                  ? ``
                  : `
                <p class="${area}_swiper_item_price">${price}원</p>
                `
              }
              </a>
              <button class="swiper_item_cart_button ${area}_swiper_item_cart" tabindex="0">
                <img
                  class="${area}_swiper_item_cart_image"
                  src="/assets/index/icon_cart.png"
                  alt="장바구니 버튼"
                />
              </button>
          </li>
        `;
        });
        slideIndex++;
        insertLast(`.swiper-slide-${area}${slideIndex} ul`, liHtml);
        liHtml = '';
      });
    };

    mainRendering('recommend'); // 이 상품 어때요?
    mainRendering('regret'); // 놓치면 후회할 가격

    // ! 이 상품 어때요 영역의 장바구니 버튼 이벤트
    const cartPopUpContainer = document.querySelector('.cart_popup_container');
    const cartButton = document.querySelectorAll('.swiper_item_cart_button');

    // 장바구니 버튼 클릭 했을 때
    const cartHandler = (event) => {
      const button = event.target.closest('button');
      const productInfoElement = button.previousElementSibling;

      json.forEach((product) => {
        if (product.id === productInfoElement.id) {
          let cartMarkUp = '';

          cartPopUpContainer.firstElementChild.innerHTML = '';
          cartMarkUp += /* html */ `
            <div class="cart_popup_info">
              <span>${product.name}</span>
              <div class="cart_popup_price_of_count">
                <span>${
                  product.salePrice === 0 ? product.price : product.salePrice
                }원</span>
                <div class="cart_popup_count">
                  <button class="cart_minus">
                    <img src="/assets/minus.png" alt="1 감소" />
                  </button>
                  <span>1</span>
                  <button class="cart_plus">
                    <img src="/assets/plus.png" alt="1 증가"/>
                  </button>
                </div>
              </div>
            </div>
            <div class="cart_popup_total">
              <div class="cart_popup_price">
                <span>합계</span>
                <span>${
                  product.salePrice === 0 ? product.price : product.salePrice
                }원</span>
              </div>
              <div class="cart_popup_point">
                <span>적립</span>
                <span>구매 시 5원 적립</span>
              </div>
            </div>
            <div class="cart_popup_buttons">
              <button class="cart_popup_cancel">취소</button>
              <button class="cart_popup_save">장바구니 담기</button>
            </div>
          `;
          insertFirst('.cart_popup', cartMarkUp);
          const plusButton = document.querySelector('.cart_plus');
          const productCount = document.querySelector('.cart_popup_count span');
          const minusButton = document.querySelector('.cart_minus');

          let count = parseInt(productCount.textContent);
          let totalPrice = document.querySelector(
            '.cart_popup_price span:last-child'
          );

          const price = +(
            product.salePrice === 0 ? product.price : product.salePrice
          ).replace(/,/g, '');

          // 플러스 버튼
          plusButton.addEventListener('click', () => {
            count++;
            let result = price * count;
            productCount.textContent = count;

            totalPrice.textContent =
              result
                .toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',') + '원';
          });

          // 마이너스 버튼
          minusButton.addEventListener('click', () => {
            let total = +totalPrice.textContent.slice(0, -1).replace(/,/g, '');
            if (count > 1) {
              count--;
              let result = total - price;
              productCount.textContent = count;

              totalPrice.textContent =
                result
                  .toString()
                  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',') + '원';
            }
          });

          // 업데이트 함수
          const updatePrice = (result, price, count) => {
            console.log(price);
            console.log(count);
            return (result.textContent = price * count);
          };

          productCount.addEventListener('change', updatePrice);
          totalPrice.addEventListener('change', updatePrice);

          cartPopUpContainer.classList.add('on');
        }
      });

      // 장바구니 팝업 클릭 했을 때
      const cartContainerHandler = (event) => {
        const button = event.target.closest('button');

        if (!button) return;

        if (button.classList.contains('cart_popup_cancel')) {
          cartPopUpContainer.classList.remove('on');
        }
        if (button.classList.contains('cart_popup_save')) {
          cartPopUpContainer.classList.remove('on');
        }
      };
      cartPopUpContainer.addEventListener('click', cartContainerHandler);
    };

    cartButton.forEach((button) => {
      button.addEventListener('click', cartHandler);
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
