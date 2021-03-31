/* eslint-disable no-undef */
const API_VOTES = "http://localhost:3000/api/votes";

window.api = window.api || {};

window.api.vote = (function () {
  async function getVotes({
    condition = "all",
    page = 1,
    limit = 10,
    sort_field,
    sort_order,
  }) {
    const votes_url = new URL(API_VOTES);

    const params = {
      condition,
      page,
      limit,
      sort_field,
      sort_order,
    };

    Object.keys(params).forEach(key =>
      votes_url.searchParams.append(key, params[key])
    );

    const response = await window.fetch(votes_url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    });

    return await response.json();
  }

  return {
    getVotes,
  };
})();
