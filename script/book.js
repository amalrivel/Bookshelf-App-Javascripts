import { saveDataToLocalStorage, loadDataFromLocalStorage } from "./storage.js";

let books = loadDataFromLocalStorage() || [];

function updateBookUI() {
  const incompleteBookList = document.getElementById("incompleteBookList");
  const completeBookList = document.getElementById("completeBookList");

  incompleteBookList.innerHTML = "";
  completeBookList.innerHTML = "";

  books.forEach((book) => {
    const bookElement = createBookElement(book);

    if (book.isComplete) {
      completeBookList.appendChild(bookElement);
    } else {
      incompleteBookList.appendChild(bookElement);
    }
  });

  if (incompleteBookList.children.length === 0) {
    const emptyMessageIncomplete = document.createElement("p");
    emptyMessageIncomplete.textContent = "Tidak ada buku di daftar ini.";
    emptyMessageIncomplete.className = "text-gray-500 text-center";
    incompleteBookList.appendChild(emptyMessageIncomplete);
  }

  if (completeBookList.children.length === 0) {
    const emptyMessageComplete = document.createElement("p");
    emptyMessageComplete.textContent = "Tidak ada buku di daftar ini.";
    emptyMessageComplete.className = "text-gray-500 text-center";
    completeBookList.appendChild(emptyMessageComplete);
  }
}

function createBookElement(book) {
  const bookItem = document.createElement("div");
  bookItem.setAttribute("data-bookid", book.id);
  bookItem.setAttribute("data-testid", "bookItem");
  bookItem.className = book.isComplete
    ? "p-5 border-2 border-purple-200 rounded-lg hover:shadow-md transition-shadow"
    : "p-5 border-2 border-orange-200 rounded-lg hover:shadow-md transition-shadow";

  bookItem.innerHTML = `
      <h3 data-testid="bookItemTitle" class="text-lg font-bold mb-2 text-gray-900">${
        book.title
      }</h3>
      <p data-testid="bookItemAuthor" class="text-sm text-gray-700 mb-1">Penulis: ${
        book.author
      }</p>
      <p data-testid="bookItemYear" class="text-sm text-gray-700 mb-3">Tahun: ${
        book.year
      }</p>
      <div class="flex flex-wrap gap-2">
        <button data-testid="bookItemIsCompleteButton" class="${
          book.isComplete
            ? "px-3 py-2 text-xs font-medium rounded-lg bg-orange-100 text-orange-700 hover:bg-orange-200 transition-colors"
            : "px-3 py-2 text-xs font-medium rounded-lg bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors"
        }">
          ${book.isComplete ? "Belum selesai dibaca" : "Selesai dibaca"}
        </button>
        <button data-testid="bookItemDeleteButton" class="px-3 py-2 text-xs font-medium rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors">Hapus Buku</button>
        <button data-testid="bookItemEditButton" class="px-3 py-2 text-xs font-medium rounded-lg bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors">Edit Buku</button>
      </div>
    `;

  const toggleButton = bookItem.querySelector(
    '[data-testid="bookItemIsCompleteButton"]'
  );
  toggleButton.addEventListener("click", () => {
    toggleBookStatus(book.id);
  });

  const deleteButton = bookItem.querySelector(
    '[data-testid="bookItemDeleteButton"]'
  );
  deleteButton.addEventListener("click", () => {
    deleteBook(book.id);
  });

  const editButton = bookItem.querySelector(
    '[data-testid="bookItemEditButton"]'
  );
  editButton.addEventListener("click", () => {
    editBook(book.id);
  });

  return bookItem;
}

const addBook = () => {
  const titleInput = document.getElementById("bookFormTitle");
  const authorInput = document.getElementById("bookFormAuthor");
  const yearInput = document.getElementById("bookFormYear");
  const isCompleteInput = document.getElementById("bookFormIsComplete");

  const id = new Date().getTime().toString();
  const title = titleInput.value;
  const author = authorInput.value;
  const year = parseInt(yearInput.value, 10);
  const isComplete = isCompleteInput.checked;

  const newBook = { id, title, author, year, isComplete };
  books.push(newBook);

  saveDataToLocalStorage(books);
  updateBookUI();

  titleInput.value = "";
  authorInput.value = "";
  yearInput.value = "";
  isCompleteInput.checked = false;
};

function toggleBookStatus(bookId) {
  const bookIndex = books.findIndex((book) => book.id === bookId);
  if (bookIndex !== -1) {
    books[bookIndex].isComplete = !books[bookIndex].isComplete;
    saveDataToLocalStorage(books);

    updateBookUI();
  }
}

function deleteBook(bookId) {
  const bookIndex = books.findIndex((book) => book.id === bookId);
  if (bookIndex !== -1) {
    if (confirm("Apakah Anda yakin ingin menghapus buku ini?")) {
      books.splice(bookIndex, 1);
      saveDataToLocalStorage(books);

      updateBookUI();
    }
  }
}

function editBook(id) {
  const book = books.find((book) => book.id === id);
  if (!book) return;

  const dialog = document.getElementById("editBookDialog");

  document.getElementById("editBookId").value = book.id;
  document.getElementById("editBookTitle").value = book.title;
  document.getElementById("editBookAuthor").value = book.author;
  document.getElementById("editBookYear").value = book.year;
  document.getElementById("editBookIsComplete").checked = book.isComplete;

  dialog.classList.remove("hidden");
}

const saveEditedBook = () => {
  const id = document.getElementById("editBookId").value;
  const title = document.getElementById("editBookTitle").value;
  const author = document.getElementById("editBookAuthor").value;
  const year = parseInt(document.getElementById("editBookYear").value, 10);
  const isComplete = document.getElementById("editBookIsComplete").checked;

  const bookIndex = books.findIndex((book) => book.id === id);
  if (bookIndex !== -1) {
    books[bookIndex] = {
      ...books[bookIndex],
      title,
      author,
      year,
      isComplete,
    };

    saveDataToLocalStorage(books);
    updateBookUI();

    document.getElementById("editBookDialog").classList.add("hidden");
  }
};

const searchBooks = (keyword) => {
  if (keyword.trim() === "") {
    updateBookUI();
    return;
  }

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(keyword.toLowerCase())
  );

  displayFilteredBooks(filteredBooks);
};

const displayFilteredBooks = (filteredBooks) => {
  const incompleteBookList = document.getElementById("incompleteBookList");
  const completeBookList = document.getElementById("completeBookList");

  incompleteBookList.innerHTML = "";
  completeBookList.innerHTML = "";

  filteredBooks.forEach((book) => {
    const bookElement = createBookElement(book);

    if (book.isComplete) {
      completeBookList.appendChild(bookElement);
    } else {
      incompleteBookList.appendChild(bookElement);
    }
  });

  if (incompleteBookList.children.length === 0) {
    const emptyMessageIncomplete = document.createElement("p");
    emptyMessageIncomplete.textContent = "Tidak ada buku di daftar ini.";
    emptyMessageIncomplete.className = "text-gray-500 text-center";
    incompleteBookList.appendChild(emptyMessageIncomplete);
  }

  if (completeBookList.children.length === 0) {
    const emptyMessageComplete = document.createElement("p");
    emptyMessageComplete.textContent = "Tidak ada buku di daftar ini.";
    emptyMessageComplete.className = "text-gray-500 text-center";
    completeBookList.appendChild(emptyMessageComplete);
  }
};

export { updateBookUI, addBook, saveEditedBook, searchBooks };
