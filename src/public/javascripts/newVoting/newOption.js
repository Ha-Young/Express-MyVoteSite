const optionContainer = document.querySelector(".option-container");
const option = document.querySelector(".option");
const addOptionButton = document.querySelector(".add-option-button");

const newOption = () => {
  const optionClone = option.cloneNode(true);
  optionClone.firstChild.value = "";

  return optionClone;
};

const handleoptionList = () => {
  const optionList = document.querySelectorAll(".option");

  for (const option of optionList) {
    const removeOptionButton = option.lastChild;

    if (optionList.length > 2) {
      removeOptionButton.classList.remove("blind");
      removeOptionButton.classList.add("show");
    } else {
      removeOptionButton.classList.remove("show");
      removeOptionButton.classList.add("blind");
    }

    if (optionList.length > 4) {
      addOptionButton.disabled = "disabled";
    } else {
      addOptionButton.disabled = null;
    }

    removeOptionButton.removeEventListener("click", handleremoveOptionButonClick);
    removeOptionButton.addEventListener("click", handleremoveOptionButonClick);
  }
};

const handleremoveOptionButonClick = (e) => {
  e.target.parentNode.remove();

  handleoptionList();
};

const handleAddOptionButonClick = () => {
  optionContainer.appendChild(newOption());

  handleoptionList();
};

const newOptionHandler = () => {
  addOptionButton.addEventListener("click", handleAddOptionButonClick);
};

newOptionHandler();
