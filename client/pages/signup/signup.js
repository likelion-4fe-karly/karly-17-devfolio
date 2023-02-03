// 동의 모두선택 / 해제

const agreeCheckAll = document.querySelector('input[name=all_agree]');

agreeCheckAll.addEventListener('change', (e) => {
  let agreeCheck = document.querySelectorAll('input[name=agree]');

  for (let i = 0; i < agreeCheck.length; i++) {
    agreeCheck[i].checked = e.target.checked;
  }
});
