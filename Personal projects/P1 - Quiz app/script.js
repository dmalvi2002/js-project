const progress = document.querySelector('.progress');
const timeCount = document.querySelector('.time-count');
const mainSection = document.querySelector('.main');
const resultSection = document.querySelector('.result');
const questionSection = document.querySelector('.questions');

const data = [
  {
    q: 'ডেটাবেজের রেকর্ড বাদ দেওয়ার অপশন কোনটি?',
    options: ['Delete Data', 'Delete field', 'Delete Record', 'Delete Row'],
    a: 1,
  },
  {
    q: 'ডেটাকে এনক্রিপশন ও ডিক্রিপশন করাকে কী বলে?',
    options: [
      'এনক্রিপ্টোগ্রাফি',
      'ক্রিপ্টোগ্রাফি',
      'সাইবার সিকিউরিটি',
      'ডেটাবেস সিকিউরিটি',
    ],
    a: 2,
  },
  {
    q: 'DTD- এর পূর্ণ নাম কী?',
    options: [
      'Document Type Data',
      'Document Type Definition',
      'Document Type Date',
      'Data Type Definition',
    ],
    a: 3,
  },
];

let printScore = 0;

let q = data.length * 10;
progress.setAttribute('value', `${q}`);
progress.setAttribute('max', `${q}`);
let count = 0;

function updateProgress(c) {
  let mins = Math.floor(c / 60);
  if (mins < 10) {
    mins = '0' + String(mins);
  }

  let secs = Math.floor(c % 60);
  if (secs < 10) {
    secs = '0' + String(secs);
  }
  return `${mins}:${secs}`;
}

const answers = [];

function selectOption() {
  this.classList.add('active');
  [...this.parentElement.children].forEach(c => {
    c.removeEventListener('click', selectOption);
  });
  answers.push(Number(this.getAttribute('data-value')));
}

const submit = () => {
  checkFn();
};

const checkFn = function () {
  clearInterval(window.timeFn);
  let t = updateProgress(q - count);
  answers.forEach((c, i) => {
    if (c === data[i].a) {
      printScore++;
    }
  });
  document.querySelectorAll('.questions').forEach(el => {
    document.body.removeChild(el);
  });
  document.body.removeChild(document.querySelector('.submit_btn'));

  document.body.insertAdjacentHTML(
    'beforeend',
    `
  <section class="result">
    <h1 class="score">${printScore}/${data.length}</h1>
    <h1 class="passed-time">${t}</h1>
    <h1 class="check">${printScore < data.length / 2 ? '❌Fail' : '✔Pass'}</h1>
    <button class="again">Try agian!</button>
  </section>
  `
  );
  document.querySelector('.again').addEventListener('click', () => {
    location.reload();
  });
};

function loadQuestion(arr) {
  let html = '';
  arr.forEach(c => {
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
  document.body.insertAdjacentHTML('beforeend', html);
  document.querySelectorAll('.option').forEach(c => {
    c.addEventListener('click', selectOption);
  });
  document.body.insertAdjacentHTML(
    'beforeend',
    `<div class='submit_btn'><button class='submit'>Submit</button></div>`
  );
  document.querySelector('.submit').addEventListener('click', submit);
}

window.onload = () => {
  document.querySelector('.start').addEventListener('click', () => {
    loadQuestion(data);
    updateProgress(q);
    window.timeFn = setInterval(function () {
      progress.value--;
      count = progress.value;
      timeCount.innerHTML = updateProgress(count);
      if (count === 0) {
        clearInterval(window.timeFn);
      }
    }, 1000);
  });
};
