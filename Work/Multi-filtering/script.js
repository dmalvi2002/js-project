////////////
// Selectors
const container = document.querySelector(".conatainer");
const loader = document.querySelector(".loader_container");
const imageBox = document.querySelector(".image_box");
const imageBoxInner = document.querySelector(".image_box_inner");
const btnContainer = document.querySelector(".pagination");
const text = document.querySelector(".image_pagination_text");
const filterBtnYear = document.querySelector(".filter_year");
const filterBtnFurniture = document.querySelector(".filter_furniture");
const filterBtnVendor = document.querySelector(".filter_vendor");
const filterVendersContainer = document.querySelector(
  ".filter_vendors_container"
);
const furnitureAllBtn = document.querySelector(".furniture_all");
const yearAllBtn = document.querySelector(".year_all");
const vendorAllBtn = document.querySelector(".vendor_all");
const removeSortBtn = document.querySelector(".remove_sort_btn");
const dateBtn = document.querySelector(".date_btn");
const titleBtn = document.querySelector(".title_btn");
const searchInput = document.querySelector(".search_input");
const searchBtn = document.querySelector(".search_btn");
const resetBtn = document.querySelector(".btn_reset");
const imageSearchText = document.querySelector("#image_search_text");

////////////
// Variables
let arrOfEl = [];
let currentPage = 0;
let rows = 5;
let filtering_object = {};
let emptyArrS = [];
let arrForSearch = [];
let arrForSort = [];
let fileteredData = [];
let emptyArrY = [];
let emptyArrV = [];
let modalHashArr = [];
let asc = false;
let asct = false;

////////////////
// API link ⬇⬇⬇⬇
////////////////
const BASE_URL =
  "https://api.airtable.com/v0/app2nldebQQJZfTm3/Furniture?api_key=keyNxhXmRsJbw1V59";

fetch(BASE_URL)
  .then((res) => res.json())
  .then((data) => {
    dataRec = data.records;
    dataRec.forEach((el) => {
      arrOfEl.push(el);
    });
    arrForSearch = [...dataRec];

    ////////////////////////////////////
    // Creating year buttons dynamically
    let yearArr = [...new Set(arrOfEl.map((el) => el.fields.year))]
      .filter((y) => y !== undefined)
      .sort();

    yearArr.forEach((year) => {
      html = `<button class="btn_year"> ${year}</button>`;
      filterBtnYear.insertAdjacentHTML("beforeend", html);
    });

    /////////////////////////////////////////
    // Creating furniture buttons dynamically
    let furnitureArr = [...new Set(arrOfEl.map((el) => el.fields.Type))];
    furnitureArr.forEach((furniture) => {
      html = `<button class="btn_ftr">${furniture}</button>`;
      filterBtnFurniture.insertAdjacentHTML("beforeend", html);
    });

    //////////////////////////////////////
    // Creating vendor buttons dynamically
    let vendorArr = [
      ...new Set(arrOfEl.map((el) => el.fields["Vendor (Text)"])),
    ];
    vendorArr.forEach((vendor) => {
      html = `<button class="btn_vendor">${vendor}</button>`;
      filterBtnVendor.insertAdjacentHTML("beforeend", html);
    });

    const yearBtns = document.querySelectorAll(".btn_year");
    const furnitureBtns = document.querySelectorAll(".btn_ftr");
    const vendorBtns = document.querySelectorAll(".btn_vendor");

    let urlHashActive = window.location.hash;
    if (urlHashActive.length > 0) {
      filtering_object = { ...convertHashIntoObject() };

      if (filtering_object.page) {
        currentPage = Number(filtering_object.page[0]) - 1;
      }

      filtering(filtering_object);

      if (filtering_object.year) {
        emptyArrY = [...filtering_object.year];
        yearAllBtn.classList.remove("active");
        yearArr.forEach((el, i) => {
          filtering_object.year.forEach((elm) => {
            if (el === elm) {
              yearBtns[i].classList.add("active");
            }
          });
        });
      }

      if (filtering_object.furniture) {
        furnitureAllBtn.classList.remove("active");
        filterVendersContainer.style.display = "block";
        furnitureArr.forEach((el, i) => {
          filtering_object.furniture.forEach((elm) => {
            if (el === elm) {
              furnitureBtns[i].classList.add("active");
            }
          });
        });
      }

      if (filtering_object.vendor) {
        if (filtering_object.vendor.length === 0) {
          delete filtering_object.vendor;
          updateTheHashOnAll("vendor");
        } else if (filtering_object.vendor.length === vendorArr.length) {
          vendorAllBtn.classList.add("active");
          delete filtering_object.vendor;
          updateTheHashOnAll("vendor");
        } else {
          emptyArrV = [...filtering_object.vendor];
          hashUrl(filtering_object);
          vendorAllBtn.classList.remove("active");
          vendorArr.forEach((el, i) => {
            filtering_object.vendor.forEach((elm) => {
              if (el === elm) {
                vendorBtns[i].classList.add("active");
              }
            });
          });
        }
      }

      if (filtering_object.title) {
        searchInput.value = filtering_object.title;
        searchingFunction();
      }

      if (filtering_object.modal) {
        let deleteData = [];
        filtering_object.modal.forEach((c) => {
          if (document.getElementById(`${c}`)) {
            document.getElementById(`${c}`).style.display = "block";
          } else {
            deleteData.push(c);
          }
        });
        let index = deleteData.length - 1;
        while (index >= 0) {
          if (deleteData[index] === filtering_object.modal[index]) {
            filtering_object.modal.splice(index, 1);
          }
          index -= 1;
        }
        modalHashArr = [...filtering_object.modal];
        if (modalHashArr.length === 0) {
          updateTheHashOnAll("modal");
        }
      }
    } else {
      paginatingElements(arrOfEl, imageBox, rows, currentPage);
      setupPagination(arrOfEl, btnContainer, rows);
    }

    ///////////////////////////////////
    // Adding events to dynamic buttons

    yearAllBtn.addEventListener("click", function () {
      this.classList.add("active");
      yearBtns.forEach((el) => el.classList.remove("active"));
      emptyArrY = [];
      delete filtering_object.year;
      currentPage = 0;
      updateTheHashOnAll("year");
      filtering(filtering_object);
      if (filtering_object.page) {
        delete filtering_object.page;
        updateTheHashOnAll("page");
      }
    });

    yearBtns.forEach((el) =>
      el.addEventListener("click", () => {
        el.classList.toggle("active");
        yearAllBtn.classList.remove("active");
        filtering_object = { ...filtering_object, year: emptyArrY };
        const innerTextIndex = emptyArrY.indexOf(el.innerText);
        if (emptyArrY.includes(el.innerText)) {
          emptyArrY.splice(innerTextIndex, 1);
          if (emptyArrY.length === 0) {
            yearAllBtn.classList.add("active");
            filtering_object = { ...filtering_object, year: [...yearArr] };
          } else {
            filtering_object = { ...filtering_object, year: [...emptyArrY] };
          }
        } else {
          emptyArrY.push(el.innerText);
          filtering_object = { ...filtering_object, year: emptyArrY };
        }
        delete filtering_object.page;
        currentPage = 0;
        filtering(filtering_object);
        hashUrl(filtering_object);
      })
    );

    furnitureAllBtn.addEventListener("click", function () {
      this.classList.add("active");
      filterVendersContainer.style.display = "none";
      furnitureBtns.forEach((el) => el.classList.remove("active"));
      vendorBtns.forEach((el) => el.classList.remove("active"));
      vendorAllBtn.classList.add("active");
      emptyArrV = [];
      if (window.location.hash.indexOf("vendor") > -1) {
        updateTheHashOnAll("vendor");
      }
      delete filtering_object.vendor;
      delete filtering_object.furniture;
      delete filtering_object.page;
      currentPage = 0;
      filtering(filtering_object);
      updateTheHashOnAll("furniture");
      updateTheHashOnAll("page");
    });

    furnitureBtns.forEach((el) =>
      el.addEventListener("click", () => {
        furnitureBtns.forEach((el) => el.classList.remove("active"));
        el.classList.add("active");
        furnitureAllBtn.classList.remove("active");
        filterVendersContainer.style.display = "block";
        filtering_object = {
          ...filtering_object,
          furniture: [`${el.innerText}`],
        };
        if (filtering_object.vendor) {
          if (filtering_object.vendor.length === 0) {
            delete filtering_object.vendor;
          }
        }
        if (filtering_object.modal) {
          delete filtering_object.modal;
        }
        currentPage = 0;
        delete filtering_object.page;
        filtering(filtering_object);
        hashUrl(filtering_object);
      })
    );

    vendorAllBtn.addEventListener("click", function () {
      this.classList.add("active");
      vendorBtns.forEach((el) => el.classList.remove("active"));
      emptyArrV = [];
      delete filtering_object.vendor;
      delete filtering_object.page;
      currentPage = 0;
      filtering(filtering_object);
      updateTheHashOnAll("vendor");
      updateTheHashOnAll("page");
    });

    vendorBtns.forEach((el) =>
      el.addEventListener("click", () => {
        el.classList.toggle("active");
        vendorAllBtn.classList.remove("active");
        delete filtering_object.page;
        const innerTextIndex = emptyArrV.indexOf(el.innerText);
        if (emptyArrV.includes(el.innerText)) {
          emptyArrV.splice(innerTextIndex, 1);
          if (emptyArrV.length === 0) {
            emptyArrV = [...vendorArr];
            filtering_object = { ...filtering_object, vendor: [...vendorArr] };
            if (!vendorAllBtn.classList.contains("active")) {
              updateTheHashOnAll("vendor");
            }
          } else {
            filtering_object = { ...filtering_object, vendor: emptyArrV };
            hashUrl(filtering_object);
          }
        } else {
          emptyArrV.push(el.innerText);
          filtering_object = { ...filtering_object, vendor: emptyArrV };
          hashUrl(filtering_object);
        }
        currentPage = 0;
        filtering(filtering_object);
      })
    );

    resetBtn.addEventListener("click", () => {
      currentPage = 0;
      paginatingElements(arrOfEl, imageBox, rows, currentPage);
      setupPagination(arrOfEl, btnContainer, rows);
      emptyArrY = [];
      emptyArrV = [];
      emptyArrS = [];
      filtering_object = {};
      fileteredData = [];
      arrForSearch = [...arrOfEl];
      yearBtns.forEach((el) => el.classList.remove("active"));
      yearAllBtn.classList.add("active");
      furnitureBtns.forEach((el) => el.classList.remove("active"));
      furnitureAllBtn.classList.add("active");
      filterVendersContainer.style.display = "none";
      vendorBtns.forEach((el) => el.classList.remove("active"));
      vendorAllBtn.classList.add("active");
      dateBtn.classList.remove("active");
      titleBtn.classList.remove("active");
      window.location.hash = "";
      searchInput.value = "";
      imageSearchText.innerHTML = "";
    });
  })
  .finally(() => {
    loader.style.display = "none";
    container.style.display = "block";
  });

//////////////////
// Sorting by date
//////////////////
const releaseDateSorting = () => {
  titleBtn.classList.remove("active");
  dateBtn.classList.add("active");
  let sortedByDate;
  if (!asc) {
    asc = true;
    sortedByDate = sortByDescending(arrForSort, "release date");
    filtering_object = {
      ...filtering_object,
      sortBy: [`${dateBtn.innerText}-ascending`],
    };
  } else {
    asc = false;
    sortedByDate = sortByAscending(arrForSort, "release date");
    filtering_object = {
      ...filtering_object,
      sortBy: [`${dateBtn.innerText}-descending`],
    };
  }
  hashUrl(filtering_object);

  paginatingElements(sortedByDate, imageBox, rows, currentPage);
  setupPagination(sortedByDate, btnContainer, rows);
};
dateBtn.addEventListener("click", releaseDateSorting);

///////////////////
// Sorting by title
///////////////////
const titleSorting = () => {
  titleBtn.classList.add("active");
  dateBtn.classList.remove("active");

  if (!asct) {
    asct = true;
    filtering_object = {
      ...filtering_object,
      sortBy: [`${titleBtn.innerText}-ascending`],
    };
    arrForSort.sort(byTitleAsc);
  } else {
    asct = false;
    filtering_object = {
      ...filtering_object,
      sortBy: [`${titleBtn.innerText}-descending`],
    };
    arrForSort.sort(byTitleDsc);
  }
  hashUrl(filtering_object);
  paginatingElements(arrForSort, imageBox, rows, currentPage);
  setupPagination(arrForSort, btnContainer, rows);
};

titleBtn.addEventListener("click", titleSorting);

function byTitleAsc(a, b) {
  if (
    a.fields["Designer (Text)"].toLowerCase() >
    b.fields["Designer (Text)"].toLowerCase()
  ) {
    return 1;
  } else if (
    b.fields["Designer (Text)"].toLowerCase() >
    a.fields["Designer (Text)"].toLowerCase()
  ) {
    return -1;
  } else return 0;
}

function byTitleDsc(a, b) {
  if (
    a.fields["Designer (Text)"].toLowerCase() <
    b.fields["Designer (Text)"].toLowerCase()
  ) {
    return 1;
  } else if (
    b.fields["Designer (Text)"].toLowerCase() <
    a.fields["Designer (Text)"].toLowerCase()
  ) {
    return -1;
  } else return 0;
}

removeSortBtn.addEventListener("click", () => {
  delete filtering_object.sortBy;
  dateBtn.classList.remove("active");
  titleBtn.classList.remove("active");
  filtering(filtering_object);
  updateTheHashOnAll("sortBy");
});
//////////////////
// Multi-filtering
//////////////////
function filtering(filterObj) {
  fileteredData = [...arrOfEl];

  if (filterObj.year) {
    let yearObj = [];
    filterObj.year.forEach((y) => {
      let single = fileteredData.filter((c) => y === c.fields["year"]);
      yearObj.push(...single);
    });
    fileteredData = [...new Set(yearObj)];
  }

  if (filterObj.furniture) {
    let furnitureObj = [];
    filterObj.furniture.forEach((el) => {
      let single = fileteredData.filter((f) => el === f.fields["Type"]);
      furnitureObj.push(...single);
    });
    fileteredData = [...new Set(furnitureObj)];
  }

  if (filterObj.vendor) {
    let vendorObj = [];
    filterObj.vendor.forEach((el) => {
      let single = fileteredData.filter(
        (f) => el === f.fields["Vendor (Text)"]
      );
      vendorObj.push(...single);
    });
    fileteredData = [...new Set(vendorObj)];
  }

  arrForSearch = [...fileteredData];
  arrForSort = [...fileteredData];

  if (filterObj.sortBy) {
    const sort = filterObj.sortBy[0].split("-");
    if (sort[0] === "Release Date") {
      if (sort[1] === "ascending") {
        asc = false;
        releaseDateSorting();
      } else {
        asc = true;
        releaseDateSorting();
      }
    }
    if (sort[0] === "Title") {
      if (sort[1] === "ascending") {
        asct = false;
        titleSorting();
      } else {
        asct = true;
        titleSorting();
      }
    }
  } else {
    paginatingElements(fileteredData, imageBox, rows, currentPage);
    setupPagination(fileteredData, btnContainer, rows);
  }
  if (searchInput.value) {
    searchingFunction();
  }
  if (filterObj.modal) {
    let deleteData = [];
    filterObj.modal.forEach((c) => {
      if (document.getElementById(c)) {
        document.getElementById(c).style.display = "block";
      } else {
        deleteData.push(c);
      }
    });
    let index = deleteData.length - 1;
    while (index >= 0) {
      if (deleteData[index] === filterObj.modal[index]) {
        filterObj.modal.splice(index, 1);
      }
      index -= 1;
    }
    modalHashArr = [...filterObj.modal];
    if (modalHashArr.length === 0) {
      delete filtering_object.modal;
      updateTheHashOnAll("modal");
    }
  }
}

////////////////////////////////////////////////////
// This is the main function that generates elements
////////////////////////////////////////////////////
function paginatingElements(elements, wrapper, rowsPerPage, page) {
  if (elements.length === 0) {
    wrapper.innerHTML = "<h1>Nothing Found</h1>";
    text.innerHTML = `<h4>0 to 0 of 0</h4>`;
    return;
  }
  wrapper.innerHTML = "";
  let start = rowsPerPage * page;
  page--;
  let end = start + rowsPerPage;
  let paginatedElements = elements.slice(start, end);

  text.innerHTML = `<h4>${start + 1} to ${
    start + paginatedElements.length
  } of ${elements.length}</h4>`;

  for (let i = 0; i < paginatedElements.length; i++) {
    const html = `
      <div class="image_card">
        <div class="modal" id='${paginatedElements[i].id}'>
          <p>$${paginatedElements[i].fields["Unit cost"]} (Unit cost)</p>
          <p>${paginatedElements[i].fields.Materials}</p>
          <p>${paginatedElements[i].fields.Color}</p>
          <button id='${paginatedElements[i].id}' class="close">Close</button>
        </div>
        <div class="image">
          <img
            src="${paginatedElements[i].fields.Images[0].url}"
          />
          <h4>${paginatedElements[i].fields["Designer (Text)"]}</h4>
        </div>
        <div class="modal_trigger">
          <button class="modal_trigger_btn" id='${paginatedElements[i].id}'>${paginatedElements[i].id}</button>
        </div>
      </div>
    `;
    // Wrapper is element Container
    wrapper.insertAdjacentHTML("beforeend", html);
  }
  document.querySelectorAll(".modal_trigger_btn").forEach((btn) =>
    btn.addEventListener("click", () => {
      const modal = document.getElementById(`${btn.getAttribute("id")}`);
      modal.style.display = "block";
      modalHashArr.push(btn.getAttribute("id"));
      filtering_object = {
        ...filtering_object,
        modal: [...new Set(modalHashArr)],
      };

      hashUrl(filtering_object);
    })
  );
  document.querySelectorAll(".close").forEach((btn) => {
    btn.addEventListener("click", () => {
      const modal = document.getElementById(`${btn.getAttribute("id")}`);
      modal.style.display = "none";
      if (modalHashArr.includes(btn.getAttribute("id"))) {
        modalHashArr.splice(modalHashArr.indexOf(btn.getAttribute("id")), 1);
        filtering_object = {
          ...filtering_object,
          modal: [...new Set(modalHashArr)],
        };
        if (modalHashArr.length === 0) {
          updateTheHashOnAll("modal");
          delete filtering_object.modal;
        } else {
          hashUrl(filtering_object);
        }
      }
    });
  });
}

/////////////////////////////
// Setting pagination buttons
/////////////////////////////
function setupPagination(elements, wrapper, rowsPerPage) {
  if (elements.length === 0) {
    wrapper.innerHTML = "";
    return;
  }
  wrapper.innerHTML = "";
  let buttons = [];
  let pageCount = Math.ceil(elements.length / rowsPerPage);
  btnContainer.insertAdjacentHTML(
    "afterbegin",
    `<button class="next_pagi">
        <i class="fas fa-arrow-circle-left"></i>
      </button>`
  );
  for (let i = 0; i < pageCount; i++) {
    let btn = paginationButton(i, elements);
    btn.classList.add(`button_${i + 1}`);
    wrapper.appendChild(btn);
    buttons.push(btn);
  }
  btnContainer.insertAdjacentHTML(
    "beforeend",
    `<button class="prev_pagi">
        <i class="fas fa-arrow-circle-right"></i>
      </button>`
  );
  buttons.forEach((el, i) => {
    el.addEventListener("click", function () {
      currentPage = i;
      paginatingElements(elements, imageBox, rows, currentPage);

      let currentBtn = document.querySelector(".pagination button.active");
      currentBtn.classList.remove("active");

      el.classList.add("active");

      if (currentPage === 0) {
        btnLeft.disabled = true;
      } else {
        btnLeft.disabled = false;
      }

      if (currentPage === pageCount - 1) {
        btnRight.disabled = true;
      } else {
        btnRight.disabled = false;
      }
      filtering_object = { ...filtering_object, page: [`${i + 1}`] };
      hashUrl(filtering_object);
    });
  });
  const btnLeft = document.querySelector(".next_pagi");
  const btnRight = document.querySelector(".prev_pagi");
  if (currentPage === 0) {
    btnLeft.disabled = true;
  }
  if (pageCount === 1 || currentPage === pageCount - 1) {
    btnRight.disabled = true;
  }
  btnLeft.addEventListener("click", () => {
    filtering_object = {
      ...filtering_object,
      page: [`${currentPage + 1 - 1}`],
    };
    hashUrl(filtering_object);
    prevPage(btnLeft, btnRight, elements);
  });
  btnRight.addEventListener("click", () => {
    filtering_object = {
      ...filtering_object,
      page: [`${currentPage + 2}`],
    };
    hashUrl(filtering_object);
    nextPage(btnLeft, btnRight, elements, pageCount);
  });
}

//////////////////////////////
// Creating pagination buttons
//////////////////////////////
function paginationButton(page) {
  let button = document.createElement("button");

  button.innerText = page + 1;

  if (currentPage == page) button.classList.add("active");

  return button;
}
//////////////////////////////////////////////
// Functions creating Next and previous button
//////////////////////////////////////////////
function prevPage(btnleft, btnRight, elements) {
  btnContainer.childNodes.forEach((btn) => {
    btn.classList.remove("active");
  });

  if (currentPage <= 0) {
    currentPage = 0;
  } else {
    currentPage--;
    btnRight.disabled = false;
  }

  if (currentPage === 0) {
    btnleft.disabled = true;
    updateTheHashOnAll("page");
  } else {
    btnleft.disabled = false;
  }
  paginatingElements(elements, imageBox, rows, currentPage);
  btnContainer
    .querySelector(`.button_${currentPage + 1}`)
    .classList.add("active");
}

function nextPage(btnleft, btnRight, elements, pc) {
  btnContainer.childNodes.forEach((btn) => {
    btn.classList.remove("active");
  });

  if (currentPage < pc - 1) {
    currentPage++;
    btnleft.disabled = false;
  } else {
    currentPage = pc - 1;
  }
  if (currentPage === pc - 1) {
    btnRight.disabled = true;
  } else {
    btnRight.disabled = false;
  }

  paginatingElements(elements, imageBox, rows, currentPage);
  btnContainer
    .querySelector(`.button_${currentPage + 1}`)
    .classList.add("active");
}

//////////////////////////////////
// Functions that provides sorting
//////////////////////////////////
function getMaxObjectDescending(items, start, field) {
  let lowest = items[start];
  let min_location = start;

  for (let i = start; i < items.length; i++) {
    let initial1 = items[i].fields[field].split(/\//);
    let converter1 = [initial1[1], initial1[0], initial1[2]].join("/");
    let initial2 = lowest.fields[field].split(/\//);
    let converter2 = [initial2[1], initial2[0], initial2[2]].join("/");
    if (new Date(converter1).getTime() < new Date(converter2).getTime()) {
      lowest = items[i];
      min_location = i;
    }
  }
  return { min_obj: lowest, min_index: min_location };
}

function sortByDescending(items, field) {
  for (let j = 0; j < items.length; j++) {
    const { min_obj, min_index } = getMaxObjectDescending(items, j, field);
    items[min_index] = items[j];
    items[j] = min_obj;
  }
  return items;
}

function getMaxObjectAscending(items, start, field) {
  let lowest = items[start];
  let min_location = start;

  for (let i = start; i < items.length; i++) {
    let initial1 = items[i].fields[field].split(/\//);
    let converter1 = [initial1[1], initial1[0], initial1[2]].join("/");
    let initial2 = lowest.fields[field].split(/\//);
    let converter2 = [initial2[1], initial2[0], initial2[2]].join("/");

    if (new Date(converter1).getTime() > new Date(converter2).getTime()) {
      lowest = items[i];
      min_location = i;
    }
  }
  return { min_obj: lowest, min_index: min_location };
}

function sortByAscending(items, field) {
  for (let j = 0; j < items.length; j++) {
    const { min_obj, min_index } = getMaxObjectAscending(items, j, field);
    items[min_index] = items[j];
    items[j] = min_obj;
  }
  return items;
}

//////////////////
// Search function
//////////////////
const searchingFunction = () => {
  if (searchInput.value.length === 0) {
    imageSearchText.innerHTML = ``;
    updateTheHashOnAll("title");
    delete filtering_object.title;
    if (filtering_object) {
      arrForSort = arrForSearch;
      if (filtering_object.sortBy) {
        const sort = filtering_object.sortBy[0].split("-");
        if (sort[0] === "Release Date") {
          if (sort[1] === "ascending") {
            asc = false;
            releaseDateSorting();
          } else {
            asc = true;
            releaseDateSorting();
          }
        }
        if (sort[0] === "Title") {
          if (sort[1] === "ascending") {
            asct = false;
            titleSorting();
          } else {
            asct = true;
            titleSorting();
          }
        }
      } else {
        paginatingElements(arrForSearch, imageBox, rows, currentPage);
        setupPagination(arrForSearch, btnContainer, rows);
      }
    } else {
      arrForSort = arrOfEl;
      paginatingElements(arrOfEl, imageBox, rows, currentPage);
      setupPagination(arrOfEl, btnContainer, rows);
    }
  } else {
    emptyArrS = [];
    let searchReverse = false;
    for (let i = 0; i < 2; i++) {
      if (!searchReverse) {
        arrForSearch.forEach((el) => {
          if (
            el.fields["Designer (Text)"]
              .toLowerCase()
              .indexOf(searchInput.value.toLowerCase()) !== -1
          ) {
            emptyArrS.push(el);
          }
        });
        if (emptyArrS.length === 0) {
          searchReverse = true;
        }
      } else {
        const s = searchInput.value.split(" ").reverse().join(" ");
        arrForSearch.forEach((el) => {
          if (
            el.fields["Designer (Text)"]
              .toLowerCase()
              .indexOf(s.toLowerCase()) !== -1
          ) {
            emptyArrS.push(el);
          }
        });
        searchReverse = false;
      }
    }

    arrForSort = [...new Set(emptyArrS)];

    paginatingElements(arrForSort, imageBox, rows, currentPage);
    setupPagination(arrForSort, btnContainer, rows);
    imageSearchText.innerHTML = `You searched for "${searchInput.value}"`;
    filtering_object = { ...filtering_object, title: [searchInput.value] };
    hashUrl(filtering_object);
  }
};
searchBtn.addEventListener("click", () => {
  if (filtering_object.modal) {
    modalHashArr = [];
    delete filtering_object.modal;
  }
  searchingFunction();
});

////////////////////
// Hash URL Function
////////////////////

function hashUrl(obj) {
  let hash = "";

  function getHashed(hash, elem, name) {
    hash += `&${name}=`;
    elem.forEach((el, i) => {
      hash += `${el}`;
      if (i !== elem.length - 1) {
        hash += `,`;
      }
    });
    return hash;
  }

  if (obj.sortBy) {
    hash = getHashed(hash, obj.sortBy, "sortBy");
  }

  if (obj.year) {
    let lowestToHighest = obj.year.sort((a, b) => a - b);
    obj.year = lowestToHighest;
    hash = getHashed(hash, obj.year, "year");
  }

  if (obj.furniture) {
    hash = getHashed(hash, obj.furniture, "furniture");
  }

  if (obj.vendor) {
    obj.vendor = [...obj.vendor].sort().reverse();
    hash = getHashed(hash, obj.vendor, "vendor");
  }

  if (obj.page) {
    hash = getHashed(hash, obj.page, "page");
  }

  if (obj.title) {
    hash = getHashed(hash, obj.title, "title");
  }

  if (obj.modal) {
    hash = getHashed(hash, obj.modal, "modal");
  }

  window.location.hash = hash.slice(1);
}

function updateTheHashOnAll(value) {
  let updateHash = window.location.hash;

  let remove;
  if (updateHash.includes(value)) {
    if (updateHash.indexOf(value) > -1) {
      remove = updateHash.replace(
        updateHash.slice(0, updateHash.indexOf(value)),
        ""
      );
    }
  } else {
    remove = "";
  }
  let removed;

  if (remove.indexOf("&") > -1) {
    removed = updateHash.replace(remove.slice(0, remove.indexOf("&") + 1), "");
  } else {
    if (updateHash.indexOf("&") > -1) {
      remove = `&${remove}`;
    }
    removed = updateHash.replace(remove.slice(0, remove.length), "");
  }

  updateHash = removed;

  if (removed === "#") {
    function removeHash() {
      let scrollV,
        scrollH,
        loc = window.location;
      if ("pushState" in history)
        history.pushState("", document.title, loc.pathname + loc.search);
      else {
        scrollV = document.body.scrollTop;
        scrollH = document.body.scrollLeft;

        loc.hash = "";

        document.body.scrollTop = scrollV;
        document.body.scrollLeft = scrollH;
      }
    }
    removeHash();
  } else {
    window.location.hash = updateHash;
  }
}

function createObjectFromString(str) {
  const keyObj = str.slice(0, str.indexOf("="));
  const valueObj = str.slice(str.indexOf("=") + 1).split(",");
  if (keyObj === "vendor" || keyObj === "title" || keyObj === "sortBy") {
    valueObj.forEach((c, i) => {
      let v = c.replace(/%20/g, " ");
      valueObj[i] = v;
    });
  }
  return { [keyObj]: valueObj };
}

function convertHashIntoObject() {
  const hash = window.location.hash;
  const removeHash = hash.replace("#", "");
  let str = removeHash;
  let indices = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "&") indices.push(i);
  }
  let obj = {};
  Object.assign(obj, createObjectFromString(removeHash.slice(0, indices[0])));
  indices.forEach((c, i) => {
    Object.assign(
      obj,
      createObjectFromString(removeHash.slice(c + 1, indices[i + 1]))
    );
  });
  return obj;
}
