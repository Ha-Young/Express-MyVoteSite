const addBtn = document.querySelector(".add-btn");
const optionList = document.querySelector(".option-list");

addBtn.addEventListener("click", () => {
  event.preventDefault();

  const input = document.createElement("input");

  input.setAttribute("type", "text");
  input.setAttribute("id", "option");
  input.setAttribute("name", "option");

  optionList.appendChild(input);
});
