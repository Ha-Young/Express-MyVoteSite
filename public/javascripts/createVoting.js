const $addOptionButton = document.querySelector(".add-option-button");
const $options = document.querySelector(".options");

const cleanOptions = () => {
  const newOptions = Array.from($options.children);
  let index = 1;

  newOptions.forEach((option) => {
    const item = option.children.item(0);

    item.name = `option${index}`;
    item.placeholder = `option${index++}`;
  });
};

const handleAddOptionButtonClick = () => {
  const index = $options.children.length + 1;

  if (index > 7) {
    return;
  }

  const li = document.createElement("li");
  const input = document.createElement("input");
  const button = document.createElement("button");

  li.id = `option${index}`;
  input.classList.add("option");
  input.type = "text";
  input.name = `option${index}`;
  input.placeholder = `option${index}`;
  button.classList.add("delete-option-button");
  button.type = "button";
  button.textContent = "❌";

  li.appendChild(input);
  li.appendChild(button);
  $options.appendChild(li);
};

const handleDeleteOptionButtonClick = (e) => {
  const { type, parentNode } = e.target;

  if ($options.children.length <= 2
  || type !== "button"
  ) {
    return;
  }

  parentNode.remove();
  cleanOptions(e);
};

$addOptionButton.addEventListener("click", handleAddOptionButtonClick);
$options.addEventListener("click", handleDeleteOptionButtonClick);
