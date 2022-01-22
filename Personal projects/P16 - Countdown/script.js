// Button effect

const btn1 = document.querySelector("#submit-button");

function waveFn(e) {
  e.preventDefault();
  let x = e.offsetX - 10;
  let y = e.offsetY - 10;
  btn1.insertAdjacentHTML(
    "beforeend",
    '<div class="circle grow" style="left:' + x + "px;top:" + y + 'px;"></div>'
  );
  document.querySelectorAll(".circle").forEach((el) => {
    el.addEventListener("animationend", () => {
      el.style.display = "none";
    });
  });
}

btn1.addEventListener("click", waveFn);
