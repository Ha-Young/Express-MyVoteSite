const deleteButton = document.getElementById("deleteButton");

const deleteVoting = async (votingId) => {
  await fetch(`http://localhost:3000/voting/votings/${votingId}`, {
    method: "DELETE",
  });

  location.replace("/");
};

deleteButton.addEventListener("click", (event) => {
  const votingId = event.target.name;

  event.preventDefault();
  deleteVoting(votingId);
});
