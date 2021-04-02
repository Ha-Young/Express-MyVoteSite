const date = document.querySelector(".input-date");
const container = document.querySelector(".create-option-container");
const plusButton = document.querySelector(".add-option");
const minusButton = document.querySelector(".delete-option");

function addOption(e) {
    e.preventDefault();

    const option = document.createElement("input");

    option.classList.add("option");
    option.setAttribute("name", "option");
    container.appendChild(option);
}

function deleteOption(e) {
    e.preventDefault();

    const numberOfChild = container.childElementCount;

    if (numberOfChild === 2) {
        return;
    }

    container.removeChild(container.lastChild);
}

function setMinDate() {
    let today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    if (mm < 10) {
        mm = "0" + mm;
    }

    if (dd < 10) {
        dd = "0" + dd;
    }

    today = yyyy + "-" + mm + "-" + dd;
    date.setAttribute("min", today);
}

function init() {
    setMinDate();
    plusButton.addEventListener("click", addOption);
    minusButton.addEventListener("click", deleteOption);
}

init();
