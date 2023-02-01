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
