exports.makeOptionObject = optionsArr => {
  let result = [];
  optionsArr.forEach((option, index) => {
    const optionObject = {
      content: option,
      index: index,
      chosen_by: []
    };

    result.push(optionObject);
  });
  return result;
};

exports.checkWasVoting = (arr, userId) => {
  let wasVoting = false;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].chosen_by.length; j++) {
      if (JSON.stringify(arr[i].chosen_by[j]) === JSON.stringify(userId)) {
        wasVoting = true;
      }
    }
  }
  return wasVoting;
};

exports.makeOptionsData = arr => {
  let result = [];
  arr.forEach(value => {
    result.push({
      content: value.content,
      count: value.chosen_by.length
    });
  });

  return result;
};
