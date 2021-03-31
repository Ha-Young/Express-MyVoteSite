import showModal from "./modal.js";

const deleteButton = document.querySelector("#deleteButton");
const submitButton = document.querySelector("#submitButton");
const id = window.location.pathname.substring(9);

if (deleteButton) {
  deleteButton.addEventListener("click", async () => {
    try {
      const response = await fetch(`/votings/${id}`, {
        method: "DELETE"
      });
      const { result } = await response.json();
      showModal(result);
    } catch (err) {
      console.log(err);
    }
  });
}

submitButton.addEventListener("click", async () => {
  const optionInputs = document.querySelectorAll("input:checked");
  const options = Array.prototype.slice.call(optionInputs).map(input => input.value);

  try {
    const response = await fetch(`/votings/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ options })
    });
    const result = await response.json();

    if (result.error) {
      const validationText = document.querySelector(".validation");
      validationText.classList.remove("hidden");
      validationText.textContent = result.error.msg;
    } else {
      showModal(result.result)
    }
  } catch (err) {
    console.error(err);
  }
});


