// Selectors
const submitBtn = document.querySelector("#submit-button");
const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");
const countdownEl = document.getElementById("countdown");
const countdownElTitle = document.getElementById("countdown-title");
const countdownBtn = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");
const completeEl = document.getElementById("complete");
const completeElInfo = document.getElementById("complete-info");
const completeBtn = document.getElementById("complete-button");

const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", today);
let countdownTitle;
let countdownDate;
let countdownValue;
let countdownTimer;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Complete countdown
function updateDOM() {
  countdownTimer = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);
    inputContainer.hidden = true;

    if (distance < 0) {
      countdownEl.hidden = true;
      clearInterval(countdownTimer);
      completeElInfo.textContent = `${countdownTitle.value} finished on ${countdownDate.value}`;
      completeEl.hidden = false;
    } else {
      // else, show the countdown in progress
      countdownElTitle.textContent = `${countdownTitle.value}`;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;
      completeEl.hidden = true;
      countdownEl.hidden = false;
    }
  }, second);
}
// Set date input min with today's date
function updateCountdown(e) {
  e.preventDefault();
  countdownTitle = e.srcElement[0];
  countdownDate = e.srcElement[1];
  countdownValue = new Date(countdownDate.value).getTime();
  if (countdownDate.value === "") {
    alert("Please choose a date first!");
  } else updateDOM();
}

// Reseting the values
function reset() {
  // Hide countdowns, show input form
  countdownEl.hidden = true;
  completeEl.hidden = true;
  inputContainer.hidden = false;
  // Stop the countdown
  clearInterval(countdownTimer);
  // Reset values, remove localStorage item
  countdownTitle.value = "";
  countdownDate.value = "";
}

countdownForm.addEventListener("submit", updateCountdown);

// Button effect
function waveFn(e) {
  let x = e.offsetX - 10;
  let y = e.offsetY - 10;
  this.insertAdjacentHTML(
    "beforeend",
    '<div class="circle grow" style="left:' + x + "px;top:" + y + 'px;"></div>'
  );
  document.querySelectorAll(".circle").forEach((el) => {
    el.addEventListener("animationend", () => {
      el.style.display = "none";
    });
  });
}

submitBtn.addEventListener("click", waveFn);
countdownBtn.addEventListener("click", function (e) {
  waveFn.bind(countdownBtn)(e);
  setTimeout(() => {
    reset();
  }, second);
});
completeBtn.addEventListener("click", function (e) {
  waveFn.bind(completeBtn)(e);
  setTimeout(() => {
    reset();
  }, second);
});
