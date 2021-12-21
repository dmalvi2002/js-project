const quizContent = document.querySelector(".help-content");
const helpBtn = document.querySelector(".help");
const questionText = document.querySelector(".question");
const answerEls = document.querySelectorAll(".answer");
const aText = document.getElementById("a_text");
const bText = document.getElementById("b_text");
const cText = document.getElementById("c_text");
const dText = document.getElementById("d_text");

const data = [
  {
    question: "What is the most popular language for web pages?",
    a: "JavaScript",
    b: "Python",
    c: "C",
    d: "Ruby",
    answer: 0,
  },
  {
    question: "CSS full form??",

    a: "Classes Style Sheet",
    b: "Cascading Styles Sheet",
    c: "Computer Style Sheet",
    d: "Cascading Style Sheet",

    answer: 3,
  },
  {
    question: "What does HTML stand for?",

    a: "Hyper Tag Markup Language",
    b: "Hyper Text Markup Language",
    c: "Hyperlinks Text Mark Language",
    d: "Hyperlinking Text Marking Language",

    answer: 1,
  },
  {
    question: "What symbol indicates a tag?",

    a: "Angle brackets e.g.",
    b: "Curved brackets e.g. {,}",
    c: "Commas e.g. ','",
    d: "Exclamation marks e.g. !",

    answer: 0,
  },
  // {
  //   question: "What is the correct tag for a line break?",
  //   a: "brk /",
  //   b: "line /",
  //   c: "bk /",
  //   d: "br /",
  //   answer: 3,
  // },
  // {
  //   question: "Where should a CSS file be referenced in a HTML file?",

  //   a: "Before any HTML code",
  //   b: "After all HTML code",
  //   c: "Inside the head section",
  //   d: "Inside the body section",

  //   answer: 2,
  // },
  // {
  //   question: "Inside the body section...",
  //   a: "Images",
  //   b: "Text",
  //   c: "Information",
  //   d: "HTML",
  //   answer: 2,
  // },
  // {
  //   question: "What file extension should HTML files have?",
  //   a: ".html",
  //   b: ".ht",
  //   c: ".page",
  //   d: ".php",
  //   answer: 0,
  // },
  // {
  //   question: "What two things do you need to create webpages & view them?",

  //   a: "A text editor & a web browser",
  //   b: "None of the above",
  //   c: "A text editor & a compiler",
  //   d: "A compiler & a web browser",

  //   answer: 0,
  // },
  // {
  //   question: "Which tag is the root tag in HTML?",
  //   a: "< body >",
  //   b: "< title >",
  //   c: "< html >",
  //   d: "< head >",
  //   answer: 2,
  // },
];

const currentQuiz = 0;
const score = 0;

const loadQuiz = function () {
  const loadCurrentQuiz = data[currentQuiz];

  questionText.innerHTML = `<h2>${loadCurrentQuiz.question}</h2>`;
};
loadQuiz();
// Event listeners
helpBtn.addEventListener("click", () => {
  quizContent.classList.toggle("active");
});
