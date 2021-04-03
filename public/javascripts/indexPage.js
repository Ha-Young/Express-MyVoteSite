/* eslint-disable no-undef */
const voteListElement = document.querySelector(".votes");

const API_VOTE = window.api.vote;
const TEMPLATES = window.templates;
const setInfiniteScroll = window.setInfiniteScroll;
const PATH = window.myPathController;

let currentPage = 1;

const DEFAULT_PARAM_GET_VOTES = {
  condition: "all",
  page: 1,
  limit: 30,
  sort_field: "expire_datetime",
  sort_order: 1,
};

async function getVotes() {
  if (!currentPage) {
    return;
  }

  const condition = PATH.searchParam("filter");

  const votesWithPage = await API_VOTE.getVotes({
    ...DEFAULT_PARAM_GET_VOTES,
    condition: condition || "all",
    page: currentPage++,
  });

  const votes = votesWithPage.docs;

  if (votes.length === 0) {
    return;
  }

  const votesHTMLTemplate = TEMPLATES.voteItemListTemplate(votes);

  voteListElement.insertAdjacentHTML("beforeend", votesHTMLTemplate);

  currentPage = votesWithPage.nextPage;
}

async function indexPageInit() {
  await getVotes();

  setInfiniteScroll(getVotes);
}

indexPageInit();
