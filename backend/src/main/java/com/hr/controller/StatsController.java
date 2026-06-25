package com.hr.controller;

import com.hr.dto.Result;
import com.hr.service.StatsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/stats")
@RequiredArgsConstructor
public class StatsController {
    private final StatsService statsService;

    @GetMapping("/overview")
    public Result<Map<String, Object>> overview() {
        return Result.success(statsService.overview());
    }

    @GetMapping("/department")
    public Result<Map<String, Long>> department() {
        return Result.success(statsService.departmentStats());
    }

    @GetMapping("/hire")
    public Result<Map<String, Object>> hire() {
        return Result.success(statsService.hireStats());
    }

    @GetMapping("/attendance")
    public Result<Map<String, Object>> attendance() {
        return Result.success(statsService.attendanceStats());
    }
}
