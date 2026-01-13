const addBookmarkButton = document.getElementById("add-bookmark");
const bookmarkName = document.getElementById("bookmark-name");
const bookmarkURL = document.getElementById("bookmark-url");
const bookmarkList = document.getElementById("bookmark-list");

document.addEventListener("DOMContentLoaded", loadBookmarks);

function handleAddBookmark() {
  const name = bookmarkName.value.trim();
  let url = bookmarkURL.value.trim();

  if (!name || !url) {
    alert("Please enter enter name and URL.");
  } else {
    if (!url.startsWith("https://")) {
      url = "https://" + url;
    }

    addBookmark(name, url);
    saveBookmark(name, url);
    bookmarkName.value = "";
    bookmarkURL.value = "";
  }
}

addBookmarkButton.addEventListener("click", handleAddBookmark); 

bookmarkName.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    handleAddBookmark();
  }
});

bookmarkURL.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    handleAddBookmark();
  }
});

function addBookmark(name, url) {
  const li = document.createElement("li");
  const link = document.createElement("a");
  link.href = url;
  link.textContent = name;
  link.target = "_blank";

  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.addEventListener("click", function () {
    bookmarkList.removeChild(li);
    removeBookmarkFromStorage(name, url);
  });

  li.appendChild(link);
  li.appendChild(removeButton);

  bookmarkList.appendChild(li);
}

function getBookmarksFromStorage() {
  const bookmarks = localStorage.getItem("bookmarks");
  return bookmarks ? JSON.parse(bookmarks) : [];
}

function saveBookmark(name, url) {
  const bookmarks = getBookmarksFromStorage();
  bookmarks.push({ name, url });
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function loadBookmarks() {
  const bookmarks = getBookmarksFromStorage();
  bookmarks.forEach((bookmark) => addBookmark(bookmark.name, bookmark.url));
}

function removeBookmarkFromStorage(name, url) {
  let bookmarks = getBookmarksFromStorage();
  bookmarks = bookmarks.filter(
    (bookmark) => bookmark.name !== name || bookmark.url !== url
  );
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}
