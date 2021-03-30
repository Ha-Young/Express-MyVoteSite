const $addOptionButton = document.querySelector(".add-option-button");
const $deleteOptionButton = document.querySelector(".delete-option-button");
const $options = document.querySelector(".options");

const handleAddOptionButtonClick = () => {
  console.log("add option.");
};

const handleDeleteOptionButtonClick = () => {
  console.log("delete option.");
};

$addOptionButton.addEventListener("click", handleAddOptionButtonClick);
$deleteOptionButton.addEventListener("click", handleDeleteOptionButtonClick);
