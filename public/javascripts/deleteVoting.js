const deleteButton = document.getElementById("deleteButton");

const deleteVoting = async (votingId) => {
  await fetch(`/voting/votings/${votingId}`, {
    method: "DELETE",
  });

  location.replace("/");
};

deleteButton.addEventListener("click", () => {
  const votingId = event.target.name;

  event.preventDefault();
  deleteVoting(votingId);
});
