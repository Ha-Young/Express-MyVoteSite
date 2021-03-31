(function () {
  const buttonAddOption = document.querySelector(".button-add-option");
  const inputContainer = document.querySelector(".input-container");

  function insertOptionbBox() {
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("name", "option");

    inputContainer.appendChild(input);
  }

  buttonAddOption.addEventListener("click", insertOptionbBox);
})()
