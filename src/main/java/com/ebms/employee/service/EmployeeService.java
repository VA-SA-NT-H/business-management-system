package com.ebms.employee.service;

import com.ebms.employee.dto.*;
import org.springframework.data.domain.Page;

public interface EmployeeService {

    EmployeeResponse createEmployee(
            EmployeeRequest request
    );

    EmployeeResponse getEmployeeById(
            Long id
    );

    Page<EmployeeResponse> getAllEmployees(
            int page,
            int size
    );

    EmployeeResponse updateEmployee(
            Long id,
            EmployeeRequest request
    );

    void deleteEmployee(
            Long id
    );

    Page<EmployeeResponse> searchEmployee(
            String keyword,
            int page,
            int size
    );
}