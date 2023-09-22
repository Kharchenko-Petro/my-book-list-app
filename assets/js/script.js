// Book Class: Represent a Book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI Class: Handle UI Tasks

class UI {
  static displayBooks() {
    // const StoredBooks = [
    //   {
    //     title: "Book One",
    //     author: "John Doe",
    //     isbn: "3434434",
    //   },
    //   {
    //     title: "Book Two",
    //     author: "Jane Doe",
    //     isbn: "45545",
    //   },
    // ];

    const books = Store.getBook();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector("#book-list");

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">x</a></td>
    `;

    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    const addBookInput = document.querySelector("#add-book-input");

    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    addBookInput.after(div);
    // Vanish 3 second
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }
}

// Store Class: Handles Storage
class Store {
  // Get Books from Storage
  static getBook() {
    let books;

    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  // Add Book to Storage
  static addBook(book) {
    const books = Store.getBook();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  // Remove Book from Storage
  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach( (book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    })

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// Events: Display Books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// Events: Add a Book
document.querySelector("#book-form").addEventListener("submit", (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  // Validate
  if (title === "" || author === "" || isbn === "") {
    UI.showAlert("Please fill in all fields", "danger");
  } else {
    // Instatiate book
    const book = new Book(title, author, isbn);

    // AddBook to UI
    UI.addBookToList(book);

    // Show succes message
    UI.showAlert("Book Added", "success");

    // Clear Fields
    UI.clearFields();
  }
});

// Events: Remove a Book
document.querySelector("#book-list").addEventListener("click", (e) => {
  UI.deleteBook(e.target);

  UI.showAlert("Book Removed", "success");
});
