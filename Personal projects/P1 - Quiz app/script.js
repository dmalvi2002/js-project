const progress = document.querySelector(".progress");
const timeCount = document.querySelector(".time-count");
const mainSection = document.querySelector(".main");
const start = document.querySelector(".start");
const resultSection = document.querySelector(".result");
const questionSection = document.querySelector(".questions");
const alertPop = document.querySelector(".alert");

const data = [
  {
    q: "What is the predominant markup language for web pages?",
    options: ["JavaScript", "Python", "C", "Ruby"],
    a: 0,
  },
  {
    q: "CSS full form??",
    options: [
      "Classes Style Sheet",
      "Cascading Styles Sheet",
      "Computer Style Sheet",
      "Cascading Style Sheet",
    ],
    a: 3,
  },
  {
    q: "What does HTML stand for?",
    options: [
      "Hyper Tag Markup Language",
      "Hyper Text Markup Language",
      "Hyperlinks Text Mark Language",
      "Hyperlinking Text Marking Language",
    ],
    a: 1,
  },
  {
    q: "What symbol indicates a tag?",
    options: [
      "Angle brackets e.g.",
      "Curved brackets e.g. {,}",
      "Commas e.g. ','",
      "Exclamation marks e.g. !",
    ],
    a: 0,
  },
  {
    q: "What is the correct tag for a line break?",
    options: ["brk /", "line /", "bk /", "br /"],
    a: 3,
  },
  {
    q: "Where should a CSS file be referenced in a HTML file?",
    options: [
      "Before any HTML code",
      "After all HTML code",
      "Inside the head section",
      "Inside the body section",
    ],
    a: 2,
  },
  {
    q: "Inside the body section...",
    options: ["Images", "Text", "Information", "HTML"],
    a: 2,
  },
  {
    q: "What file extension should HTML files have?",
    options: [".html", ".ht", ".page", ".php"],
    a: 0,
  },
  {
    q: "What two things do you need to create webpages & view them?",
    options: [
      "A text editor & a web browser",
      "None of the above",
      "A text editor & a compiler",
      "A compiler & a web browser",
    ],
    a: 0,
  },
  {
    q: "Which tag is the root tag in HTML?",
    options: ["< body >", "< title >", "< html >", "< head >"],
    a: 2,
  },
];

let printScore = 0;

let q = data.length * 10;
progress.setAttribute("value", `${q}`);
progress.setAttribute("max", `${q}`);
let count = 0;

function updateProgress(c) {
  let mins = Math.floor(c / 60);
  if (mins < 10) {
    mins = "0" + String(mins);
  }

  let secs = Math.floor(c % 60);
  if (secs < 10) {
    secs = "0" + String(secs);
  }
  return `${mins}:${secs}`;
}

const answers = [];

function selectOption() {
  this.classList.add("active");
  [...this.parentElement.children].forEach((c) => {
    c.removeEventListener("click", selectOption);
  });
  answers.push(Number(this.getAttribute("data-value")));
}

const submit = () => {
  checkFn();
  start.disabled = true;
};

const showResult = () => {
  clearInterval(window.timeFn);
  let t = updateProgress(q - count);
  answers.forEach((c, i) => {
    if (c === data[i].a) {
      printScore++;
    }
  });
  document.querySelectorAll(".questions").forEach((el) => {
    document.body.removeChild(el);
  });
  document.body.removeChild(document.querySelector(".submit_btn"));

  document.body.insertAdjacentHTML(
    "beforeend",
    `
  <section class="result">
    <h1 class="score">${printScore}/${data.length}</h1>
    <h1 class="passed-time">${t}</h1>
    <h1 class="check">${printScore < data.length / 2 ? "❌Fail" : "✔Pass"}</h1>
    <button class="again">Try agian!</button>
  </section>
  `
  );
  document.querySelector(".again").addEventListener("click", () => {
    location.reload();
  });
};

const showAlert = () => {
  alertPop.style.display = "flex";
  alertPop.style.opacity = 1;
  setTimeout(() => {
    alertPop.style.opacity = 0;
    setTimeout(() => {
      alertPop.style.display = "none";
    }, 300);
  }, 2000);
};

const checkFn = function () {
  if (answers.length === data.length) {
    showResult();
  } else {
    showAlert();
  }
};

function loadQuestion(arr) {
  let html = "";
  arr.forEach((c) => {
    html += `
    <section class="questions">
      <div class="q"><h1>${c.q}</h1></div>
      <div class="options">
        <div class="option" data-value='0'>${c.options[0]}</div>
        <div class="option" data-value='1'>${c.options[1]}</div>
        <div class="option" data-value='2'>${c.options[2]}</div>
        <div class="option" data-value='3'>${c.options[3]}</div>
      </div>
    </section>
    `;
  });
  document.body.insertAdjacentHTML("beforeend", html);
  document.querySelectorAll(".option").forEach((c) => {
    c.addEventListener("click", selectOption);
  });
  document.body.insertAdjacentHTML(
    "beforeend",
    `<div class='submit_btn'><button class='submit'>Submit</button></div>`
  );
  document.querySelector(".submit").addEventListener("click", submit);
}

window.onload = () => {
  document.querySelector(".start").addEventListener("click", () => {
    loadQuestion(data);
    updateProgress(q);
    window.timeFn = setInterval(function () {
      progress.value--;
      count = progress.value;
      timeCount.innerHTML = updateProgress(count);
      if (count === 0) {
        clearInterval(window.timeFn);
        showResult();
        start.disabled = true;
        if (answers.length !== data.length) {
          alertPop.innerHTML = `<h3>You haven't answered all the questions!</h3>`;
          showAlert();
        }
      }
    }, 1000);
  });
};
