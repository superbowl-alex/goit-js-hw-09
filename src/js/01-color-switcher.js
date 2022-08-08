const refs = {
  body: document.body,
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
};
let timerId = null;

refs.btnStart.addEventListener('click', onClickStart);
refs.btnStop.addEventListener('click', onClickStop);

refs.btnStop.disabled = true;

function onClickStart() {
  refs.btnStart.disabled = true;
  refs.btnStop.disabled = false;
  refs.body.style.backgroundColor = `${getRandomHexColor()}`;
  timerId = setInterval(() => {
    refs.body.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);
}

function onClickStop() {
  refs.btnStart.disabled = false;
  refs.btnStop.disabled = true;

  clearInterval(timerId);
}

function getRandomHexColor() {
  const red = Math.round(Math.random(0, 1) * 255);
  const green = Math.round(Math.random(0, 1) * 255);
  const blue = Math.round(Math.random(0, 1) * 255);
  return `rgb(${red},${green},${blue})`;
}
