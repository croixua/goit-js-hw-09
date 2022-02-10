const startBtnRef = document.querySelector('[data-start]');
const stopBtnRef = document.querySelector('[data-stop]');
const wrapperRef = document.createElement('div');
const BACKGROUND_COLOR = 'background-color';

let timerId = null;

wrapperRef.classList.add('wrapper');
startBtnRef.classList.add('btn');
stopBtnRef.classList.add('btn');

document.body.children[0].after(wrapperRef);
wrapperRef.append(startBtnRef, stopBtnRef);

updateBgColor();

startBtnRef.addEventListener('click', startChangeningBgColor);
stopBtnRef.addEventListener('click', stopChangeningBgColor);

function startChangeningBgColor(e) {
  e.target.nextElementSibling.disabled = false;
  e.target.disabled = true;

  timerId = setInterval(() => {
    let color = getRandomHexColor();

    changeBodyBgColor(color);
    localStorage.setItem(BACKGROUND_COLOR, `${color}`);
  }, 1000);
}

function stopChangeningBgColor(e) {
  if (e.target.disabled) {
    return;
  }

  e.target.disabled = true;
  e.target.previousElementSibling.disabled = false;

  clearInterval(timerId);
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
