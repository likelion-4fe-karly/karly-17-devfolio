// import { getNode } from '../../lib/index.js';

/* global Swiper */

/* 메인 배너 */
const swiper = new Swiper('.index_visual_swiper', {
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
  navigation: {
    prevEl: '.index_recommend_product_swiper .swiper-button-prev',
    nextEl: '.index_recommend_product_swiper .swiper-button-next',
  },
});
