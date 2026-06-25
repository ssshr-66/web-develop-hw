let page = 1, size = 10, currentId = null;
let depts = [], deptMap = {};

async function init() {
    await checkAuth();
    await loadDepts();
    await loadData();
}

async function loadDepts() {
    const data = await departmentAPI.getAll();
    if (data.code === 200) {
        depts = data.data;
        depts.forEach(d => deptMap[d.id] = d.deptName);
        const sel = document.getElementById('departmentId');
        sel.innerHTML = depts.map(d => `<option value="${d.id}">${d.deptName}</option>`).join('');
    }
}

async function loadData() {
    const keyword = document.getElementById('keyword').value;
    const data = await employeeAPI.getList({ page, size, keyword });

    if (data.code === 200) {
        const list = data.data.records;
        document.getElementById('tbody').innerHTML = list.map(e => `
            <tr>
                <td>${e.employeeNo}</td>
                <td>${e.name}</td>
                <td>${deptMap[e.departmentId] || ''}</td>
                <td>${e.position || ''}</td>
                <td>${e.hireDate || ''}</td>
                <td>${e.phone || ''}</td>
                <td class="actions">
                    <button class="btn-primary" onclick="window.edit(${e.id})">编辑</button>
                </td>
            </tr>
        `).join('');
        document.getElementById('pageInfo').textContent = `${page} / ${data.data.pages}`;
    }
}

function showModal(id) {
    currentId = id || null;
    document.getElementById('modalTitle').textContent = id ? '编辑员工' : '添加员工';
    if (!id) {
        document.getElementById('employeeNo').value = '';
        document.getElementById('name').value = '';
        document.getElementById('position').value = '';
        document.getElementById('hireDate').value = '';
        document.getElementById('phone').value = '';
    }
    document.getElementById('modal').style.display = 'flex';
}

function hideModal() {
    document.getElementById('modal').style.display = 'none';
}

async function edit(id) {
    const data = await employeeAPI.getDetail(id);
    if (data.code === 200) {
        const e = data.data;
        document.getElementById('employeeNo').value = e.employeeNo;
        document.getElementById('name').value = e.name;
        document.getElementById('departmentId').value = e.departmentId;
        document.getElementById('position').value = e.position || '';
        document.getElementById('hireDate').value = e.hireDate || '';
        document.getElementById('phone').value = e.phone || '';
        showModal(id);
    }
}

async function save() {
    const body = {
        employeeNo: document.getElementById('employeeNo').value,
        name: document.getElementById('name').value,
        departmentId: document.getElementById('departmentId').value,
        position: document.getElementById('position').value,
        hireDate: document.getElementById('hireDate').value,
        phone: document.getElementById('phone').value
    };

    const data = currentId
        ? await employeeAPI.update(currentId, body)
        : await employeeAPI.create(body);

    if (data.code === 200) {
        hideModal();
        loadData();
    }
}

async function deleteEmployee(id) {
    if (!confirm('确定删除？')) return;
    const data = await employeeAPI.delete(id);
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
window.showModal = showModal;
window.hideModal = hideModal;
window.edit = edit;
window.save = save;
window.deleteEmployee = deleteEmployee;
window.prevPage = prevPage;
window.nextPage = nextPage;

init();
