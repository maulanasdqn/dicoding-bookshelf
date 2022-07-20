import { bookService } from "../service/book.service.js";

class useBookStore {
  constructor() {
    this.book = bookService.getBook() ? bookService.getBook() : [];
  }

  fetchBook() {
    return this.book;
  }

  retrieveBook(id) {
    this.bookById = this.book.filter((x) => x.id === id);
    return this.bookById;
  }

  updateBook(payload) {
    const { id, title, author, year, isComplete } = payload;
    const index = this.book.findIndex((x) => x.id === id);
    this.book[index] = Object.assign({}, this.book[index], payload);
    this.createBook(payload);
    console.log(payload)
  }

  createBook(newBook) {
    bookService.setBook(newBook);
    return this.book.push(newBook);
  }

  searchBook(val) {
    const filtered = this.book.filter((x) =>
      x.title.toLowerCase().includes(val.toLowerCase()) || x.author.toLowerCase().includes(val.toLowerCase())
    );
    return filtered;
  }

   unsetBook() {
    this.book = [];
    bookService.unsetBook();
  }
}

export { useBookStore };
