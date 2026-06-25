let isLogin = true;

function toggleMode() {
    isLogin = !isLogin;
    document.getElementById('title').textContent = isLogin ? '登录' : '注册';
    document.querySelector('button').textContent = isLogin ? '登录' : '注册';
    document.getElementById('switchText').textContent = isLogin ? '没有账号？注册' : '已有账号？登录';
    clearError('error');
}

async function submit() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        showError('error', '请输入用户名和密码');
        return;
    }

    try {
        const data = isLogin
            ? await authAPI.login(username, password)
            : await authAPI.register(username, password);

        if (data.code === 200) {
            navigate('index.html');
        } else {
            showError('error', data.message);
        }
    } catch (error) {
        showError('error', '网络错误');
    }
}

// 回车提交
document.getElementById('password').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') submit();
});
