const $addOptionButton = document.querySelector(".add-vote-option");
const $optionText = document.querySelector("#options");
const $optionSelect = document.querySelector(".vote-options");

$addOptionButton.addEventListener("click", () => {
  if ($optionText.value === "") {
    return;
  }
  console.log($optionText.value);

  const opt = document.createElement("option");
  opt.selected = true;
  opt.text = `${$optionText.value}`;

  $optionSelect.add(opt, null);
  $optionText.value = "";
});

console.log($addOptionButton);
