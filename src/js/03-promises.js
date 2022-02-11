import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('form');
const btnRef = document.querySelector('button');
let defaultAmount = 1;
let id = null;

formRef.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();

  btnRef.setAttribute('disabled', 'disabled');

  const elements = e.target.elements;
  const step = +elements.step.value;
  const amount = +elements.amount.value;
  let delay = +elements.delay.value;

  if (step < 0 || delay < 0 || amount <= 0) {
    e.target.reset();
    btnRef.removeAttribute('disabled');
    return Notify.failure('Enter values greater than or equal to 0');
  }

  e.target.reset();

  setTimeout(() => {
    for (let i = 0; i <= amount; i++) {
      createPromise(defaultAmount, delay, step, amount)
        .then(({ position, delay }) => {
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });

      if (defaultAmount === amount) {
        btnRef.removeAttribute('disabled');
        defaultAmount = 1;
        return;
      }

      delay += step;
      defaultAmount++;
    }
  }, delay);
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
