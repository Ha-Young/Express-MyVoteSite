const $detailItems = document.querySelectorAll(".detail-item");

const onClickVotingOption = (ev) => {
  const xhr = new XMLHttpRequest();
  const dbId = ev.target.dataset.id;

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log("AJAX Response Success");
      console.log(xhr.responseText);
    }
  };

  xhr.open("POST", "/ajax/changeVotingCount");
  xhr.setRequestHeader("Content-Type", "application/json");

  const data = JSON.stringify({ dbId });
  xhr.send(data);
};

$detailItems.forEach((dom) => {
  dom.addEventListener("click", onClickVotingOption);
});
