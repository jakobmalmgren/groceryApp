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
  onValue,
  remove,
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

onValue(shoppingListInDB, function (snapshot) {
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());

    clearShoppinglistEl();
    for (let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i];
      let currentItemId = currentItem[0];
      let currentItemValue = currentItem[1];
      addProducts(currentItem);
    }
  } else {
    shoppingListEl.innerHTML = "No items yet..";
  }
});

addButtonEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value;

  push(shoppingListInDB, inputValue);

  //   addProducts(inputValue);
  clearInputFieldEl();
});

function clearInputFieldEl() {
  inputFieldEl.value = "";
}
function addProducts(value) {
  //   shoppingListEl.innerHTML += `<li>${value}</li>`;
  let itemId = value[0];
  let itemValue = value[1];
  let newEl = document.createElement("li");
  newEl.textContent = itemValue;
  shoppingListEl.append(newEl);
  newEl.addEventListener("click", function () {
    let exactLocationDb = ref(database, `shoppingList/${itemId}`);
    remove(exactLocationDb);
  });
}
function clearShoppinglistEl() {
  shoppingListEl.innerHTML = "";
}
