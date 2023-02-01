// accordion 만들기
var accordion = document.getElementsByClassName('btn_toggle');
var i;
for (i = 0; i < accordion.length; i++) {
  accordion[i].addEventListener('click', function () {
    this.classList.toggle('active');
    var accordion_item_list = this.nextElementSibling;
    if (!this.classList.contains('active')) {
      accordion_item_list.style.display = 'none';
    } else {
      accordion_item_list.style.display = 'block';
    }
  });
}
