const deleteBtn = document.querySelector(".delete-btn");

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
  console.log("💣")
  deleteVoting();
});
