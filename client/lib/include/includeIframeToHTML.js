export function includeIframeToHTML(selector = 'iframe[data-include]') {
  const iframes = Array.from(document.querySelectorAll(selector));

  generateFakeContainer(iframes);

  return new Promise((resolve) => {
    iframes.forEach((iframe) => {
      iframe.src = iframe.dataset.include;
      iframe.hidden = true;

      iframe.addEventListener('load', ({ target }) => {
        const fakeContainer = target.nextElementSibling;
        fakeContainer.insertAdjacentHTML(
          'afterend',
          (target.contentDocument.body || target.contentDocument).innerHTML
        );
        target.remove();
        fakeContainer.remove();

        setTimeout(resolve, 100);
      });
    });
  });
}

function generateFakeContainer(iframes) {
  iframes.forEach((iframe) => {
    let height = iframe.dataset.height;
    iframe.insertAdjacentHTML(
      'afterend',
      `<div style="height: ${height}"></div>`
    );
  });
}
