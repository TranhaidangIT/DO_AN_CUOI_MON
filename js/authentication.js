/**
 * authentication.js
 * Quản lý trạng thái đăng nhập / đăng xuất trên tất cả các trang.
 * Dữ liệu user lưu trong localStorage, phiên đăng nhập trong sessionStorage.
 */

function checkAuthentication() {
  const authDiv    = document.getElementById('authentication');
  const userDiv    = document.getElementById('user-info');
  const principal  = document.getElementById('principal');
  const logoutBtn  = document.getElementById('logout');

  const session = sessionStorage.getItem('loggedInUser');

  if (session) {
    const user = JSON.parse(session);
    if (authDiv)   authDiv.classList.add('hidden');
    if (userDiv)   userDiv.classList.remove('hidden');
    if (principal) principal.textContent = user.fullname || user.username;
  } else {
    if (authDiv)  authDiv.classList.remove('hidden');
    if (userDiv)  userDiv.classList.add('hidden');
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', function (e) {
      e.preventDefault();
      logout();
    });
  }
}

function logout() {
  sessionStorage.removeItem('loggedInUser');
  window.location.href = '/page/logout.html';
}
