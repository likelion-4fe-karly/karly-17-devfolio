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
