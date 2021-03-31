const form = document.querySelector(".outer-form");
const submitBtn = document.querySelector(".submit-btn");
const homeBtn = document.querySelector(".home-btn");

const updateVoting = async (option, targetIndex) => {
  if (!document.cookie.includes("access_token")) {
    window.location.href = "/";

    return;
  }

  try {
    await fetch(`http://localhost:3000/votings/${form.name}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        option
      })
    });

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

