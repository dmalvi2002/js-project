//  HTML structure demo
//  <div class="listingTable"></div>
//  <button class="btn_prev">Prev</button>
//  <div style="display: inline" class="btn-container"></div>
//  <button class="btn_next">Next</button>
//  page: <span class="page"></span>

class PaginationMethod {
  constructor(
    container,
    arr,
    rowsPerPage,
    currentPage,
    btnContainer,
    btnClass,
    btnNext,
    btnPrev,
    pageNo
  ) {
    this.container = document.querySelector(container);
    this.arr = arr;
    this.rowsPerPage = rowsPerPage;
    this.currentPage = currentPage;
    this.btnContainer = document.querySelector(btnContainer);
    this.btnClass = btnClass;
    this.btnNext = document.querySelector(btnNext);
    this.btnPrev = document.querySelector(btnPrev);
    this.pageNo = document.querySelector(pageNo);

    this.btnNext.addEventListener("click", this.nextPage);
    this.btnPrev.addEventListener("click", this.prevPage);

    this.changePage(this.currentPage);
    this.createBtn(this.numPages());
  }
  numPages = () => {
    return Math.ceil(this.arr.length / this.rowsPerPage);
  };
  prevPage = () => {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.changePage(this.currentPage);
    }
  };

  nextPage = () => {
    if (this.currentPage < this.numPages()) {
      this.currentPage++;
      this.changePage(this.currentPage);
    }
  };
  changePage(page) {
    let num = this.numPages();
    if (page == 1) {
      this.btnPrev.style.visibility = "hidden";
    } else {
      this.btnPrev.style.visibility = "visible";
    }
    if (page == num) {
      this.btnNext.style.visibility = "hidden";
    } else {
      this.btnNext.style.visibility = "visible";
    }

    this.container.innerHTML = "";

    for (
      let i = (page - 1) * this.rowsPerPage;
      i < page * this.rowsPerPage && i < this.arr.length;
      i++
    ) {
      // Here you have to spicify about your element.
      this.container.innerHTML += this.arr[i].adName + "<br>";
    }
    this.pageNo.innerHTML = page;
  }
  createBtn(num) {
    for (let i = 1; i <= num; i++) {
      let btn = document.createElement("button");
      btn.innerText = i;
      btn.classList.add(this.btnClass);
      btn.addEventListener("click", () => {
        this.changePage(btn.innerText);
        this.currentPage = btn.innerText;
      });
      this.btnContainer.insertAdjacentElement("beforeend", btn);
    }
  }
}
let objJson = [
  { adName: "AdName 1" },
  { adName: "AdName 2" },
  { adName: "AdName 3" },
  { adName: "AdName 4" },
  { adName: "AdName 5" },
  { adName: "AdName 6" },
  { adName: "AdName 7" },
  { adName: "AdName 8" },
  { adName: "AdName 9" },
  { adName: "AdName 10" },
  { adName: "AdName 11" },
  { adName: "AdName 12" },
  { adName: "AdName 13" },
  { adName: "AdName 14" },
  { adName: "AdName 15" },
  { adName: "AdName 16" },
  { adName: "AdName 17" },
  { adName: "AdName 18" },
  { adName: "AdName 19" },
  { adName: "AdName 20" },
  { adName: "AdName 21" },
]; // Can be obtained from another source, such as your objJson variable

const newPagination = new PaginationMethod(
  ".listingTable",
  objJson,
  5,
  1,
  ".btn-container",
  ".pagination-btn",
  ".btn_next",
  ".btn_prev",
  ".page"
);
