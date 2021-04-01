function addInput() {
  const button = document.querySelector(".voting-add-button");

  button.addEventListener("click", (ev) => {
    ev.preventDefault();

    const inputBox = document.querySelector(".voting-input-box");
    const newInput = document.createElement("input");

    newInput.classList.add("voting-input");

    newInput.setAttribute("placeholder", "option");
    newInput.setAttribute("name", "options");

    inputBox.appendChild(newInput);
  });
}

addInput();
