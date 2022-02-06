import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/material_orange.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputRef = document.querySelector('input#datetime-picker');
const startBtnRef = document.querySelector('[data-start]');
const dataDaysRef = document.querySelector('[data-days]');
const dataHoursRef = document.querySelector('[data-hours]');
const dataMinutesRef = document.querySelector('[data-minutes]');
const dataSecondsRef = document.querySelector('[data-seconds]');
const DISABLED_ATTRIBUTE_NAME = 'disabled';
const DISABLED_ATTRIBUTE_VALUE = 'disabled';
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onChange() {
    clearInterval(timerId);
  },
  onClose(selectedDates) {
    if (options.defaultDate > selectedDates[0]) {
      startBtnRef.setAttribute(DISABLED_ATTRIBUTE_NAME, DISABLED_ATTRIBUTE_VALUE);
      Notify.failure('Please choose a date in the future');
      return;
    }
    startBtnRef.removeAttribute(DISABLED_ATTRIBUTE_NAME);
  },
};

startBtnRef.addEventListener('click', startCountdown);
startBtnRef.setAttribute(DISABLED_ATTRIBUTE_NAME, DISABLED_ATTRIBUTE_VALUE);

const fp = flatpickr(inputRef, options);

function startCountdown() {
  const selectedDates = fp.selectedDates[0];

  startBtnRef.setAttribute(DISABLED_ATTRIBUTE_NAME, DISABLED_ATTRIBUTE_VALUE);

  timerId = setInterval(() => {
    const currentDate = Date.now();

    const differenceTime = selectedDates - currentDate;
    const { days, hours, minutes, seconds } = convertMs(differenceTime);
    dataDaysRef.textContent = days;
    dataHoursRef.textContent = hours;
    dataMinutesRef.textContent = minutes;
    dataSecondsRef.textContent = seconds;

    setInterval(() => {
      if (
        dataDaysRef.textContent === '00' &&
        dataHoursRef.textContent === '00' &&
        dataMinutesRef.textContent === '00' &&
        dataSecondsRef.textContent === '00'
      ) {
        clearInterval(timerId);
      }
    }, 1000);
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
