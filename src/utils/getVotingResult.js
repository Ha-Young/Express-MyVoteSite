exports.getVotingResult = (options) => {
  const hash = {};
  let biggest = 0;

  console.log(options)

  for (let i = 0; i < options.length; i++) {
    const count = options[i].selector.length;

    if (biggest < count) {
      biggest = count;
    }

    if (!hash[count]) {
      hash[count] = [options[i].title];
      continue;
    }

    if (hash[count]) {
      hash[count].push(options[i].title);
    }
  }
  console.log(hash)

  return hash[biggest];
};
