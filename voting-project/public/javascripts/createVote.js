var $btn = document.querySelector("#plus");
var $div = document.querySelector("#frist");
var cnt = 0;
$btn.addEventListener("click", () => {
  if (cnt < 3) {
    const $div2 = document.createElement("div");
    $div2.classList.add("options-wrapper");
    const $liInner =
      `<label>` +
      `<input class="input-vote-form-plus" type="text" name="options">` +
      "<br>" +
      `<button class="del del${cnt}" type="button">X</button>` +
      `</label>`;
    $div2.innerHTML = $liInner;
    $div.appendChild($div2);
    const $btn2 = document.querySelector(`.del${cnt}`);
    $btn2.addEventListener("click", ev => {
      ev.currentTarget.parentNode.parentNode.remove();
      cnt--;
    });
    cnt++;
  } else {
    alert("최대 5개 까지 가능합니다.");
  }
});
var today = new Date();
var day = today.getDate();
var month = today.getMonth() + 1;
var year = today.getFullYear();
if (day < 10) day = "0" + day;
if (month < 10) month = "0" + month;
today = year + "-" + month + "-" + day;
document.getElementById("datefield").setAttribute("min", today);
