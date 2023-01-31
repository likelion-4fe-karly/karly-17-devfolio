import { includeIframeToHTML } from '../lib/include/includeIframeToHTML.js';

includeIframeToHTML()
  .then(() => {
    const body = document.querySelector('body');

    const bodyHandler = (e) => {
      const category = e.target.closest('button');
      const subCategory = document.querySelector('.category_menu');
      if (category) {
        subCategory.style.display = 'block';
        return;
      }
      subCategory.style.display = 'none';
    };

    body.addEventListener('click', bodyHandler);
  })
  .catch(() => {
    console.error('실패');
  });
