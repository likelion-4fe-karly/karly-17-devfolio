// 동의 모두선택 / 해제

const agreeCheckAll = document.querySelector('input[name=all_agree]');
let agreeCheck = document.querySelectorAll('input[name=agree]');

agreeCheckAll.addEventListener('click', (e) => {
  agreeCheckAll.classList.toggle('active');

  agreeCheck.forEach((check) => {
    if (agreeCheckAll.classList.contains('active')) {
      check.setAttribute('checked', true);
    } else {
      check.setAttribute('checked', false);
    }
    check.checked = e.target.checked;
  });
});

agreeCheck.forEach((node) => {
  node.addEventListener('click', () => {
    node.classList.toggle('on');
    if (node.classList.contains('on')) {
      node.setAttribute('checked', true);
      if (
        agreeCheck[0].checked &&
        agreeCheck[1].checked &&
        agreeCheck[2].checked &&
        agreeCheck[3].checked
      ) {
        agreeCheckAll.checked = true;
      }
    } else {
      node.setAttribute('checked', false);
      if (
        !agreeCheck[0].checked ||
        !agreeCheck[1].checked ||
        !agreeCheck[2].checked ||
        !agreeCheck[3].checked
      ) {
        agreeCheckAll.checked = false;
      }
    }
  });
});
