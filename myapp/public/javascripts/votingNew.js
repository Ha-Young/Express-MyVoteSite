const $item = document.querySelector(".item");
const $addBtn = document.querySelector(".add-btn");
const $deleteBtn = document.querySelector(".delete-btn");
const $votingNew = document.querySelector(".voting-new");

$addBtn.addEventListener("click", () => {
  const $input = document.createElement("input");

  $input.type = "text";
  $input.name = "items";
  $input.autocomplete = "off";
  $input.placeholder = "투표항목을 입력하세요 : )";

  $item.appendChild($input);
});

$deleteBtn.addEventListener("click", () => {
  const lastChild = $item.lastChild;

  if (lastChild) {
    lastChild.remove();
  }
});

$votingNew.addEventListener("submit", (ev) => {
  if ($item.childElementCount < 2) {
    ev.preventDefault();
    alert("투표항목을 2개 이상 입력해주세요 :(");
  }
});
