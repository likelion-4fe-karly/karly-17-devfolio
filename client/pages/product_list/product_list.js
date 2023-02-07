// const { forEach } = require('lodash');

//json 파일 불러오기
function loadProducts() {
  return fetch('http://127.0.0.1:5500/server/db/product_data.json')
    .then((response) => response.json())
    .then((json) => json.products);
}
loadProducts()
  .then((products) => {
    console.log(products);
  })
  .catch(() => {
    console.error('상품리스트 조회를 실패하였습니다.');
    alert('상품리스트 조회를 실패하였습니다.');
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
