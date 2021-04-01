let isClicked = false;

function sendAjax(url, id) {
  console.log('clicked');
  if (isClicked) {
    console.log('중복 투표');
    return;
  }
  const xhr = new XMLHttpRequest();
  xhr.open('POST', url);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({ id }));

  xhr.addEventListener('load', res => {
    if (!res.returnValue) {
      alert('더이상 존재하지 않는 투표입니다.');
    }

    const target = [].slice.call(document.querySelectorAll('.options'))
      .filter(option => option.dataset.id === id);
    target[0].removeAttribute('onclick');
    target[0].classList.add('selectedOption');

    const targetLikes = document.querySelector('.likes');
    targetLikes.textContent = parseInt(targetLikes.textContent, 10) + 1;
  });

  isClicked = true;
}
