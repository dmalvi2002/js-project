const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

let ticketPrice = +movieSelect.value;

const updateSelectedCount = function () {
  const selectSeat = document.querySelectorAll(".row .seat.selected");

  count.innerText = selectSeat.length;
  total.innerText = selectSeat.length * ticketPrice;
};

movieSelect.addEventListener("change", function (e) {
  ticketPrice = +e.target.value;
  updateSelectedCount();
});

// Seat count event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
  }
  updateSelectedCount();
});
