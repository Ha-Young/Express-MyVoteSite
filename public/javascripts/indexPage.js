/* eslint-disable no-undef */
const voteListElement = document.querySelector(".votes");

const API_VOTE = window.api.vote;
const TEMPLATES = window.templates;
const setInfiniteScroll = window.setInfiniteScroll;
const PATH = window.myPathController;

let currentPage = 0;

const DEFAULT_PARAM_GET_VOTES = {
  condition: "all",
  page: 1,
  limit: 30,
  sort_field: "expire_datetime",
  sort_order: 1,
};

async function getVotes() {
  console.log("here");
  const condition = PATH.searchParam("filter");

  const votesWithPage = await API_VOTE.getVotes({
    ...DEFAULT_PARAM_GET_VOTES,
    condition: condition || "all",
    page: currentPage++,
  });

  const votes = votesWithPage.docs;

  const votesHTMLTemplate = TEMPLATES.voteItemListTemplate(votes);

  voteListElement.insertAdjacentHTML("beforeend", votesHTMLTemplate);
}

async function indexPageInit() {
  await getVotes();

  setInfiniteScroll(getVotes);
}

indexPageInit();
