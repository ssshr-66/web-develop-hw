package com.hr.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.hr.entity.Admin;
import com.hr.mapper.AdminMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AdminMapper adminMapper;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public Admin register(String username, String password) {
        if (adminMapper.selectOne(new QueryWrapper<Admin>().eq("username", username)) != null) {
            throw new RuntimeException("用户名已存在");
        }
        Admin admin = new Admin();
        admin.setUsername(username);
        admin.setPassword(encoder.encode(password));
        adminMapper.insert(admin);
        return admin;
    }

    public Admin login(String username, String password, HttpSession session) {
        Admin admin = adminMapper.selectOne(new QueryWrapper<Admin>().eq("username", username));
        if (admin == null || !encoder.matches(password, admin.getPassword())) {
            throw new RuntimeException("用户名或密码错误");
        }
        session.setAttribute("adminId", admin.getId());
        return admin;
    }

    public void logout(HttpSession session) {
        session.invalidate();
    }

    public Admin current(HttpSession session) {
        Long adminId = (Long) session.getAttribute("adminId");
        if (adminId == null) throw new RuntimeException("未登录");
        return adminMapper.selectById(adminId);
    }
}
