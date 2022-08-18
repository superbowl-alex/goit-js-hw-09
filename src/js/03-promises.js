// import required packages
import Notiflix from 'notiflix';

// create references to DOM elements
const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('input[name="delay]'),
  step: document.querySelector('input[name="step]'),
  amount: document.querySelector('input[name="amount]'),
};

// add an eventListener to the submit form
refs.form.addEventListener('submit', onFormSubmit);

// function that works on form submit
function onFormSubmit(e) {
  e.preventDefault();
  const {
    elements: { delay, step, amount },
  } = e.currentTarget;
  let currentDelay = +delay.value;
  let currentStep = +step.value;
  let currentAmount = +amount.value;
  if (currentAmount >= 0 && currentDelay >= 0 && currentDelay >= 0) {
    for (let i = 1; i <= currentAmount; i++) {
      createPromise(i, currentDelay)
        .then(({ position, delay }) =>
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          )
        )
        .catch(({ position, delay }) =>
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          )
        );
      currentDelay += currentStep;
    }
  } else {
    Notiflix.Notify.warning('Input values cannot be negative numbers');
  }
}

// function that creates and returns a promise
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
