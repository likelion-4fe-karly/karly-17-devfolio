import { insertFirst, saveStorage, loadStorage } from '../../lib/index.js';

//빈 배열을 하나 만들고 클릭한 대상(이미지)의 경로(주소)가 빈 배열에 담기도록  코드를 작성해보세요

//이벤트 위임해서 여러개에 넣기..
//배열에 중복 src 담기는 것 제거(validation 추가)
//빈배열에 담은 걸 localStorage에 담기
// let memoItem = localStorage.getItem('item');
// memoItem = memoItem.split(',');
let item = [];
let memoItem = Array.from(localStorage.getItem('item'));
memoItem = memoItem.slice(1, -1);
memoItem = memoItem.join('');
memoItem = memoItem.split(',');

console.log(memoItem);

const divElement = document.querySelector('.index_recommend_product_swiper');
const recElement = document.querySelector('.recent_swiper_wrapper');

divElement.addEventListener('click', (e) => {
  // console.log('?');
  e.preventDefault();
  // item = item.concat(memoItem);
  let targetImg = event.target.closest('img');
  const imgSrc = targetImg.getAttribute('src');

  item.unshift(imgSrc);
  item = item.filter((v, i) => item.indexOf(v) === i);

  saveStorage('item', item);

  let html = '';

  recElement.innerHTML = html2;
  loadStorage('item').then((res) => {
    res.forEach((src) => {
      html += /* html */ `
      <div class="swiper-slide recent_child">
        <a href="">
        <img src="${src}" alt="된장찌개 키트" />
        </a>
      </div>      
      `;
    });
    insertFirst('.recent_swiper_wrapper', html);
  });
});

let html2 = '';
loadStorage('item').then((res) => {
  res.forEach((src) => {
    html2 += /* html */ `
    <div class="swiper-slide recent_child">
      <a href="">
      <img src="${src}" alt="된장찌개 키트" />
      </a>
    </div>      
    `;
  });
  insertFirst('.recent_swiper_wrapper', html2);
});
