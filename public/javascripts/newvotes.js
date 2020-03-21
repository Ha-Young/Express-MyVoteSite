const closeButton = document.querySelector("#close-button");
const addButton = document.querySelector(".add-button");
const optionDiv = document.querySelector(".options > div");

closeButton.addEventListener("click", () => {
  location.assign(location.origin);
});

let counter = 3;

addButton.addEventListener("click", () => {
  const optionInputField = document.createElement("input");

  optionInputField.setAttribute("type", "text");
  optionInputField.setAttribute("placeholder", "항목 입력");
  optionInputField.setAttribute("name", `option${counter}`);
  optionInputField.classList.add("option");

  counter++;

  optionDiv.appendChild(optionInputField);
});

const resetButton = document.querySelector(".reset-button");
resetButton.addEventListener("click", () => {
  window.location.reload();
});

const createVote = async (e) => {
  e.preventDefault();
  const userReaction = window.confirm("투표를 생성하시겠습니까?");

  if (userReaction) {
    const createVoteForm = document.querySelector(".newvote-form");

    let reqBody = {};
    Object.keys(createVoteForm.elements).forEach(key => {
      const element = createVoteForm.elements[key];
      if (element.type !== "submit") {
        reqBody[element.name] = element.value;
      }
    });

    const response = await fetch("/votings", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(reqBody)
    });

    if (response.status === 200) {
      window.alert("성공적으로 투표를 등록했습니다! 메인 페이지로 이동합니다.");
      location.assign(location.origin);
    } else {
      window.alert("투표 생성에 실패했습니다! 투표 생성 페이지로 돌아갑니다.");
      location.reload();
    }
  }
};
