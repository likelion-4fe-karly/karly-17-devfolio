export function includeIframeToHTML(selector = 'iframe[data-include]') {
    Array.from(document.querySelectorAll(selector)).forEach((iframe) => {
        iframe.src = iframe.dataset.include;
        iframe.addEventListener('load', ({ target }) => {
            target.insertAdjacentHTML(
                'afterend',
                (target.contentDocument.body || target.contentDocument)
                    .innerHTML,
            );
            target.remove();
        });
    });
}
