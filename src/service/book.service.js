const bookService = {
  initBook() {
    localStorage.setItem("BOOK", JSON.stringify([]));
  },

  setBook(BookData) {
    const newData = JSON.parse(localStorage.getItem("BOOK"));
    newData.push(BookData);
    localStorage.setItem("BOOK", JSON.stringify(newData));
  },

  unsetBook() {
    localStorage.removeItem("BOOK");
  },

  getBook() {
    return JSON.parse(localStorage.getItem("BOOK"));
  },
};

export { bookService };
