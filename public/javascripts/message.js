const resultDiv = document.querySelector('h1');

if (resultDiv) {
  const timeoutId = window.setTimeout(() => {
    window.location.href = '/';

    clearTimeout(timeoutId);
  }, 1000);
}
