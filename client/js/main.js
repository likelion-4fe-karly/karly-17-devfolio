import { includeIframeToHTML } from '../lib/include/includeIframeToHTML.js';

includeIframeToHTML()
  .then(() => {
    const body = document.querySelector('body');

    const bodyHandler = (e) => {
      const category = e.target.closest('button');
      const subCategory = document.querySelector('.category_menu');
      if (!category || !category.classList.contains('nav_category_button')) {
        subCategory.style.display = 'none';
        return;
      }
      subCategory.style.display = 'block';
    };

    body.addEventListener('click', bodyHandler);

    // POP UP 영역
    const popup = document.querySelector('.popup');
    const neverWatch = document.querySelector('.popup_never_watch');
    const close = document.querySelector('.popup_close');

    const closeHandler = () => {
      popup.style.display = 'none';
    };

    neverWatch.addEventListener('click', closeHandler);
    close.addEventListener('click', closeHandler);
  })
  .catch(() => {
    console.error('실패');
  });
