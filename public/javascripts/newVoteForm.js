const $optionsNumber = document.getElementById("options-number");
const $optionsContainer = document.getElementById("options-container");
const $newVoteForm = document.getElementById("new-vote-form");
const $year = document.getElementById("year");
const $month = document.getElementById("month");
const $date = document.getElementById("date");
const $hours = document.getElementById("hours");
const $minutes = document.getElementById("minutes");
const $dates = document.getElementsByClassName("dates");

const now = new Date();
$year.value = now.getFullYear();
$month.value = now.getMonth() + 1;
$date.value = now.getDate();
$hours.value = now.getHours();
$minutes.value = now.getMinutes();

(function () {
  let columnsNum = Number($optionsNumber.value);

  $optionsNumber.addEventListener("change", (event) => {
    const changedColumnsNum = Number(event.target.value);

    if (changedColumnsNum > columnsNum) {
      const newColumns = document.createElement("input");
      newColumns.name = "option";
      newColumns.className = "invalid option";
      newColumns.placeholder = "후보를 정해주세요";
      $optionsContainer.appendChild(newColumns);
    } else {
      $optionsContainer.removeChild($optionsContainer.lastChild);
    }

    columnsNum = changedColumnsNum;
  });
})();

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

const voteExpiration = {
  year: Number($year.value),
  month: Number($month.value),
  date: Number($date.value),
  hours: Number($hours.value),
  minutes: Number($minutes.value),
};

$newVoteForm.addEventListener("keyup", (event) => {
  const eventName = event.target.name;
  const value = event.target.value.trimStart();
  const numberVal = Number(value);
  const now = new Date();

  switch (eventName) {
    case "title":
      if (!value) {
        event.target.value = value;
        event.target.className = " invalid";
        validations.title.isValid = false;
      } else {
        event.target.className = "";
        validations.title.isValid = true;
      }

      break;
    case "option":
      if (!value) {
        event.target.value = value;
        event.target.className = event.target.className + " invalid";
        validations.option.isValid = false;
      } else {
        event.target.className = "option";
        const options = document.getElementsByClassName("option");
        let isValid = true;
        for (const option of options) {
          if (option.className.includes("invalid")) {
            isValid = false;
            break;
          }
        }
        validations.option.isValid = isValid;
      }

      break;
    case "year": case "month": case "date": case "hours": case "minutes":
      voteExpiration[eventName] = numberVal;

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

        if (isInvalidExpireDate) {
          [...$dates].forEach(date => date.className = "dates invalid");
        } else {
          [...$dates].forEach(date => date.className = "dates");
          validations.date.isValid = true;
        }
      break;
  }
});

$newVoteForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  for (const key in validations) {
    if (!validations[key].isValid) {
      return alert(validations[key].message);
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

  if (result === "success") return location.replace("/votings/success");
});
