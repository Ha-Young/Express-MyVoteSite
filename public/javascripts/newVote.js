const addOptionButton = document.querySelector(".add-vote-option");
const optionText = document.querySelector("#options");
const optionSelect = document.querySelector(".vote-options");

addOptionButton.addEventListener("click", () => {
  if (optionText.value === "") {
    return;
  }
  const option = document.createElement("option");
  option.selected = true;
  option.text = `${optionText.value}`;

  optionSelect.add(option, null);
  optionText.value = "";
});
