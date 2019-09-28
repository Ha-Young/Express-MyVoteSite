var $voteTitle = document.querySelector('.title-txt');
var $voteOptions = document.querySelectorAll('input[name="options"]');
var $date = document.querySelectorAll('.date');
var $votingForm = document.querySelector('.vote-form');

var DATE_REGEX = /^(19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[0-1])([1-9]|[01][0-9]|2[0-3])([0-5][0-9])$/;

onKeyupCheckLength($voteTitle, 50);
onSubmitValidateVote ($votingForm, $date);

$voteOptions.forEach(function (elem) {
  onKeyupCheckLength(elem, 80);
});

function onKeyupCheckLength (elem, max) {
  elem.addEventListener('keyup', function (e) {
    var target = e.currentTarget;
    var targetLen = target.value.trim().length;
    var $info = target.parentElement.querySelector('.info-txt');

    if (targetLen > max || targetLen < 1) {
      $info.classList.add('warn-txt');
    } else {
      $info.classList.remove('warn-txt');
    }
  });
}

function onSubmitValidateVote (form, dateElem) {
  form.addEventListener('submit', function (e) {
    dateElem.forEach(function (elem) {
      elem.value = elem.value.length === 1 ? '0' + elem.value : elem.value;
    });

    var date = [...dateElem].map(function (elem, i) {
      if (i === 1) {
        var month = (Number(elem.value) - 1).toString();
        return month.length === 1 ? '0' + month : month;
      }
      return elem.value;
    });

    if (!DATE_REGEX.test(date.join(''))) {
      e.preventDefault();
      dateElem[0].focus();
      alert('Not a valid date or time format. YYYY-MM-DD hh:ss');
      return;
    }

    if (new Date() - new Date(...date) > 0) {
      e.preventDefault();
      dateElem[0].focus();
      alert('Expiry date should be greater than current date');
      return;
    }
  });
}
