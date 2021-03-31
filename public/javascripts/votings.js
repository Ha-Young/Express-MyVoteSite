const form = document.querySelector(".outer-form");
const deleteBtn = document.querySelector(".delete-btn");
const submitBtn = document.querySelector(".submit-btn");

const updateVoting = async (option) => {
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

deleteBtn.addEventListener("click", async () => {
  event.preventDefault();

  deleteVoting();
});

submitBtn.addEventListener("click", async () => {
  event.preventDefault();

  const radios = document.querySelectorAll(".radio");
  let checkedValue = null;

  radios.forEach(radio => {
    if (radio.checked === true) {
      checkedValue = radio.value;
    }
  });

  await updateVoting(checkedValue);
});
