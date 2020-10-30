function processVotingLists(votingLists) {
  return votingLists
    .filter((votingList) => votingList !== '')
    .map((votingList) => {
      return { listTitle: votingList };
    });
}

module.exports = processVotingLists;
