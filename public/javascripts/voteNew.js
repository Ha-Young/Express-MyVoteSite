const selectionDiv = document.querySelector(".voteNew__selections");

const addSelections = (event) => {
  const outerDiv = document.createElement("div");
  outerDiv.className = "selection__container";

  const dot = document.createElement("span");
  dot.textContent = "●";

  const titleInput = document.createElement("input");
  titleInput.className = "selection__title";
  titleInput.placeholder = "selection Title";
  titleInput.type = "text";
  titleInput.name = "selectionTitle";

  const imgInput = document.createElement("input");
  imgInput.className = "selection__image";
  imgInput.placeholder = "https://...";
  imgInput.type = "text";
  imgInput.name = "selectionImage";

  outerDiv.appendChild(dot);
  outerDiv.appendChild(titleInput);
  outerDiv.appendChild(imgInput);
  selectionDiv.appendChild(outerDiv);
};

addSelections();
addSelections();

document.getElementById("selectionPlus").addEventListener("click", addSelections);

document.getElementById("voteSubmitButton").addEventListener("click", (event) => {
  
});
