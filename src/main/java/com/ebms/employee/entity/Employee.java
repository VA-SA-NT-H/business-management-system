package com.ebms.employee.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "employees")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String employeeCode;

    private String firstName;

    private String lastName;

    @Column(unique = true)
    private String email;

    private String phone;

    private String designation;

    private Double salary;

    private LocalDate joiningDate;

    private Boolean active;

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;
}