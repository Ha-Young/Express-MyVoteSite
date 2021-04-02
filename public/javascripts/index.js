const placeholderTarget = [].slice.call(document.querySelectorAll('.textBox'));

if (placeholderTarget.length) {
  placeholderTarget.forEach(element => {
    const input = element.querySelector('input');

    input.addEventListener('focus', () => {
      if (input.value === '') {
        input.labels[0].setAttribute('style', 'opacity: 0;');
      }
    });

    input.addEventListener('focusout', () => {
      if (input.value === '') {
        input.labels[0].setAttribute('style', 'opacity: 1;');
      }
    });
  });
}
