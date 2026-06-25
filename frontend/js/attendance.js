// attendance.js
// 考勤管理页面逻辑（attendance.html）
//
// 负责考勤页面的交互与渲染：
//   - init()          页面初始化：校验登录、加载员工下拉、加载考勤列表
//   - loadEmployees() 加载员工列表，填充筛选与表单的下拉选项
//   - loadData()      按员工/月份分页查询并渲染考勤表格
//   - loadStats()     查询并渲染考勤统计（总天数、正常、缺勤、请假、病假、出勤率）
//   - showModal/hideModal  显示/隐藏新增或编辑弹窗
//   - edit(id)        载入指定记录到表单进行编辑
//   - save()          保存（新增或更新）考勤记录
//   - del(id)         删除考勤记录
//   - prevPage/nextPage  分页翻页
let page = 1, size = 10, currentId = null;
let empMap = {};

async function init() {
    await checkAuth();
    await loadEmployees();
    await loadData();
}

async function loadEmployees() {
    const data = await employeeAPI.getList({ size: 1000 });
    if (data.code === 200) {
        const list = data.data.records;
        list.forEach(e => empMap[e.id] = e.name);
        const sel1 = document.getElementById('employeeId');
        const sel2 = document.getElementById('empId');
        const opts = list.map(e => `<option value="${e.id}">${e.name}</option>`).join('');
        sel1.innerHTML += opts;
        sel2.innerHTML = opts;
    }
}

async function loadData() {
    const employeeId = document.getElementById('employeeId').value;
    const month = document.getElementById('month').value;
    const params = { page, size };
    if (employeeId) params.employeeId = employeeId;
    if (month) params.month = month;

    const data = await attendanceAPI.getList(params);
    if (data.code === 200) {
        const list = data.data.records;
        document.getElementById('tbody').innerHTML = list.map(a => `
            <tr>
                <td>${empMap[a.employeeId] || a.employeeId}</td>
                <td>${a.attendanceDate}</td>
                <td>${a.status}</td>
                <td>${a.remark || ''}</td>
                <td class="actions">
                    <button class="btn-primary" onclick="window.edit(${a.id})">编辑</button>
                </td>
            </tr>
        `).join('');
        document.getElementById('pageInfo').textContent = `${page} / ${data.data.pages}`;
    }
}

async function loadStats() {
    const employeeId = document.getElementById('employeeId').value;
    const month = document.getElementById('month').value;
    const params = {};
    if (employeeId) params.employeeId = employeeId;
    if (month) params.month = month;

    const data = await attendanceAPI.getStats(params);
    if (data.code === 200) {
        const s = data.data;
        document.getElementById('stats').innerHTML = `
            <div class="stat-item"><div class="stat-value">${s.total}</div><div class="stat-label">总天数</div></div>
            <div class="stat-item"><div class="stat-value">${s.normal}</div><div class="stat-label">正常</div></div>
            <div class="stat-item"><div class="stat-value">${s.absent}</div><div class="stat-label">缺勤</div></div>
            <div class="stat-item"><div class="stat-value">${s.leave}</div><div class="stat-label">请假</div></div>
            <div class="stat-item"><div class="stat-value">${s.sick}</div><div class="stat-label">病假</div></div>
            <div class="stat-item"><div class="stat-value">${s.rate}%</div><div class="stat-label">出勤率</div></div>
        `;
    }
}

function showModal(id) {
    currentId = id || null;
    document.getElementById('modalTitle').textContent = id ? '编辑考勤' : '添加考勤';
    if (!id) {
        document.getElementById('date').value = new Date().toISOString().split('T')[0];
        document.getElementById('status').value = '正常';
        document.getElementById('remark').value = '';
    }
    document.getElementById('modal').style.display = 'flex';
}

function hideModal() {
    document.getElementById('modal').style.display = 'none';
}

async function edit(id) {
    const data = await attendanceAPI.getList({ page: 1, size: 1000 });
    if (data.code === 200) {
        const a = data.data.records.find(r => r.id === id);
        document.getElementById('empId').value = a.employeeId;
        document.getElementById('date').value = a.attendanceDate;
        document.getElementById('status').value = a.status;
        document.getElementById('remark').value = a.remark || '';
        showModal(id);
    }
}

async function save() {
    const body = {
        employeeId: document.getElementById('empId').value,
        attendanceDate: document.getElementById('date').value,
        status: document.getElementById('status').value,
        remark: document.getElementById('remark').value
    };

    const data = currentId
        ? await attendanceAPI.update(currentId, body)
        : await attendanceAPI.create(body);

    if (data.code === 200) {
        hideModal();
        loadData();
    }
}

async function del(id) {
    if (!confirm('确定删除？')) return;
    const data = await attendanceAPI.delete(id);
    if (data.code === 200) {
        loadData();
    }
}

function prevPage() {
    if (page > 1) {
        page--;
        loadData();
    }
}

function nextPage() {
    page++;
    loadData();
}

// 暴露函数到全局作用域供 HTML onclick 使用
window.loadData = loadData;
window.loadStats = loadStats;
window.showModal = showModal;
window.hideModal = hideModal;
window.edit = edit;
window.save = save;
window.del = del;
window.prevPage = prevPage;
window.nextPage = nextPage;

init();
