// AttendanceController.java
// 考勤管理控制器
//
// 提供考勤相关的 REST API（路径前缀 /api/attendance）：
//   - POST   /api/attendance        新增考勤记录
//   - GET    /api/attendance        分页查询考勤列表（可按员工、月份筛选）
//   - GET    /api/attendance/stats  查询考勤统计数据（正常/缺勤/请假/病假/出勤率）
//   - PUT    /api/attendance/{id}   更新指定考勤记录
//   - DELETE /api/attendance/{id}   删除指定考勤记录
//
// 依赖 AttendanceService 实现业务逻辑，统一返回 Result 包装结果。
package com.hr.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.hr.dto.Result;
import com.hr.entity.Attendance;
import com.hr.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/attendance")
@RequiredArgsConstructor
public class AttendanceController {
    private final AttendanceService attendanceService;

    @PostMapping
    public Result<Void> add(@RequestBody Attendance attendance) {
        attendanceService.add(attendance);
        return Result.success(null);
    }

    @GetMapping
    public Result<Page<Attendance>> list(@RequestParam(defaultValue = "1") int page,
                                         @RequestParam(defaultValue = "10") int size,
                                         @RequestParam(required = false) Long employeeId,
                                         @RequestParam(required = false) String month) {
        return Result.success(attendanceService.list(page, size, employeeId, month));
    }

    @GetMapping("/stats")
    public Result<Map<String, Object>> stats(@RequestParam(required = false) Long employeeId,
                                             @RequestParam(required = false) String month) {
        return Result.success(attendanceService.stats(employeeId, month));
    }

    @PutMapping("/{id}")
    public Result<Void> update(@PathVariable Long id, @RequestBody Attendance attendance) {
        attendance.setId(id);
        attendanceService.update(attendance);
        return Result.success(null);
    }

    @DeleteMapping("/{id}")
    public Result<Void> delete(@PathVariable Long id) {
        attendanceService.delete(id);
        return Result.success(null);
    }
}
