package com.ebms.employee.dto;

import lombok.Data;

@Data
public class EmployeeRequest {

    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String designation;
    private Double salary;
    private Long departmentId;
}