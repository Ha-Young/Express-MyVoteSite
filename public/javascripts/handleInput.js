const addButton = document.querySelector(".voting-add-button");

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
	
	if (inputBox.length > 2) {

	}

	inputBox.removeChild(newInput);
}

addButton.addEventListener("click", addInput);
