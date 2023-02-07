function checkMaxLength(object) {
  if (object.value.length > object.maxLength) {
    object.value = object.value.slice(0, object.maxLength);
  }
}

const yearInput = document.querySelector('#year');
const monthInput = document.querySelector('#month');
const dayInput = document.querySelector('#day');

const numberLengthFunc = function () {
  checkMaxLength(this);
};

yearInput.oninput = numberLengthFunc;

monthInput.oninput = numberLengthFunc;

dayInput.oninput = numberLengthFunc;
