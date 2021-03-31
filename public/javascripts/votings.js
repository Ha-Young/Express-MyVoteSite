const form = document.querySelector(".outer-form");
const deleteBtn = document.querySelector(".delete-btn");
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

const deleteVoting = async () => {
  try {
    await fetch(`http://localhost:3000/votings/${form.name}`, {
      method: "DELETE",
    });
  } catch(e) {
    console.error(e);
  }

  window.location.href = "/";
};

homeBtn.addEventListener("click", () => {
  event.preventDefault();

  window.location.href = "/";
});

deleteBtn.addEventListener("click", async () => {
  event.preventDefault();

  deleteVoting();
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
