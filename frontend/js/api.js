// ============================================================
// Mock 模式 - 前端独立运行，无需后端和数据库
// 所有数据存储在内存中，支持增删改查
// ============================================================

// ---------- API 配置 ----------

const API_CONFIG = {
    MOCK_MODE: true,  // true=Mock数据, false=真实后端
    BASE_URL: 'http://localhost:8080/api'  // 后端地址
};

// 真实请求封装
async function request(url, options = {}) {
    try {
        const response = await fetch(API_CONFIG.BASE_URL + url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });
        return await response.json();
    } catch (error) {
        console.error('请求失败:', error);
        return { code: 500, message: '网络错误', data: null };
    }
}

// ---------- Mock 数据 ----------

let _nextId = { employee: 11, department: 6, attendance: 21, admin: 2 };

// 当前登录用户（模拟 session）
let _currentUser = null;

// 部门数据
let _departments = [
    { id: 1, deptCode: 'DEV', deptName: '研发部', createTime: '2024-01-01T10:00:00', updateTime: '2024-01-01T10:00:00' },
    { id: 2, deptCode: 'HR', deptName: '人力资源部', createTime: '2024-01-02T10:00:00', updateTime: '2024-01-02T10:00:00' },
    { id: 3, deptCode: 'SALES', deptName: '销售部', createTime: '2024-01-03T10:00:00', updateTime: '2024-01-03T10:00:00' },
    { id: 4, deptCode: 'FIN', deptName: '财务部', createTime: '2024-01-04T10:00:00', updateTime: '2024-01-04T10:00:00' },
    { id: 5, deptCode: 'MKT', deptName: '市场部', createTime: '2024-01-05T10:00:00', updateTime: '2024-01-05T10:00:00' }
];

// 员工数据
let _employees = [
    { id: 1, employeeNo: 'E001', name: '张三', departmentId: 1, position: 'Java工程师', hireDate: '2023-03-15', phone: '13800001001', createTime: '2023-03-15T08:00:00', updateTime: '2023-03-15T08:00:00', deleted: 0 },
    { id: 2, employeeNo: 'E002', name: '李四', departmentId: 1, position: '前端工程师', hireDate: '2023-06-01', phone: '13800001002', createTime: '2023-06-01T08:00:00', updateTime: '2023-06-01T08:00:00', deleted: 0 },
    { id: 3, employeeNo: 'E003', name: '王五', departmentId: 2, position: 'HR专员', hireDate: '2023-07-20', phone: '13800001003', createTime: '2023-07-20T08:00:00', updateTime: '2023-07-20T08:00:00', deleted: 0 },
    { id: 4, employeeNo: 'E004', name: '赵六', departmentId: 3, position: '销售经理', hireDate: '2023-09-10', phone: '13800001004', createTime: '2023-09-10T08:00:00', updateTime: '2023-09-10T08:00:00', deleted: 0 },
    { id: 5, employeeNo: 'E005', name: '孙七', departmentId: 4, position: '会计', hireDate: '2024-01-05', phone: '13800001005', createTime: '2024-01-05T08:00:00', updateTime: '2024-01-05T08:00:00', deleted: 0 },
    { id: 6, employeeNo: 'E006', name: '周八', departmentId: 1, position: '测试工程师', hireDate: '2024-02-18', phone: '13800001006', createTime: '2024-02-18T08:00:00', updateTime: '2024-02-18T08:00:00', deleted: 0 },
    { id: 7, employeeNo: 'E007', name: '吴九', departmentId: 5, position: '市场策划', hireDate: '2024-04-01', phone: '13800001007', createTime: '2024-04-01T08:00:00', updateTime: '2024-04-01T08:00:00', deleted: 0 },
    { id: 8, employeeNo: 'E008', name: '郑十', departmentId: 1, position: '架构师', hireDate: '2022-11-01', phone: '13800001008', createTime: '2022-11-01T08:00:00', updateTime: '2022-11-01T08:00:00', deleted: 0 },
    { id: 9, employeeNo: 'E009', name: '陈晓明', departmentId: 2, position: 'HR经理', hireDate: '2022-05-15', phone: '13800001009', createTime: '2022-05-15T08:00:00', updateTime: '2022-05-15T08:00:00', deleted: 0 },
    { id: 10, employeeNo: 'E010', name: '林小红', departmentId: 3, position: '销售代表', hireDate: '2024-06-01', phone: '13800001010', createTime: '2024-06-01T08:00:00', updateTime: '2024-06-01T08:00:00', deleted: 0 }
];

// 考勤数据
let _attendances = [
    { id: 1, employeeId: 1, attendanceDate: '2024-06-01', status: '正常', remark: '', createTime: '2024-06-01T08:30:00', updateTime: '2024-06-01T08:30:00' },
    { id: 2, employeeId: 1, attendanceDate: '2024-06-02', status: '正常', remark: '', createTime: '2024-06-02T08:25:00', updateTime: '2024-06-02T08:25:00' },
    { id: 3, employeeId: 1, attendanceDate: '2024-06-03', status: '请假', remark: '年假', createTime: '2024-06-03T09:00:00', updateTime: '2024-06-03T09:00:00' },
    { id: 4, employeeId: 2, attendanceDate: '2024-06-01', status: '正常', remark: '', createTime: '2024-06-01T08:45:00', updateTime: '2024-06-01T08:45:00' },
    { id: 5, employeeId: 2, attendanceDate: '2024-06-02', status: '缺勤', remark: '未打卡', createTime: '2024-06-02T09:00:00', updateTime: '2024-06-02T09:00:00' },
    { id: 6, employeeId: 2, attendanceDate: '2024-06-03', status: '正常', remark: '', createTime: '2024-06-03T08:30:00', updateTime: '2024-06-03T08:30:00' },
    { id: 7, employeeId: 3, attendanceDate: '2024-06-01', status: '正常', remark: '', createTime: '2024-06-01T08:20:00', updateTime: '2024-06-01T08:20:00' },
    { id: 8, employeeId: 3, attendanceDate: '2024-06-02', status: '病假', remark: '感冒', createTime: '2024-06-02T09:00:00', updateTime: '2024-06-02T09:00:00' },
    { id: 9, employeeId: 4, attendanceDate: '2024-06-01', status: '正常', remark: '', createTime: '2024-06-01T08:35:00', updateTime: '2024-06-01T08:35:00' },
    { id: 10, employeeId: 4, attendanceDate: '2024-06-02', status: '正常', remark: '', createTime: '2024-06-02T08:40:00', updateTime: '2024-06-02T08:40:00' },
    { id: 11, employeeId: 5, attendanceDate: '2024-06-01', status: '正常', remark: '', createTime: '2024-06-01T08:50:00', updateTime: '2024-06-01T08:50:00' },
    { id: 12, employeeId: 5, attendanceDate: '2024-06-02', status: '正常', remark: '', createTime: '2024-06-02T08:30:00', updateTime: '2024-06-02T08:30:00' },
    { id: 13, employeeId: 6, attendanceDate: '2024-06-01', status: '正常', remark: '', createTime: '2024-06-01T08:55:00', updateTime: '2024-06-01T08:55:00' },
    { id: 14, employeeId: 6, attendanceDate: '2024-06-02', status: '请假', remark: '事假', createTime: '2024-06-02T09:00:00', updateTime: '2024-06-02T09:00:00' },
    { id: 15, employeeId: 7, attendanceDate: '2024-06-01', status: '正常', remark: '', createTime: '2024-06-01T08:30:00', updateTime: '2024-06-01T08:30:00' },
    { id: 16, employeeId: 7, attendanceDate: '2024-06-02', status: '正常', remark: '', createTime: '2024-06-02T08:28:00', updateTime: '2024-06-02T08:28:00' },
    { id: 17, employeeId: 8, attendanceDate: '2024-06-01', status: '正常', remark: '', createTime: '2024-06-01T08:15:00', updateTime: '2024-06-01T08:15:00' },
    { id: 18, employeeId: 8, attendanceDate: '2024-06-02', status: '正常', remark: '', createTime: '2024-06-02T08:20:00', updateTime: '2024-06-02T08:20:00' },
    { id: 19, employeeId: 9, attendanceDate: '2024-06-01', status: '缺勤', remark: '出差', createTime: '2024-06-01T09:00:00', updateTime: '2024-06-01T09:00:00' },
    { id: 20, employeeId: 10, attendanceDate: '2024-06-01', status: '正常', remark: '', createTime: '2024-06-01T08:40:00', updateTime: '2024-06-01T08:40:00' }
];

// 用户账号数据
let _admins = [
    { id: 1, username: 'admin', password: 'admin123', createTime: '2024-01-01T00:00:00', updateTime: '2024-01-01T00:00:00' }
];

// ---------- 辅助函数 ----------

function _ok(data) {
    return { code: 200, message: 'success', data: data !== undefined ? data : null };
}

function _fail(msg) {
    return { code: 500, message: msg, data: null };
}

function _now() {
    return new Date().toISOString().replace('Z', '');
}

// 模拟异步延迟（让体验更真实）
function _delay(result) {
    return new Promise(resolve => setTimeout(() => resolve(result), 100));
}

// ---------- 认证相关 API ----------

const authAPI = {
    login: async (username, password) => {
        if (API_CONFIG.MOCK_MODE) {
            const user = _admins.find(a => a.username === username && a.password === password);
            if (user) {
                _currentUser = { id: user.id, username: user.username };
                sessionStorage.setItem('mockUser', JSON.stringify(_currentUser));
                return _delay(_ok(_currentUser));
            }
            return _delay(_fail('用户名或密码错误'));
        }
        return await request('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ username, password })
        });
    },

    register: async (username, password) => {
        if (API_CONFIG.MOCK_MODE) {
            if (_admins.find(a => a.username === username)) {
                return _delay(_fail('用户名已存在'));
            }
            const newUser = {
                id: _nextId.admin++,
                username,
                password,
                createTime: _now(),
                updateTime: _now()
            };
            _admins.push(newUser);
            _currentUser = { id: newUser.id, username: newUser.username };
            sessionStorage.setItem('mockUser', JSON.stringify(_currentUser));
            return _delay(_ok(_currentUser));
        }
        return await request('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({ username, password })
        });
    },

    logout: async () => {
        if (API_CONFIG.MOCK_MODE) {
            _currentUser = null;
            sessionStorage.removeItem('mockUser');
            return _delay(_ok(null));
        }
        return await request('/api/auth/logout', { method: 'POST' });
    },

    getCurrentUser: async () => {
        if (API_CONFIG.MOCK_MODE) {
            if (!_currentUser) {
                const saved = sessionStorage.getItem('mockUser');
                if (saved) _currentUser = JSON.parse(saved);
            }
            if (_currentUser) {
                return _delay(_ok(_currentUser));
            }
            return _delay(_fail('未登录'));
        }
        return await request('/api/auth/current', { method: 'GET' });
    }
};

// ---------- 员工相关 API ----------

const employeeAPI = {
    getList: async (params) => {
        if (API_CONFIG.MOCK_MODE) {
            let list = _employees.filter(e => e.deleted === 0);

            if (params.keyword) {
                const kw = params.keyword.toLowerCase();
                list = list.filter(e =>
                    e.name.toLowerCase().includes(kw) ||
                    e.employeeNo.toLowerCase().includes(kw)
                );
            }

            const page = parseInt(params.page) || 1;
            const size = parseInt(params.size) || 10;
            const total = list.length;
            const pages = Math.max(1, Math.ceil(total / size));
            const start = (page - 1) * size;
            const records = list.slice(start, start + size);

            return _delay(_ok({ records, total, size, current: page, pages }));
        }
        const query = new URLSearchParams(params).toString();
        return await request(`/api/employees?${query}`, { method: 'GET' });
    },

    getDetail: async (id) => {
        if (API_CONFIG.MOCK_MODE) {
            const emp = _employees.find(e => e.id === id && e.deleted === 0);
            return _delay(emp ? _ok(emp) : _fail('员工不存在'));
        }
        return await request(`/api/employees/${id}`, { method: 'GET' });
    },

    create: async (data) => {
        if (API_CONFIG.MOCK_MODE) {
            const newEmp = {
                id: _nextId.employee++,
                employeeNo: data.employeeNo,
                name: data.name,
                departmentId: parseInt(data.departmentId),
                position: data.position || '',
                hireDate: data.hireDate || '',
                phone: data.phone || '',
                createTime: _now(),
                updateTime: _now(),
                deleted: 0
            };
            _employees.push(newEmp);
            return _delay(_ok(null));
        }
        return await request('/api/employees', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },

    update: async (id, data) => {
        if (API_CONFIG.MOCK_MODE) {
            const emp = _employees.find(e => e.id === id && e.deleted === 0);
            if (!emp) return _delay(_fail('员工不存在'));
            Object.assign(emp, {
                employeeNo: data.employeeNo || emp.employeeNo,
                name: data.name || emp.name,
                departmentId: parseInt(data.departmentId) || emp.departmentId,
                position: data.position !== undefined ? data.position : emp.position,
                hireDate: data.hireDate !== undefined ? data.hireDate : emp.hireDate,
                phone: data.phone !== undefined ? data.phone : emp.phone,
                updateTime: _now()
            });
            return _delay(_ok(null));
        }
        return await request(`/api/employees/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    },

    delete: async (id) => {
        if (API_CONFIG.MOCK_MODE) {
            const emp = _employees.find(e => e.id === id);
            if (emp) emp.deleted = 1;
            return _delay(_ok(null));
        }
        return await request(`/api/employees/${id}`, { method: 'DELETE' });
    }
};

// ---------- 部门相关 API ----------

const departmentAPI = {
    getAll: async () => {
        if (API_CONFIG.MOCK_MODE) {
            return _delay(_ok([..._departments]));
        }
        return await request('/api/departments', { method: 'GET' });
    },

    getDetail: async (id) => {
        if (API_CONFIG.MOCK_MODE) {
            const dept = _departments.find(d => d.id === id);
            return _delay(dept ? _ok(dept) : _fail('部门不存在'));
        }
        return await request(`/api/departments/${id}`, { method: 'GET' });
    },

    create: async (data) => {
        if (API_CONFIG.MOCK_MODE) {
            const newDept = {
                id: _nextId.department++,
                deptCode: data.deptCode,
                deptName: data.deptName,
                createTime: _now(),
                updateTime: _now()
            };
            _departments.push(newDept);
            return _delay(_ok(null));
        }
        return await request('/api/departments', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },

    update: async (id, data) => {
        if (API_CONFIG.MOCK_MODE) {
            const dept = _departments.find(d => d.id === id);
            if (!dept) return _delay(_fail('部门不存在'));
            dept.deptCode = data.deptCode || dept.deptCode;
            dept.deptName = data.deptName || dept.deptName;
            dept.updateTime = _now();
            return _delay(_ok(null));
        }
        return await request(`/api/departments/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }
};

// ---------- 考勤相关 API ----------

const attendanceAPI = {
    getList: async (params) => {
        if (API_CONFIG.MOCK_MODE) {
            let list = [..._attendances];

            if (params.employeeId) {
                const eid = parseInt(params.employeeId);
                list = list.filter(a => a.employeeId === eid);
            }

            if (params.month) {
                list = list.filter(a => a.attendanceDate.startsWith(params.month));
            }

            const page = parseInt(params.page) || 1;
            const size = parseInt(params.size) || 10;
            const total = list.length;
            const pages = Math.max(1, Math.ceil(total / size));
            const start = (page - 1) * size;
            const records = list.slice(start, start + size);

            return _delay(_ok({ records, total, size, current: page, pages }));
        }
        const query = new URLSearchParams(params).toString();
        return await request(`/api/attendance?${query}`, { method: 'GET' });
    },

    create: async (data) => {
        if (API_CONFIG.MOCK_MODE) {
            const newAtt = {
                id: _nextId.attendance++,
                employeeId: parseInt(data.employeeId),
                attendanceDate: data.attendanceDate,
                status: data.status,
                remark: data.remark || '',
                createTime: _now(),
                updateTime: _now()
            };
            _attendances.push(newAtt);
            return _delay(_ok(null));
        }
        return await request('/api/attendance', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },

    getStats: async (params) => {
        if (API_CONFIG.MOCK_MODE) {
            let list = [..._attendances];

            if (params.employeeId) {
                const eid = parseInt(params.employeeId);
                list = list.filter(a => a.employeeId === eid);
            }
            if (params.month) {
                list = list.filter(a => a.attendanceDate.startsWith(params.month));
            }

            const total = list.length;
            const normal = list.filter(a => a.status === '正常').length;
            const absent = list.filter(a => a.status === '缺勤').length;
            const leave = list.filter(a => a.status === '请假').length;
            const sick = list.filter(a => a.status === '病假').length;
            const rate = total > 0 ? Math.round((normal / total) * 100) : 0;

            return _delay(_ok({ total, normal, absent, leave, sick, rate }));
        }
        const query = new URLSearchParams(params).toString();
        return await request(`/api/attendance/stats?${query}`, { method: 'GET' });
    },

    update: async (id, data) => {
        if (API_CONFIG.MOCK_MODE) {
            const att = _attendances.find(a => a.id === id);
            if (!att) return _delay(_fail('考勤记录不存在'));
            att.employeeId = parseInt(data.employeeId) || att.employeeId;
            att.attendanceDate = data.attendanceDate || att.attendanceDate;
            att.status = data.status || att.status;
            att.remark = data.remark !== undefined ? data.remark : att.remark;
            att.updateTime = _now();
            return _delay(_ok(null));
        }
        return await request(`/api/attendance/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    },

    delete: async (id) => {
        if (API_CONFIG.MOCK_MODE) {
            const idx = _attendances.findIndex(a => a.id === id);
            if (idx !== -1) _attendances.splice(idx, 1);
            return _delay(_ok(null));
        }
        return await request(`/api/attendance/${id}`, { method: 'DELETE' });
    }
};

// ---------- 统计相关 API ----------

const statsAPI = {
    getOverview: async () => {
        if (API_CONFIG.MOCK_MODE) {
            const totalEmployees = _employees.filter(e => e.deleted === 0).length;
            const totalDepartments = _departments.length;
            return _delay(_ok({ totalEmployees, totalDepartments }));
        }
        return await request('/api/stats/overview', { method: 'GET' });
    },

    getDepartment: async () => {
        if (API_CONFIG.MOCK_MODE) {
            const result = {};
            const activeEmps = _employees.filter(e => e.deleted === 0);
            _departments.forEach(d => {
                result[d.deptName] = activeEmps.filter(e => e.departmentId === d.id).length;
            });
            return _delay(_ok(result));
        }
        return await request('/api/stats/department', { method: 'GET' });
    },

    getHire: async () => {
        if (API_CONFIG.MOCK_MODE) {
            const now = new Date();
            const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
            const thisYear = `${now.getFullYear()}`;
            const activeEmps = _employees.filter(e => e.deleted === 0);

            const monthCount = activeEmps.filter(e => e.hireDate && e.hireDate.startsWith(thisMonth)).length;
            const yearCount = activeEmps.filter(e => e.hireDate && e.hireDate.startsWith(thisYear)).length;

            return _delay(_ok({ thisMonth: monthCount, thisYear: yearCount }));
        }
        return await request('/api/stats/hire', { method: 'GET' });
    },

    getAttendance: async () => {
        if (API_CONFIG.MOCK_MODE) {
            const total = _attendances.length;
            const normal = _attendances.filter(a => a.status === '正常').length;
            const rate = total > 0 ? Math.round((normal / total) * 100) : 0;
            return _delay(_ok({ total, normal, rate }));
        }
        return await request('/api/stats/attendance', { method: 'GET' });
    }
};
