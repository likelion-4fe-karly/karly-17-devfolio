// import { getNode } from '../../lib/index.js';

/* global Swiper */

/* 메인 배너 */
const swiper1 = new Swiper('.index_visual_swiper', {
  autoplay: true,
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
  },
  loop: true,
  speed: 1000,
  parallax: true,
  a11y: {
    prevSlideMessage: '이전 슬라이드',
    nextSlideMessage: '다음 슬라이드',
    slideLabelMessage:
      '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.',
  },
  navigation: {
    prevEl: '.index_visual_swiper .swiper-button-prev',
    nextEl: '.index_visual_swiper .swiper-button-next',
  },
});

/* 이 상품 어때? & 놓치면 후회할 가격 */
const swiper2 = new Swiper('.index_recommend_product_swiper', {
  autoplay: false,
  loop: true,
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
    prevEl: '.index_recommend_product_swiper .swiper-button-prev',
    nextEl: '.index_recommend_product_swiper .swiper-button-next',
  },
});

/* 이 상품 어때? & 놓치면 후회할 가격 */
const swiper3 = new Swiper('.recent_product_swiper', {
  direction: 'vertical',
  autoplay: false,
  loop: true,
  speed: 1000,
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
const cartButton = document.querySelectorAll('.recommend_swiper_item_cart');

const cartHandler = () => {
  console.log('크릭');
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
