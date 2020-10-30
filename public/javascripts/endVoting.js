let biggestNum = 1;

$votingCheckBoxes.forEach((votingCheckBox) => {
  const {
    dataset: { votedNum },
  } = votingCheckBox;

  if (biggestNum < Number(votedNum)) {
    biggestNum = Number(votedNum);
  }
});

$votingCheckBoxes.forEach((votingCheckBox) => {
  const {
    dataset: { votedNum },
  } = votingCheckBox;

  if (biggestNum === Number(votedNum)) {
    votingCheckBox.nextSibling.style.backgroundColor = '#4a274f';
    votingCheckBox.nextSibling.style.transform = 'scale(1.2)';
  }
});

$checkBoxLabels.forEach((checkBoxLabel) =>
  checkBoxLabel.removeEventListener('click', handleLabelClick)
);
