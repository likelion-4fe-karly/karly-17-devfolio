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
  })
  .catch(() => {
    console.error('실패');
  });
