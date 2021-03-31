function filterOption(options) {
  const filteredOptions = [];
  let count = 0;

  while (options[count]) {
    filteredOptions.push(options[count]);
    count++;
  }

  return filteredOptions.map(option => ({ text: option }));
}

module.exports = filterOption;
