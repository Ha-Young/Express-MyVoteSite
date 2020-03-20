setInterval(() => {

  const endDate = document.querySelectorAll('.endDate');
  const progress = document.querySelectorAll('.progress');

  let now = new Date();
  let year = String(now.getFullYear());
  let month = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : String(now.getMonth());
  let date = now.getDate() < 10 ? '0' + now.getDate() : String(now.getDate());
  let hours = now.getHours() < 10 ? '0' + now.getHours() : String(now.getHours());
  let minutes = now.getMinutes() < 10 ? '0' + now.getMinutes() : String(now.getMinutes());

  for (let i = 0; i < endDate.length; i++) {

    const result = `${year}-${month}-${date}.${hours}:${minutes}`;

    if (endDate[i].textContent === result && progress[i].textContent === '진행 중') {
      fetch('/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ date: result })
      })
        .then((res) => {
          return res.json();
        })
        .then((myJson) => {
          if (myJson.result === 'ok') {
            progress[i].textContent = '진행 종료';
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

}, 1000);
