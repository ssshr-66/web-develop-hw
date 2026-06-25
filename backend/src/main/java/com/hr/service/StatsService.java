package com.hr.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.hr.mapper.AttendanceMapper;
import com.hr.mapper.DepartmentMapper;
import com.hr.mapper.EmployeeMapper;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class StatsService {
    private final EmployeeMapper employeeMapper;
    private final DepartmentMapper departmentMapper;
    private final AttendanceMapper attendanceMapper;

    public Map<String, Object> overview() {
        Map<String, Object> result = new HashMap<>();
        result.put("totalEmployees", employeeMapper.selectCount(null));
        result.put("totalDepartments", departmentMapper.selectCount(null));
        return result;
    }

    public Map<String, Long> departmentStats() {
        var depts = departmentMapper.selectList(null);
        Map<String, Long> result = new HashMap<>();
        for (var dept : depts) {
            long count = employeeMapper.selectCount(new QueryWrapper<com.hr.entity.Employee>().eq("department_id", dept.getId()));
            result.put(dept.getDeptName(), count);
        }
        return result;
    }

    public Map<String, Object> hireStats() {
        LocalDate now = LocalDate.now();
        String thisMonth = now.toString().substring(0, 7);
        String thisYear = now.toString().substring(0, 4);

        long monthCount = employeeMapper.selectCount(new QueryWrapper<com.hr.entity.Employee>().likeRight("hire_date", thisMonth));
        long yearCount = employeeMapper.selectCount(new QueryWrapper<com.hr.entity.Employee>().likeRight("hire_date", thisYear));

        Map<String, Object> result = new HashMap<>();
        result.put("thisMonth", monthCount);
        result.put("thisYear", yearCount);
        return result;
    }

    public Map<String, Object> attendanceStats() {
        var records = attendanceMapper.selectList(null);
        long total = records.size();
        long normal = records.stream().filter(r -> "正常".equals(r.getStatus())).count();

        Map<String, Object> result = new HashMap<>();
        result.put("total", total);
        result.put("normal", normal);
        result.put("rate", total > 0 ? String.format("%.2f", normal * 100.0 / total) : "0");
        return result;
    }
}
