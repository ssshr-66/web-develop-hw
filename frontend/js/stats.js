async function init() {
    await checkAuth();
    await Promise.all([
        loadOverview(),
        loadDepartment(),
        loadHire(),
        loadAttendance()
    ]);
}

async function loadOverview() {
    const data = await statsAPI.getOverview();
    if (data.code === 200) {
        const d = data.data;
        document.getElementById('overview').innerHTML = `
            <div class="stat-card">
                <div class="stat-value">${d.totalEmployees}</div>
                <div class="stat-label">员工总数</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${d.totalDepartments}</div>
                <div class="stat-label">部门总数</div>
            </div>
        `;
    }
}

async function loadDepartment() {
    const data = await statsAPI.getDepartment();
    if (data.code === 200) {
        const depts = data.data;
        document.getElementById('department').innerHTML = Object.entries(depts).map(([name, count]) => `
            <div class="dept-item">
                <div class="dept-name">${name}</div>
                <div class="dept-count">${count}人</div>
            </div>
        `).join('');
    }
}

async function loadHire() {
    const data = await statsAPI.getHire();
    if (data.code === 200) {
        const d = data.data;
        document.getElementById('hire').innerHTML = `
            <div class="stat-card">
                <div class="stat-value">${d.thisMonth}</div>
                <div class="stat-label">本月入职</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${d.thisYear}</div>
                <div class="stat-label">本年入职</div>
            </div>
        `;
    }
}

async function loadAttendance() {
    const data = await statsAPI.getAttendance();
    if (data.code === 200) {
        const d = data.data;
        document.getElementById('attendance').innerHTML = `
            <div class="stat-card">
                <div class="stat-value">${d.total}</div>
                <div class="stat-label">总记录数</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${d.normal}</div>
                <div class="stat-label">正常出勤</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${d.rate}%</div>
                <div class="stat-label">出勤率</div>
            </div>
        `;
    }
}

init();
