const el1 = document.querySelector(".el-1");
const el2 = document.querySelector(".el-2");
// const btn1 = document.querySelector(".btn-1");
// const btn2 = document.querySelector(".btn-2");
const page1 = document.querySelector(".page-1");
const page2 = document.querySelector(".page-2");
// btn1.addEventListener("click", function () {
//   page1.classList.add("hidden");
//   this.classList.add("hidden");
//   location.href = "index.html";
// });
// btn2.addEventListener("click", function () {
//   page2.classList.add("hidden");
//   this.classList.add("hidden");
//   location.href = "index.html";
// });

el1.addEventListener("mouseover", function () {
  el1.firstElementChild.style.opacity = "1";
});
el1.addEventListener("mouseout", function () {
  el1.firstElementChild.style.opacity = "0.3";
});
el2.addEventListener("mouseover", function () {
  el2.firstElementChild.style.opacity = "1";
});
el2.addEventListener("mouseout", function () {
  el2.firstElementChild.style.opacity = "0.3";
});
