/* eslint-disable no-undef */
const API_VOTES = "http://localhost:3000/api/votes";
const API_VOTE_TO_OPTION = `vote-to-option`;

window.api = window.api || {};

window.api.vote = (function () {
  async function getVotes({
    condition = "all",
    page = 1,
    limit = 10,
    sort_field,
    sort_order,
  }) {
    const votesURL = new URL(API_VOTES);

    const params = {
      condition,
      page,
      limit,
      sort_field,
      sort_order,
    };

    Object.keys(params).forEach(key =>
      votesURL.searchParams.append(key, params[key])
    );

    const response = await window.fetch(votesURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  }

  async function voteToOption({ voteId, optionId }) {
    const voteToOptionURL = `${API_VOTES}/${voteId}/${API_VOTE_TO_OPTION}`;

    const postBody = {
      optionId,
    };

    const response = await window.fetch(voteToOptionURL, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(postBody),
    });

    return await response.json();
  }

  return {
    getVotes,
    voteToOption,
  };
})();
