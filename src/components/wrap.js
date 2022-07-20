import { bookService } from "../service/book.service.js";
import { useBookStore } from "../store/book.js";

bookService.getBook() === null ? bookService.initBook() : "";

const store = new useBookStore();

const inputAuthor = document.querySelector("#author");
const inputTitle = document.querySelector("#title");
const inputComplete = document.querySelector("#complete");
const inputYear = document.querySelector("#year");
const inputSearch = document.querySelector("#search");
const submitButton = document.querySelector("#btn-submit");
const form = document.querySelector("form");
const searchButton = document.querySelector("#search-btn");

let bookData = store.fetchBook();
let tempData;

const setPayload = () => {
  const payload = {
    id: new Date().getTime(),
    author: inputAuthor.value,
    title: inputTitle.value,
    year: inputYear.value,
    isComplete: inputComplete.checked,
  };

  store.createBook(payload);
  form.reset();
  initOutput();
};

const updateBook = () => {};

const searchBook = (val) => {
  bookData = store.searchBook(val);
  initOutput();
};

submitButton.addEventListener("click", () => setPayload());
searchButton.addEventListener("click", () => searchBook(inputSearch.value));

const initOutput = () => {
  const wrap = document.querySelector("#wrap");
  const wrapUncomplete = document.querySelector("#wrap-uncomplete");

  const bookCompleted = bookData.filter((x) => x.isComplete === true);
  const bookUncompleted = bookData.filter((x) => x.isComplete === false);

  const completed = () => {
    let output = "";
    for (let i = 0; i < bookCompleted.length; i++) {
      output += `
<div onclick="${store.updateBook({
        id: bookCompleted[i].id,
        author: bookCompleted[i].author,
        title: bookCompleted[i].title,
        year: bookCompleted[i].year,
        isComplete: false,
      })}" class="bg-blue-400 p-2 rounded-lg flex flex-col shadow-md gap-y-2 h-full w-full">
      <span class="text-white font-medium">Author : ${
        bookCompleted[i].author
      }</span>
      <span class="text-white font-normal">Title : ${
        bookCompleted[i].title
      }</span>
      <span class="text-white font-normal">Year : ${
        bookCompleted[i].year
      }</span>
      <span id="status-comp" class="font-medium p-2 w-auto text-center my-2 rounded-xl bg-green-200 text-green-600">Completed</span>
      <span class="bg-white font-semibold text-red-700 p-2 h-auto flex rounded-xl justify-center items-center">Delete</span>
  </div>
  `;
    }
    return output;
  };

  const uncompleted = () => {
    let output = "";
    for (let i = 0; i < bookUncompleted.length; i++) {
      output += `
  <div class="bg-blue-400 p-2 rounded-lg flex-col flex shadow-md gap-y-2">
    <span class="text-white font-medium">Author : ${bookUncompleted[i].author}</span>
    <span class="text-white font-normal">Title : ${bookUncompleted[i].title}</span>
    <span class="text-white font-normal">Year : ${bookUncompleted[i].year}</span>
    <span id="status-uncom" class="font-medium p-2 w-auto text-center my-2 rounded-xl bg-yellow-200 text-yellow-600">Uncompleted</span>
    <span class="bg-white font-semibold text-red-700 p-2 h-auto flex rounded-xl justify-center items-center">Delete</span>
  </div>
  `;
    }
    return output;
  };

  wrap.innerHTML = completed();
  wrapUncomplete.innerHTML = uncompleted();
};

export { initOutput };
