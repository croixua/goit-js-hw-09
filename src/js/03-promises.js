import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('form');
const inputsRef = document.querySelectorAll('input');
const btnRef = document.querySelector('button');
const delayRef = inputsRef[0];
const stepRef = inputsRef[1];
const amountRef = inputsRef[2];
const DISABLED_ATTRIBUTE_NAME = 'disabled';
const DISABLED_ATTRIBUTE_VALUE = 'disabled';
let defaultAmount = 1;
let id = null;

formRef.addEventListener('submit', callPromise);

function callPromise(e) {
  e.preventDefault();
  btnRef.setAttribute(DISABLED_ATTRIBUTE_NAME, DISABLED_ATTRIBUTE_VALUE);

  let enteredAmount = +amountRef.value;
  let stepDelay = +stepRef.value;
  let firstDelay = +delayRef.value;
  let sumDelay = firstDelay;

  formRef.reset();

  setTimeout(() => {
    id = setInterval(() => {
      createPromise(defaultAmount, sumDelay)
        .then(({ position, delay }) => {
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });

      if (defaultAmount === enteredAmount) {
        clearInterval(id);
        btnRef.removeAttribute(DISABLED_ATTRIBUTE_VALUE);
        defaultAmount = 1;
        return;
      }

      defaultAmount++;
      sumDelay += stepDelay;
    }, stepDelay);
  }, firstDelay);
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}

createPromise(2, 1500)
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });
