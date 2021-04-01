function sendAjax(url, id) {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', url);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({ id }));

  xhr.addEventListener('load', () => {
    const target = [].slice.call(document.querySelectorAll('.options'))
      .filter(option => option.dataset.id === id);
    target[0].classList.add('selectedOption');
  });
}
