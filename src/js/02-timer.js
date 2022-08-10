// import required packages
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

// create references to dom elements
const refs = {
  inputDate: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('button[data-start]'),
  indicateDays: document.querySelector('.value[data-days]'),
  indicateHours: document.querySelector('.value[data-hours]'),
  indicateMinutes: document.querySelector('.value[data-minutes]'),
  indicateSeconds: document.querySelector('.value[data-seconds]'),
};

// variable declaration
let intervalId = null;
let selectedDate;
let currentDate;

// flatpickr function parameter object
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = new Date(selectedDates[0]).getTime();
    currentDate = Date.now();
    validateDate(selectedDate, currentDate);
  },
};

// add an eventListener to the start button
refs.btnStart.addEventListener('click', onClickStart);

refs.btnStart.disabled = true;

// create flatpickr object
flatpickr(refs.inputDate, options);

// selected date validation function
function validateDate(date1, date2) {
  if (date1 > date2) {
    refs.btnStart.disabled = false;
  } else {
    Notiflix.Notify.failure('Please choose a date in the future');
  }
}

// function that is triggered when the start button is clicked
function onClickStart() {
  refs.btnStart.disabled = true;
  intervalId = setInterval(calcOfRemainingTime, 1000);
  refs.inputDate.disabled = true;
}

// remaining time counting function
function calcOfRemainingTime() {
  currentDate = Date.now();
  const differenceDate = selectedDate - currentDate;
  const { days, hours, minutes, seconds } = convertMs(differenceDate);
  showCountdown(days, hours, minutes, seconds);
  if (differenceDate < 1000) {
    clearInterval(intervalId);
  }
}

// date difference conversion function
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// remaining time display function
function showCountdown(day, hour, min, sec) {
  refs.indicateDays.textContent = pad(day);
  refs.indicateHours.textContent = pad(hour);
  refs.indicateMinutes.textContent = pad(min);
  refs.indicateSeconds.textContent = pad(sec);
}

// function to represent a number with at least two digits
function pad(value) {
  return String(value).padStart(2, '0');
}
