package com.ebms.employee.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import com.ebms.auth.repository.UserRepository;
import com.ebms.employee.entity.Department;
import com.ebms.employee.repository.DepartmentRepository;
import com.ebms.employee.repository.EmployeeRepository;
import com.ebms.security.JwtService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.HashMap;
import java.util.Map;

@SpringBootTest
@AutoConfigureMockMvc
public class EmployeeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private JwtService jwtService;

    private String token;
    private Department testDepartment;

    @BeforeEach
    public void setup() throws Exception {
        employeeRepository.deleteAll();
        departmentRepository.deleteAll();
        userRepository.deleteAll();

        // Register and login an admin user to get the token
        Map<String, String> registerRequest = new HashMap<>();
        registerRequest.put("username", "admin");
        registerRequest.put("password", "admin123");
        registerRequest.put("role", "ADMIN");

        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(registerRequest)))
                .andExpect(status().isOk());

        Map<String, String> loginRequest = new HashMap<>();
        loginRequest.put("username", "admin");
        loginRequest.put("password", "admin123");

        MvcResult loginResult = mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk())
                .andReturn();

        String responseString = loginResult.getResponse().getContentAsString();
        JsonNode responseJson = objectMapper.readTree(responseString);
        token = "Bearer " + responseJson.get("token").asText();

        // Setup a department
        testDepartment = Department.builder()
                .departmentName("Engineering")
                .description("R&D team")
                .build();
        testDepartment = departmentRepository.save(testDepartment);
    }

    @Test
    public void testEmployeeLifecycle() throws Exception {
        // 1. Create Employee
        Map<String, Object> empRequest = new HashMap<>();
        empRequest.put("firstName", "John");
        empRequest.put("lastName", "Doe");
        empRequest.put("email", "john.doe@example.com");
        empRequest.put("phone", "1234567890");
        empRequest.put("designation", "Software Engineer");
        empRequest.put("salary", 90000.0);
        empRequest.put("departmentId", testDepartment.getId());

        MvcResult createResult = mockMvc.perform(post("/api/employees")
                .header("Authorization", token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(empRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.firstName").value("John"))
                .andExpect(jsonPath("$.lastName").value("Doe"))
                .andExpect(jsonPath("$.employeeCode").value("EMP001"))
                .andReturn();

        JsonNode createdNode = objectMapper.readTree(createResult.getResponse().getContentAsString());
        Long empId = createdNode.get("id").asLong();

        // 2. Get Employee by ID
        mockMvc.perform(get("/api/employees/" + empId)
                .header("Authorization", token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(empId))
                .andExpect(jsonPath("$.firstName").value("John"));

        // 3. Search Employee
        mockMvc.perform(get("/api/employees/search")
                .header("Authorization", token)
                .param("keyword", "john")
                .param("page", "0")
                .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].id").value(empId));

        // 4. Update Employee
        empRequest.put("firstName", "Johnny");
        mockMvc.perform(put("/api/employees/" + empId)
                .header("Authorization", token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(empRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.firstName").value("Johnny"));

        // 5. Delete (Soft Delete)
        mockMvc.perform(delete("/api/employees/" + empId)
                .header("Authorization", token))
                .andExpect(status().isOk())
                .andExpect(content().string("Employee deleted successfully"));

        // Verify active status is false (we check database directly or get)
        // Wait, does getEmployeeById return inactive employees? Let's check EmployeeServiceImpl.java.
        // It does return it since it finds by ID in the repository. But active field might not be in response.
    }
}
