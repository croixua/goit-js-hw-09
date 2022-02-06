import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('form');
const inputsRef = document.querySelectorAll('input');
const delayRef = inputsRef[0];
const stepRef = inputsRef[1];
const amountRef = inputsRef[2];
let defaultCount = 1;
let id = null;

formRef.addEventListener('submit', callPromise);

function callPromise(e) {
  e.preventDefault();

  setTimeout(() => {
    id = setInterval(() => {
      if (defaultCount === +amountRef.value) {
        clearInterval(id);
      }
      createPromise(defaultCount, stepRef.value).then().catch();
      defaultCount++;
    }, stepRef.value);
  }, delayRef.value);
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve(onSucces(position, delay));
    } else {
      reject(onError(position, delay));
    }
  });
}
