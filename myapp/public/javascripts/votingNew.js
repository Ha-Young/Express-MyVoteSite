console.log("hello");

const $votingNewItem = document.querySelector(".voting-new-item");
const $addBtn = document.querySelector(".add-btn");
const $deleteBtn = document.querySelector(".delete-btn");
let itemNum = 0;

$addBtn.addEventListener("click", () => {
  const $input = document.createElement("input");
  itemNum++;

  $input.type = "text";
  $input.name = `item-${itemNum}`;
  $input.autocomplete = "off";
  $input.placeholder = "투표항목을 입력하세요 : )";

  $votingNewItem.appendChild($input);
});

$deleteBtn.addEventListener("click", () => {
  const lastChild = $votingNewItem.lastChild;

  if (lastChild) {
    itemNum--;
    lastChild.remove();
  }
});
