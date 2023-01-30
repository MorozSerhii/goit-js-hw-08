import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
form.addEventListener('submit', resetForm);
form.addEventListener('input', throttle(setObj, 500));

const LOCALDATA_KEY = 'feedback-form-state';

let dataValues = {};
initForm();

function initForm() {
  let dataUsers = localStorage.getItem(LOCALDATA_KEY);
  if (dataUsers) {
    dataUsers = JSON.parse(dataUsers);
    Object.entries(dataUsers).forEach(([name, value]) => {
      dataValues[name] = value;
      form.elements[name].value = value;
    });
  }
}

function setObj(e) {
  dataValues[e.target.name] = e.target.value;
  localStorage.setItem(LOCALDATA_KEY, JSON.stringify(dataValues));
}

function resetForm(e) {
  e.preventDefault();
  const formData = new FormData(form);
  formData.forEach((value, name) => console.log(`${name}:`, value));
  dataValues = {};
  localStorage.removeItem(LOCALDATA_KEY);
  e.target.reset();
}
