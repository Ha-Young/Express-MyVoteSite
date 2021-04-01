const $detailItems = document.querySelectorAll(".detail-item");
const $detaiDeleteBtn = document.querySelector(".detail-delete-btn");

const onClickVotingOption = (ev) => {
  const xhr = new XMLHttpRequest();
  const votingId = ev.target.dataset.votingId;
  const optionId = ev.target.dataset.optionId;

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log("AJAX Response Success");
      const { count } = JSON.parse(xhr.responseText);

      const parseOptionContent = (content) => {
        const splitIdx = content.lastIndexOf(" ");
        const count = parseInt(content.slice(splitIdx), 10);
        const text = content.slice(0, splitIdx);
        return { count, text };
      };

      const { text } = parseOptionContent(ev.target.textContent);
      ev.target.textContent = `${text} ${count}`;
    }
  };

  xhr.open("POST", "/ajax/changeVotingCount");
  xhr.setRequestHeader("Content-Type", "application/json");

  const json = JSON.stringify({ votingId, optionId });
  xhr.send(json);
};

$detailItems.forEach((dom) => {
  dom.addEventListener("click", onClickVotingOption);
});

// $detaiDeleteBtn.addEventListener((ev) => {
//   ev.target.dataset.id
// })
