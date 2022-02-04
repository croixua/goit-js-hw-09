const startBtnRef = document.querySelector('[data-start]');
const stopBtnRef = document.querySelector('[data-stop]');
const wrapperRef = document.createElement('div');
const DISABLED_ATTRIBUTE_NAME = 'disabled';
const DISABLED_ATTRIBUTE_VALUE = 'disabled';
const BACKGROUND_COLOR = 'background-color';

let timerId = null;

wrapperRef.classList.add('wrapper');
startBtnRef.classList.add('btn');
stopBtnRef.classList.add('btn');

document.body.append(wrapperRef);
wrapperRef.append(startBtnRef, stopBtnRef);

updateBgColor();

startBtnRef.addEventListener('click', startChangeningBgColor);
stopBtnRef.addEventListener('click', stopChangeningBgColor);

function startChangeningBgColor() {
  stopBtnRef.removeAttribute(DISABLED_ATTRIBUTE_NAME);
  startBtnRef.setAttribute(DISABLED_ATTRIBUTE_NAME, DISABLED_ATTRIBUTE_VALUE);

  timerId = setInterval(() => {
    let color = getRandomHexColor();

    changeBodyBgColor(color);
    localStorage.setItem(BACKGROUND_COLOR, `${color}`);
  }, 1000);
}

function stopChangeningBgColor() {
  if (!startBtnRef.hasAttribute(DISABLED_ATTRIBUTE_NAME)) {
    return;
  }

  clearInterval(timerId);

  stopBtnRef.setAttribute(DISABLED_ATTRIBUTE_NAME, DISABLED_ATTRIBUTE_VALUE);
  startBtnRef.removeAttribute(DISABLED_ATTRIBUTE_NAME);
}

function updateBgColor() {
  const color = localStorage.getItem(BACKGROUND_COLOR);

  changeBodyBgColor(color);
}

function changeBodyBgColor(color) {
  document.body.style.backgroundColor = `${color}`;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
