// import required packages
import Notiflix from 'notiflix';

// create references to dom elements
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
  for (let i = 1; i <= +amount.value; i++) {
    createPromise(i, currentDelay)
      .then(({ position, delay }) =>
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        )
      )
      .catch(({ position, delay }) =>
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
      );
    currentDelay += +step.value;
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
