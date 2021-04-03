const redirectUrl = document.querySelector('input');

if (redirectUrl) {
  const timeoutId = window.setTimeout(() => {
    window.location.href = redirectUrl.value;

    clearTimeout(timeoutId);
  }, 1000);
}
