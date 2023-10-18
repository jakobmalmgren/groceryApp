// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
// import {
//   getDatabase,
//   ref,
//   push,
// } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// const appSettings = {
//   databaseUrl:
//     "https://realtime-database-a0b56-default-rtdb.europe-west1.firebasedatabase.app/",
// };
// const app = initializeApp(appSettings);
// const database = getDatabase(app);
// const shoppingListInDb = ref(database, "shoppingList");

// const input = document.getElementById("input-field");
// const button = document.getElementById("add-button");
// button.addEventListener("click", value);
// function value() {
//   let inputValue = input.value;
//   push(shoppingListInDb, inputValue);
//   console.log(inputValue);
// }

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://realtime-database-a0b56-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");

addButtonEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value;

  push(shoppingListInDB, inputValue);

  console.log(inputValue);
  addProducts(inputValue);
  clearInputFieldEl();
});

function clearInputFieldEl() {
  inputFieldEl.value = "";
}
function addProducts(value) {
  shoppingListEl.innerHTML += `<li>${value}</li>`;
}
