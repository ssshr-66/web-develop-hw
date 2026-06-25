package com.hr.controller;

import com.hr.dto.Result;
import com.hr.entity.Admin;
import com.hr.service.AuthService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public Result<Admin> register(@RequestBody Map<String, String> params) {
        try {
            Admin admin = authService.register(params.get("username"), params.get("password"));
            admin.setPassword(null);
            return Result.success(admin);
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    @PostMapping("/login")
    public Result<Admin> login(@RequestBody Map<String, String> params, HttpSession session) {
        try {
            Admin admin = authService.login(params.get("username"), params.get("password"), session);
            admin.setPassword(null);
            return Result.success(admin);
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    @PostMapping("/logout")
    public Result<Void> logout(HttpSession session) {
        authService.logout(session);
        return Result.success(null);
    }

    @GetMapping("/current")
    public Result<Admin> current(HttpSession session) {
        try {
            Admin admin = authService.current(session);
            admin.setPassword(null);
            return Result.success(admin);
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }
}
