const addBtn = document.querySelector(".add-btn");
const optionList = document.querySelector(".optionList");

addBtn.addEventListener("click", () => {
  const input = document.createElement("input");

  input.setAttribute("type", "text");
  input.setAttribute("id", "option");
  input.setAttribute("name", "option");

  optionList.appendChild(input);
});
