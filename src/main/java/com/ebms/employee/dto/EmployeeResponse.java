package com.ebms.employee.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EmployeeResponse {

    private Long id;
    private String employeeCode;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String designation;
    private Double salary;
    private String departmentName;
}