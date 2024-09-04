//Array to store all the objects
const myLibrary = [];

function books(title, author, pages, hasRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;

  this.info = function () {
    let readStatus = this.hasRead ? "Already Read" : "Not Read yet ";

    return `${this.title} by ${this.author} Number of Pages is ${this.pages} , ${readStatus}`;
  };
}

//method to toggle the read status
books.prototype.toggleReadStatus = () => {
  this.hasRead = !this.hasRead;
};

// function to add a new book to the library
function addBookToLibrary(book) {
  myLibrary.push(book);
  displayBooks();
}

//function to display all books in the library array
function displayBooks() {
  const libraryDiv = document.getElementById("library");
  libraryDiv.innerHTML = ``; // emptying the documents

  //create a book card
  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    //display book info
    bookCard.innerHTML = `
    <p><strong> ${book.title}</strong> by ${book.author}</p>
    <p>Number of Pages is ${book.pages}</p>
    <p> ${book.hasRead ? "Already Read" : "Not Read yet "}</p>
        
    `;

    // button Remove Book
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove Book";
    removeButton.addEventListener("click", () => {
      myLibrary.splice(index, 1);
      displayBooks();
    });
    bookCard.appendChild(removeButton);

    //append Book Card to the library div

    libraryDiv.appendChild(bookCard);
  });
}

// Event Listner for the "NEW BOOK" button
document.getElementById("newBookBtn").addEventListener("click", () => {
  document.getElementById("bookFormContainer").classList.toggle("hidden");
});

// Handle Form Submission
document.getElementById("bookForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // get form data

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const hasRead = document.getElementById("hasRead").checked;
  // create a  new book object and add it to library

  const newBook = new books(title, author, pages, hasRead);
  addBookToLibrary(newBook);

  // Clear the form and hide id
  this.reset();
  document.getElementById("bookFormContainer").classList.add("hidden");
});

// Manually add a few books for testing
addBookToLibrary(new books("The Hobbit", "J.R.R. Tolkien", 295, false));
addBookToLibrary(new books("1984", "George Orwell", 328, true));
