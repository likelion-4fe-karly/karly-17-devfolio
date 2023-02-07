// const { forEach } = require('lodash');

//json 파일 불러오기
fetch('http://localhost:3000/products')
  .then((response) => {
    return response.json();
  })
  .then((products) => {
    products.forEach((product) => {
      const markup = `
      <a>
        <div class="product_item_img_box">
          <img
            src="/assets/${product.image.view}"
            alt="${product.alt}"
          />
        </div>
        <div class="product_item_card_info">
                  <div class="item_info_delivery">샛별배송</div>
                  <div class="item_info_name">${product.name}</div>
                  <div class="item_price_sale">
                    <span class="item_price_rate">${product.saleRatio}</span>
                    <span>${product.price}</span><span>원</span>
                    <div>
                      <del>${product.salePrice}<span>원</span></del>
                    </div>
                  </div>
                  <div class="item_info_coment">
                    ${product.description}
                  </div>
                </div>
              </a>`;

      document
        .querySelector('div.product_list_grid')
        .insertAdjacentHTML('beforeend', markup);

      function ratioValue(data) {
        let saleRatioValue = [];
        for (let key in data) {
          saleRatioValue.push(data[key]['slaeRatio']);
        }
        return saleRatioValue;
      }
      for (var key in products) {
        console.log('key:', key);
        console.log('valuie : ', products[key]);
        products.filter(
          (product) =>
            product.saleRatio == 'undefined' || product.saleRatio == 'Null'
        );
        document.getElementByClass('item_price_rate').style.display = 'none';
      }
    });
  })
  .catch(() => {
    console.error('상품리스트 조회에 실패하였습니다.');
    alert('상품리스트 조회에 실패하였습니다.');
  });

// accordion 만들기
let accordion = document.getElementsByClassName('btn_toggle');
let i;
for (i = 0; i < accordion.length; i++) {
  accordion[i].addEventListener('click', function () {
    this.classList.toggle('active');
    let accordion_item_list = this.nextElementSibling;
    if (!this.classList.contains('active')) {
      accordion_item_list.style.maxHeight = null;
    } else {
      accordion_item_list.style.maxHeight =
        accordion_item_list.scrollHeight + 'px';
    }
  });
}

// 초기화 버튼
// function listCheckbox() {
//   const checkboxes = document.getElementsByName('productListItem');
//   checkboxes.forEach((checkbox) => {
//     checkbox.checked = false;
//   });
// }
const checkboxes = document.getElementsByName('productListItem');

function listCheckbox() {
  checkboxes.forEach(function (checkbox) {
    checkbox.checked = false;
  });
}
