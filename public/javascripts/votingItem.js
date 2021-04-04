let isClicked = false;

function sendAjax(url, id) {
  if (isClicked) {
    return;
  }

  isClicked = true;
  const xhr = new XMLHttpRequest();
  xhr.open('POST', url);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({ id }));
  xhr.addEventListener('load', res => {
    if (!res.returnValue) {
      console.log('실패');
      return;
    }
    try {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const target = [].slice.call(document.querySelectorAll('.options'))
          .filter(option => option.dataset.id === id);
        target[0].classList.add('selectedOption');

        const targetLikes = document.querySelector('.likes');
        targetLikes.textContent = parseInt(targetLikes.textContent, 10) + 1;
      }
    } catch (err) {
      console.log('실패');
    }
  });
}
