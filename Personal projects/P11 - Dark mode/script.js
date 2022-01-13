const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById("nav");
const toggleIcon = document.getElementById("toggle-icon");
const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const image3 = document.getElementById("image3");
const textBox = document.getElementById("text-box");

let check = JSON.parse(localStorage.getItem("dark"));
switchTheme(check);
function switchTheme(check) {
  toggleSwitch.checked = check ? true : false;
  check
    ? document.documentElement.setAttribute("data-theme", "dark")
    : document.documentElement.setAttribute("data-theme", "light");
  check
    ? localStorage.setItem("dark", true)
    : localStorage.setItem("dark", false);
  nav.style.backgroundColor = check
    ? "rgb(0 0 0 / 50%)"
    : "rgb(255 255 255 / 50%)";
  textBox.style.backgroundColor = check
    ? "rgb(255 255 255 / 50%)"
    : "rgb(0 0 0 / 50%)";
  toggleIcon.children[0].textContent = check ? "Dark Mode" : "Light Mode";
  image1.src = `img/undraw_proud_coder_${check ? "dark" : "light"}.svg`;
  image2.src = `img/undraw_feeling_proud_${check ? "dark" : "light"}.svg`;
  image3.src = `img/undraw_conceptual_idea_${check ? "dark" : "light"}.svg`;
  toggleIcon.children[1].classList.toggle("fa-sun");
  toggleIcon.children[1].classList.toggle("fa-moon");
}

toggleSwitch.addEventListener("change", (e) => {
  switchTheme(e.target.checked);
});
