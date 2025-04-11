// Do your work here...
import { updateBookUI, addBook, saveEditedBook, searchBooks } from "./book.js";

document.addEventListener("DOMContentLoaded", () => {
  // Form tambah buku
  const bookForm = document.getElementById("bookForm");
  bookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addBook();
  });

  // Form edit buku
  const editBookForm = document.getElementById("editBookForm");
  editBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    saveEditedBook();
  });

  // Tombol batal edit
  const editBookCancel = document.getElementById("editBookCancel");
  editBookCancel.addEventListener("click", () => {
    document.getElementById("editBookDialog").classList.add("hidden");
  });

  // Form pencarian
  const searchForm = document.getElementById("searchBook");
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const keyword = document.getElementById("searchBookTitle").value;
    searchBooks(keyword);
  });

  updateBookUI();
});
