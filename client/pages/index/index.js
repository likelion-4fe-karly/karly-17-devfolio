// import { getNode } from '../../lib/index.js';
/* global Swiper */
const swiper = new Swiper('.swiper', {
  autoplay: true,
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
  },
  loop: true,
  speed: 1000,
  parallax: true,
});

const swiper2 = new Swiper('.swiper2', {
  autoplay: false,
  loop: true,
  speed: 1000,
  parallax: true,
  pagination: {},
});

// const pagination = getNode('.pagination');

// pagination.addEventListener('click', function () {
//   console.log('hi');
// });
