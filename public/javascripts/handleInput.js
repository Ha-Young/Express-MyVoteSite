const addButton = document.querySelector(".voting-add-button");
const deleteButton = document.querySelector(".voting-delete-button");

function addInput(ev) {
	ev.preventDefault();

	const inputBox = document.querySelector(".voting-input-box");
	const newInput = document.createElement("input");

	newInput.classList.add("voting-input");

	newInput.setAttribute("placeholder", "option");
	newInput.setAttribute("name", "options");

	inputBox.appendChild(newInput);
}

function deleteInput(ev) {
	ev.preventDefault();

	const inputBox = document.querySelector(".voting-input-box");
	const inputList = document.getElementsByName("options");
	
	if (inputList.length > 2) {
		const lastInput = inputList[inputList.length - 1];
		inputBox.removeChild(lastInput);

		return;
	}

	const votingError = document.querySelector(".new-voting-error");
	votingError.textContent = "2개 이하는 지울 수 없습니다!"
}

addButton.addEventListener("click", addInput);
deleteButton.addEventListener("click", deleteInput);
