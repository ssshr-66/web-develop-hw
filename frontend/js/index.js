// index.js
// 首页逻辑（index.html）
//
//   - init()    页面初始化：校验登录状态，显示欢迎的用户名
//   - logout()  退出登录并跳转回登录页
async function init() {
    const user = await checkAuth();
    if (user) {
        document.getElementById('user').textContent = `欢迎，${user.username}`;
    }
}

async function logout() {
    await authAPI.logout();
    navigate('login.html');
}

init();
