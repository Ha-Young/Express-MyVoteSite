function addInput() {
  const button = document.querySelector("button");

  button.addEventListener("click", (ev) => {
    ev.preventDefault();
    
    const inputBox = document.querySelector(".input-box");
    const newInput = document.createElement("input");
  
    newInput.classList.add("voting-input");

    newInput.setAttribute("placeholder", "option");
    newInput.setAttribute("name", "voting_options");
  
    inputBox.appendChild(newInput);
  });
}

addInput();
