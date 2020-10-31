const filterSwitch = document.getElementById('expiredFilterSwitch');

filterSwitch.addEventListener('click', (e) => {
  const value = e.currentTarget.checked ? 'on' : 'off' ;

  window.location.href = `/?filterExpired=${value}`;
});
