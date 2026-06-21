package com.ebms.employee.service;

import com.ebms.employee.dto.EmployeeRequest;
import com.ebms.employee.dto.EmployeeResponse;
import com.ebms.employee.entity.Department;
import com.ebms.employee.entity.Employee;
import com.ebms.employee.repository.DepartmentRepository;
import com.ebms.employee.repository.EmployeeRepository;
import com.ebms.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;

    private Department getOrCreateDepartment(EmployeeRequest request) {
        if (request.getDepartment() != null && !request.getDepartment().trim().isEmpty()) {
            return departmentRepository.findByDepartmentNameIgnoreCase(request.getDepartment().trim())
                    .orElseGet(() -> departmentRepository.save(
                            Department.builder()
                                    .departmentName(request.getDepartment().trim())
                                    .description("Auto-created department for " + request.getDepartment().trim())
                                    .build()
                    ));
        }
        if (request.getDepartmentId() != null) {
            return departmentRepository.findById(request.getDepartmentId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Department not found with id: " + request.getDepartmentId()
                    ));
        }
        throw new IllegalArgumentException("Department name or ID is required");
    }

    @Override
    public EmployeeResponse createEmployee(
            EmployeeRequest request) {

        Department department = getOrCreateDepartment(request);

        Employee employee = Employee.builder()
                .employeeCode(generateEmployeeCode())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .designation(request.getDesignation())
                .salary(request.getSalary())
                .joiningDate(LocalDate.now())
                .active(true)
                .department(department)
                .build();

        Employee savedEmployee =
                employeeRepository.save(employee);

        return mapToResponse(savedEmployee);
    }

    @Override
    public EmployeeResponse getEmployeeById(Long id) {

        Employee employee =
                employeeRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Employee not found with id: "
                                                + id
                                ));

        return mapToResponse(employee);
    }

    @Override
    public Page<EmployeeResponse> getAllEmployees(
            int page,
            int size) {

        return employeeRepository
                .findAll(PageRequest.of(page, size))
                .map(this::mapToResponse);
    }

    @Override
    public EmployeeResponse updateEmployee(
            Long id,
            EmployeeRequest request) {

        Employee employee =
                employeeRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Employee not found with id: "
                                                + id
                                ));

        Department department = getOrCreateDepartment(request);

        employee.setFirstName(request.getFirstName());
        employee.setLastName(request.getLastName());
        employee.setEmail(request.getEmail());
        employee.setPhone(request.getPhone());
        employee.setDesignation(request.getDesignation());
        employee.setSalary(request.getSalary());
        employee.setDepartment(department);

        Employee updatedEmployee =
                employeeRepository.save(employee);

        return mapToResponse(updatedEmployee);
    }

    @Override
    public void deleteEmployee(Long id) {

        Employee employee =
                employeeRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Employee not found with id: "
                                                + id
                                ));

        // Soft Delete
        employee.setActive(false);

        employeeRepository.save(employee);
    }

    @Override
    public Page<EmployeeResponse> searchEmployee(
            String keyword,
            int page,
            int size) {

        return employeeRepository
                .findByFirstNameContainingIgnoreCase(
                        keyword,
                        PageRequest.of(page, size)
                )
                .map(this::mapToResponse);
    }

    private EmployeeResponse mapToResponse(
            Employee employee) {

        return EmployeeResponse.builder()
                .id(employee.getId())
                .employeeCode(employee.getEmployeeCode())
                .firstName(employee.getFirstName())
                .lastName(employee.getLastName())
                .email(employee.getEmail())
                .phone(employee.getPhone())
                .designation(employee.getDesignation())
                .salary(employee.getSalary())
                .departmentName(
                        employee.getDepartment()
                                .getDepartmentName()
                )
                .build();
    }

    private String generateEmployeeCode() {

        long count =
                employeeRepository.count() + 1;

        return String.format(
                "EMP%03d",
                count
        );
    }
}