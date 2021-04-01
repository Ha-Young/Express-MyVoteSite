import showModal from "./modal.js";

const submitButton = document.querySelector("#submitButton");
const options = document.querySelectorAll(".option-list li input");
const id = window.location.pathname.substring(9);
const cookie = document.cookie;

for (let i = 0; i < options.length; i++) {
  options[i].addEventListener("click", (event) => {
    const li = event.target.parentNode;
    if (li.classList.contains("checked")) {
      li.classList.remove("checked");
    } else {
      li.classList.add("checked");
    }
  });
}

submitButton.addEventListener("click", async () => {
  const optionInputs = document.querySelectorAll("input:checked");
  const options = Array.prototype.slice.call(optionInputs).map(input => input.value);

  if (!cookie.includes("accessToken")) {
    window.location = "/users/login";
    return;
  }

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
      showModal(result.result);
    }
  } catch (err) {
    console.error(err);
  }
});


