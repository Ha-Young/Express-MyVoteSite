function clickCheckBox(element) {
  const checkBoxes = document.getElementsByName("option");

  checkBoxes.forEach((checkBox) => {
    checkBox.checked = false;
  });

  element.checked = true;
}

module.exports = clickCheckBox;
