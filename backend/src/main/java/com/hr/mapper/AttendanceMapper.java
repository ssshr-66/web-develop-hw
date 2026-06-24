// AttendanceMapper.java
// 考勤记录数据访问接口（Mapper）
//
// 继承 MyBatis-Plus 的 BaseMapper<Attendance>，
// 自动提供对 t_attendance 表的增删改查（CRUD）能力，无需手写 SQL。
package com.hr.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.hr.entity.Attendance;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AttendanceMapper extends BaseMapper<Attendance> {
}
