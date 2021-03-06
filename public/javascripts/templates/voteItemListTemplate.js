/* eslint-disable indent */
/* eslint-disable no-undef */
const voteItemListTemplate = (function () {
  function voteItemTemplate({
    _id,
    title,
    is_progress,
    entire_count,
    expire_datetime,
    createdAt,
    creator,
  }) {
    const creatorName = creator.name;

    const startDate = new Date(createdAt);
    const expiredDate = new Date(expire_datetime);
    const todayDate = new Date();
    const expiredDateLocaleString = expiredDate.toLocaleString();

    const percentage = Math.round(((todayDate - startDate) / (expiredDate - startDate)) * 100) + "%";

    const expiredPercent = is_progress ? percentage : "100%";

    return `
      <a href="votings/${_id}">
        <li class="vote-item">
          <span class="vote-name"> ${title}</span>

          <span class="vote-country grid-only"> ${creatorName}</span>

          <div class="pull-right">
            <span class="vote-progress">
              <span class="vote-progress-bg">
                <span class="vote-progress-fg" style="width: ${expiredPercent}"></span>
              </span>

              <span class="vote-progress-labels">
                <span class="vote-progress-label"> ${expiredPercent} </span>
                <span class="vote-completes"> ${entire_count}</span>
              </span>
            </span>

            <span class="vote-end-date ${!is_progress && "ended"}"> ${expiredDateLocaleString}</span>
            <span class="vote-stage">
              ${is_progress
                  ? `<span class="stage live">Live</span>`
                  : `<span class="stage ended">Ended</span>`
                }
            </span>
          </div>
        </li>
      </a>
    `;
  }

  return function (votes) {
    const voteItemTemplateList = votes.map(vote => voteItemTemplate(vote));

    return voteItemTemplateList.join("\n");
  };
})();

window.templates = {
  ...window.templates,
  voteItemListTemplate,
};
