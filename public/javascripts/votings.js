const form = document.querySelector(".outer-form");
const submitBtn = document.querySelector(".submit-btn");
const homeBtn = document.querySelector(".home-btn");

const updateVoting = async (option, targetIndex) => {
  if (!document.cookie.includes("access_token")) {
    window.location.href = `/login?pageId=${form.name}`;

    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/votings/${form.name}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        option
      })
    });

    if (response.status === 400) {
      alert("이미 투표를 하셨습니다 다음에 이용해주세요");
    }

    if(response.status === 200) {
      alert("투표가 성공적으로 반영되었습니다 👏🏻");
    }

    window.location.href = "/";
  } catch(e) {
    console.error(e);
  }
};

homeBtn.addEventListener("click", () => {
  event.preventDefault();

  window.location.href = "/";
});

submitBtn.addEventListener("click", async () => {
  event.preventDefault();

  const radios = document.querySelectorAll(".radio");

  let checkedValue = null;
  let targetIndex = null;

  radios.forEach((radio, index) => {
    if (radio.checked === true) {
      checkedValue = radio.value;
      targetIndex = index;
    }
  });

  await updateVoting(checkedValue, targetIndex);
});
