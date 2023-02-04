// import { getNode } from '../../lib/index.js';

/* global Swiper */
let swiperPrev = document.querySelector(
  '.index_recommend_product .swiper-button-prev'
);

console.log(swiperPrev);

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

/* 이 상품 어때? */
const swiper2 = new Swiper('.first .product', {
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
    prevEl: '.first .swiper-button-prev',
    nextEl: '.first .swiper-button-next',
  },
  on: {
    activeIndexChange: function () {
      if (this.realIndex === 0) {
        swiperPrev.classList.add('swiper-button-disabled');
        // startNum = false;
      } else {
        swiperPrev.classList.remove('swiper-button-disabled');
      }
    },
  },
});

/*  놓치면 후회할 가격 */
const swiper4 = new Swiper('.second .price', {
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
    prevEl: '.second .swiper-button-prev',
    nextEl: '.second .swiper-button-next',
  },
  on: {
    activeIndexChange: function () {
      if (this.realIndex === 0) {
        swiperPrev.classList.add('swiper-button-disabled');
        // startNum = false;
      } else {
        swiperPrev.classList.remove('swiper-button-disabled');
      }
    },
  },
});

/* 최근본 상품 */
const swiper3 = new Swiper('.recent_product_swiper', {
  direction: 'vertical',
  autoplay: false,
  loop: true,
  speed: 1000,
});
