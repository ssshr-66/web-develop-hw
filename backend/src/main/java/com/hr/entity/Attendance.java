// Attendance.java
// 考勤记录实体类（对应数据库表 t_attendance）
//
// 字段：
//   - id              主键，自增
//   - employeeId      员工 ID
//   - attendanceDate  考勤日期
//   - status          考勤状态（正常/缺勤/请假/病假）
//   - remark          备注
//   - createTime      创建时间
//   - updateTime      更新时间
//
// 使用 MyBatis-Plus 注解映射，Lombok @Data 生成 getter/setter。
package com.hr.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@TableName("t_attendance")
public class Attendance {
    @TableId(type = IdType.AUTO)
    private Long id;
    private Long employeeId;
    private LocalDate attendanceDate;
    private String status;
    private String remark;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
}
