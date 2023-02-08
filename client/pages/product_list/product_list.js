fetch('http://localhost:3000/products_list')
  .then((response) => response.json())
  .then((product_lists) => {
    let markup = '';

    product_lists.forEach((product_list) => {
      console.log(product_list);
      markup += /* html */ `
      <a>
        <div class="product_item_img_box">
          <img
            src="/assets/${product_list.image.view}"
            alt="${product_list.alt}"
          />
          <button
                    type="button"
                    alt="장바구니 버튼"
                    aria-label="product_item_cart"
                    class="product_item_cart"
                    tabindex="0"
                    onClick="location.href='../product_detail/product_detail.html'"
                  >
                    <svg
                      width="45"
                      height="45"
                      viewBox="0 0 45 45"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        opacity="0.5"
                        d="M22.5 45C34.9264 45 45 34.9264 45 22.5C45 10.0736 34.9264 0 22.5 0C10.0736 0 0 10.0736 0 22.5C0 34.9264 10.0736 45 22.5 45Z"
                        fill="#2A0038"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M31.4897 17.29L29.3197 26.52H16.8997L14.7397 17.29H31.4897Z"
                        stroke="white"
                        stroke-width="1.4"
                        stroke-linecap="square"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M27.3797 32.94C28.3186 32.94 29.0797 32.1789 29.0797 31.24C29.0797 30.3011 28.3186 29.54 27.3797 29.54C26.4408 29.54 25.6797 30.3011 25.6797 31.24C25.6797 32.1789 26.4408 32.94 27.3797 32.94Z"
                        stroke="white"
                        stroke-width="1.2"
                        stroke-linecap="square"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M18.8499 32.94C19.7888 32.94 20.5499 32.1789 20.5499 31.24C20.5499 30.3011 19.7888 29.54 18.8499 29.54C17.911 29.54 17.1499 30.3011 17.1499 31.24C17.1499 32.1789 17.911 32.94 18.8499 32.94Z"
                        stroke="white"
                        stroke-width="1.2"
                        stroke-linecap="square"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M11.0298 14.38H14.0498L15.4598 20.36"
                        stroke="white"
                        stroke-width="1.4"
                        stroke-linecap="square"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
        </div>
        <div class="product_item_card_info">
                  <div class="item_info_delivery">샛별배송</div>
                  <div class="item_info_name">${product_list.name}</div>
                  <div class="item_price_sale">
                    <span class="item_price_rate">${
                      product_list.saleRatio
                    }</span>
                    <!--${
                      product_list.saleRatio
                        ? `<span class="item_price_rate">${product_list.saleRatio}</span>`
                        : ''
                    }-->
                    <span>${product_list.price}</span><span>원</span>
                    <div>
                      <!--${
                        product_list.salePrice
                          ? `<del>${product_list.salePrice}<span>원</span></del>`
                          : ''
                      } -->
                    </div>
                  </div>
                  <div class="item_info_coment">
                    ${product_list.description}
                  </div>
                  <!--${
                    product_list.badge
                      ? `<div class="item_badge_group">
                    <span class="badge_only">${product_list.Badge.karlyBadge}</span>
                    <span>${product_list.Badge.limitedBadge}</span>
                  </div>`
                      : ''
                  }-->
        </div>
      </a>`;

      console.log(markup);
    });
  })
  .catch(() => {
    console.error('상품리스트 조회에 실패하였습니다.');
    alert('상품리스트 조회에 실패하였습니다.');
  });
