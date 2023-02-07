import { insertLast } from './../../lib/dom/insert.js';

// TODO 비동기 통신 뿌리기

fetch('http://localhost:3000/products')
  .then((res) => res.json())
  .then((json) => {
    console.log(json);
    let html = '';

    json.forEach((product) => {
      html += /*html*/ `
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
      <p class="recommend_swiper_item_price">${product.price}원</p>
    </a>
    <div class="recommend_swiper_item_cart" tabindex="0">
      <img
        src="/assets/index/icon_cart.png"
        alt="장바구니 버튼"
      />
    </div>
  </li>`;
    });

    insertLast('.swiper-slide ul', html);
  });
