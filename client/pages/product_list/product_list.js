// accordion 만들기
var accordion = document.getElementsByClassName('btn_toggle');
var i;
for (i = 0; i < accordion.length; i++) {
  accordion[i].addEventListener('click', function () {
    this.classList.toggle('active');
    var accordion_item_list = this.nextElementSibling;
    if (!this.classList.contains('active')) {
      accordion_item_list.style.maxHeight = null;
    } else {
      accordion_item_list.style.maxHeight =
        accordion_item_list.scrollHeight + 'px';
    }
  });
}
