package com.ebms.employee.repository;

import com.ebms.employee.entity.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {

    Page<Employee> findByFirstNameContainingIgnoreCase(
            String keyword,
            Pageable pageable
    );
}