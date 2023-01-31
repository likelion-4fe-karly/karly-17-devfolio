export function includeIframeToHTML(selector = 'iframe[data-include]') {
  return new Promise((resolve, reject) => {
    Array.from(document.querySelectorAll(selector)).forEach((iframe) => {
      iframe.src = iframe.dataset.include;
      iframe.addEventListener('load', ({ target }) => {
        target.insertAdjacentHTML(
          'afterend',
          (target.contentDocument.body || target.contentDocument).innerHTML
        );
        target.remove();
        setTimeout(resolve, 100);
      });
    });
  });
}
