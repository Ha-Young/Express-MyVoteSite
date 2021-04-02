(function () {
  const buttonAddOption = document.querySelector(".button-add-option");
  const optionInputContainer = document.querySelector(".option-input-container");

  function insertOptionbBox() {
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("name", "option");

    optionInputContainer.appendChild(input);
  }

  buttonAddOption.addEventListener("click", insertOptionbBox);
})();
