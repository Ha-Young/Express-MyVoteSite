const $optionsNumber = document.getElementById("options-number");
const $optionsContainer = document.getElementById("options-container");
const $newVoteForm = document.getElementById("new-vote-form");
const $year = document.getElementById("year");
const $month = document.getElementById("month");
const $date = document.getElementById("date");
const $hours = document.getElementById("hours");
const $minutes = document.getElementById("minutes");

const now = new Date();
$year.value = now.getFullYear();
$month.value = now.getMonth() + 1;
$date.value = now.getDate();
$hours.value = now.getHours();
$minutes.value = now.getMinutes();

const validations = {
  title: {
    isValid: false,
    message: "투표 주제를 입력해주세요",
  },
  option: {
    isValid: false,
    message: "투표 후보를 작성해주세요",
  },
  date: {
    isValid: false,
    message: "유효한 투표 만료 시간을 설정해주세요",
  },
};

(function () {
  let columnsNum = Number($optionsNumber.value);

  $optionsNumber.addEventListener("input", (event) => {
    const value = Number(event.target.value);
    const isInvalid
      = columnsNum + 1 !== value
      && columnsNum - 1 !== value
      && value < 2;

    if (isInvalid) return event.target.value = columnsNum;

    const changedColumnsNum = Number(event.target.value);

    if (changedColumnsNum > columnsNum) {
      const newColumns = document.createElement("input");
      newColumns.className = "option";
      newColumns.name = "option";
      newColumns.placeholder = "후보를 정해주세요";
      $optionsContainer.appendChild(newColumns);
      validations.option.isValid = false;
    } else {
      $optionsContainer.removeChild($optionsContainer.lastChild);
      [...$optionsContainer.children].some(optionEl => {
        if (optionEl.value.trim() === "") {
          validations.option.isValid = false;
          return true;
        }
        validations.option.isValid = true;
      });
    }
    columnsNum = changedColumnsNum;
  });
})();

const voteExpiration = {
  year: Number($year.value),
  month: Number($month.value),
  date: Number($date.value),
  hours: Number($hours.value),
  minutes: Number($minutes.value),
};

$newVoteForm.addEventListener("input", (event) => {
  const eventName = event.target.name;
  const value = event.target.value.trimStart();
  const now = new Date();

  switch (eventName) {
    case "title":
      if (!value) {
        event.target.value = value;
        validations.title.isValid = false;
      } else {
        validations.title.isValid = true;
      }

      break;
    case "option":
      if (!value) {
        event.target.value = value;
        validations.option.isValid = false;
      } else {
        event.target.className = "option";
        const options = document.getElementsByClassName("option");
        let isValid = true;

        for (const option of options) {
          if (option.value.trim() === "") {
            isValid = false;
            break;
          }
        }

        validations.option.isValid = isValid;
      }

      break;
    case "year": case "month": case "date": case "hours": case "minutes":
      voteExpiration[eventName] = Number(value);

      const expireDate = new Date(
        voteExpiration.year,
        voteExpiration.month - 1,
        voteExpiration.date,
        voteExpiration.hours,
        voteExpiration.minutes,
      );

      const isInvalidExpireDate
        = expireDate.toString() === "Invalid Date"
        || expireDate.getTime() < now.getTime();

      validations.date.isValid = isInvalidExpireDate ? false : true;

      break;
  }
});

$newVoteForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  for (const key in validations) {
    if (!validations[key].isValid) {
      const $warningBox = document.createElement("div");
      $warningBox.className = "warning-box";
      $warningBox.innerText = `${validations[key].message}🙄`;
      document.body.appendChild($warningBox);

      setTimeout(() => {
        document.body.removeChild($warningBox);
      }, 2000);
      return;
    }
  }

  const urlData = new URLSearchParams();

  for (const [key, value] of new FormData($newVoteForm)) {
    urlData.append(key, value);
  }

  const response = await fetch(
    location.href,
    { method: "POST", body: urlData },
  );

  const result = await response.text();

  if (result === "success") return location.assign("/votings/success");
});
