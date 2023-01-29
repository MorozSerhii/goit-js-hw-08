import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
initForm();
let dataValues = {};
const LOCALDATA_KEY = '"feedback-form-state"';

form.addEventListener('submit', e => {
  e.preventDefault();
  console.log(dataValues);
  dataValues = {};
  localStorage.removeItem(LOCALDATA_KEY);
  e.target.reset();
});

form.addEventListener('input', throttle(setObj, 500));

function setObj(e) {
  dataValues[e.target.name] = e.target.value;
  const throttleSet = localStorage.setItem(
    LOCALDATA_KEY,
    JSON.stringify(dataValues)
  );
}

function initForm() {}
let dataUsers = localStorage.getItem(LOCALDATA_KEY);
if (dataUsers) {
  dataUsers = JSON.parse(dataUsers);
  Object.entries(dataUsers).forEach(([name, value]) => {
    dataUsers[name] = value;
    form.elements[name].value = value;
  });
}
