const STORAGE_KEY = "BOOKSHELF_APPS";

function isLocalStorageAvailable() {
  try {
    return typeof Storage !== "undefined";
  } catch (e) {
    return false;
  }
}

function saveDataToLocalStorage(books) {
  if (isLocalStorageAvailable()) {
    const serializedData = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, serializedData);
  }
}

function loadDataFromLocalStorage() {
  if (isLocalStorageAvailable()) {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    if (serializedData) {
      return JSON.parse(serializedData);
    }
  }
  return [];
}

export { saveDataToLocalStorage, loadDataFromLocalStorage };
