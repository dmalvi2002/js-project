const helpContent = document.querySelector(".help-content");
const helpBtn = document.querySelector(".help");
const quitBtn = document.querySelector(".quit");
const beginContent = document.querySelector(".quiz-begin");
const beginBtn = document.querySelector(".begin");
const checkBtn = document.querySelector(".check");
const nextBtn = document.querySelector(".next");
const wrong = document.querySelector(".wrong");
const correct = document.querySelector(".correct");
const quizContainer = document.querySelector(".quiz-container");
const questionText = document.querySelector(".question");
const answerEls = document.querySelectorAll("li");
const aText = document.getElementById("a_text");
const bText = document.getElementById("b_text");
const cText = document.getElementById("c_text");
const dText = document.getElementById("d_text");
const count = document.querySelector(".count");

const data = [
  {
    question: "What is the most popular language for web pages?",
    a: "JavaScript",
    b: "Python",
    c: "C",
    d: "Ruby",
    answer: "a",
  },
  {
    question: "CSS full form??",
    a: "Classes Style Sheet",
    b: "Cascading Styles Sheet",
    c: "Computer Style Sheet",
    d: "Cascading Style Sheet",
    answer: "d",
  },
  {
    question: "What does HTML stand for?",
    a: "Hyper Tag Markup Language",
    b: "Hyper Text Markup Language",
    c: "Hyperlinks Text Mark Language",
    d: "Hyperlinking Text Marking Language",
    answer: "b",
  },
  {
    question: "What symbol indicates a tag?",
    a: "Angle brackets e.g.",
    b: "Curved brackets e.g. {,}",
    c: "Commas e.g. ','",
    d: "Exclamation marks e.g. !",
    answer: "a",
  },
  {
    question: "What is the correct tag for a line break?",
    a: "brk /",
    b: "line /",
    c: "bk /",
    d: "br /",
    answer: "d",
  },
  {
    question: "Where should a CSS file be referenced in a HTML file?",

    a: "Before any HTML code",
    b: "After all HTML code",
    c: "Inside the head section",
    d: "Inside the body section",

    answer: "c",
  },
  {
    question: "Inside the body section...",
    a: "Images",
    b: "Text",
    c: "Information",
    d: "HTML",
    answer: "c",
  },
  {
    question: "What file extension should HTML files have?",
    a: ".html",
    b: ".ht",
    c: ".page",
    d: ".php",
    answer: "a",
  },
  {
    question: "What two things do you need to create webpages & view them?",

    a: "A text editor & a web browser",
    b: "A text editor & a compiler",
    c: "A compiler & a web browser",
    d: "None of the above",

    answer: "a",
  },
  {
    question: "Which tag is the root tag in HTML?",
    a: "< body >",
    b: "< title >",
    c: "< html >",
    d: "< head >",
    answer: "c",
  },
];

let currentQuiz = 0;
let answer;
const selectOption = () => {
  answerEls.forEach((el) => {
    el.classList.remove("grey");
  });
  this.classList.add("grey");
  answer = this.id;
  wrong.style.display = "none";
};
answerEls.forEach((el) => {
  el.addEventListener("click", selectOption.bind(this));
});

function loadQuiz() {
  questionText.innerHTML = `<h2>${data[currentQuiz].question}</h2>`;
  aText.innerText = data[currentQuiz].a;
  bText.innerText = data[currentQuiz].b;
  cText.innerText = data[currentQuiz].c;
  dText.innerText = data[currentQuiz].d;
  count.innerText = `${currentQuiz + 1}/${data.length}`;
}

function getSelected() {
  if (answer === data[currentQuiz].answer) {
    checkBtn.style.display = "none";
    wrong.style.display = "none";
    nextBtn.style.display = "block";
    correct.style.display = "block";
    answerEls.forEach((el) => {
      el.removeEventListener("click", selectOption.bind(this));
    });
  } else {
    wrong.style.display = "block";
  }
}

// Event listeners
helpBtn.addEventListener("click", () => {
  helpContent.classList.toggle("active");
});

beginBtn.addEventListener("click", () => {
  count.style.display = "block";
  quizContainer.classList.add("active");
  beginContent.style.display = "none";
});

quitBtn.addEventListener("click", () => {
  location.reload();
});

checkBtn.addEventListener("click", () => {
  getSelected();
});
nextBtn.addEventListener("click", () => {
  answerEls.forEach((el) => {
    el.addEventListener("click", selectOption.bind(this));
  });
  answerEls.forEach((el) => {
    el.classList.remove("grey");
    correct.style.display = "none";
  });
  if (currentQuiz === data.length - 1) {
    nextBtn.style.display = "none";
    quizContainer.innerHTML =
      "<h2>Congrats! you have completed the quiz. Click 'Restart' to take the quiz again!</h2>";
  } else {
    currentQuiz++;
    loadQuiz();
    checkBtn.style.display = "block";
    nextBtn.style.display = "none";
  }
});

window.onload = function () {
  loadQuiz();
};
