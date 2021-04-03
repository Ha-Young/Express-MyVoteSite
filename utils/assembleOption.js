function assembleOption(options) {
  const assembledOptions = [];
  let count = 0;

  while (options[count]) {
    assembledOptions.push(options[count]);
    count++;
  }

  return assembledOptions.map(option => ({ text: option }));
}

module.exports = assembleOption;
