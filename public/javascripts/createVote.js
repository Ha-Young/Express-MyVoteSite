import showModal from "./modal.js";

const addOptionButton = document.querySelector("#optionButton");
const optionList = document.querySelector(".option-list");
const clearAllOptionButton = document.querySelector("#clearAllOptionsButton");
const createVoteButton = document.querySelector("#createVoteButton");
let index = 0;

addOptionButton.addEventListener("click", () => {
  const li = document.createElement("li");
  const input = document.createElement("input");
  const deleteButton = document.createElement("button");

  input.setAttribute("name", "option_title");
  input.setAttribute("type", "text");
  input.setAttribute("data-index", index);
  input.setAttribute("required", true);

  deleteButton.textContent = "DELETE";
  deleteButton.setAttribute("type", "button");
  deleteButton.classList.add("button", "deleteButton", "red");

  li.append(input, deleteButton);
  optionList.appendChild(li);

  index++;

  removeOptions();
});

clearAllOptionButton.addEventListener("click", () => {
  optionList.innerHTML = "";
});

function removeOptions() {
  const deleteButtons = document.querySelectorAll(".deleteButton");
  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", (event) => {
      event.target.parentElement.remove();
      index--;
    });
  }
}
