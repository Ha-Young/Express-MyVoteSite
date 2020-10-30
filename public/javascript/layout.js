const logoutBtn = document.getElementById('logout');
logoutBtn?.addEventListener('click', async (e) => {
  e.preventDefault();

  const confirm = window.confirm('로그아웃 하시겠습니까?');

  if (confirm) {
    const result = await axios.get('/users/logout');

    if (result.data.success) {
      window.location.href = '/';
    }
  }
});
