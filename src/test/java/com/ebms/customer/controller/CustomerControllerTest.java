package com.ebms.customer.controller;

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
import com.ebms.customer.repository.CustomerRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.HashMap;
import java.util.Map;

@SpringBootTest
@AutoConfigureMockMvc
public class CustomerControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private com.ebms.sales.repository.SalesOrderItemRepository salesOrderItemRepository;

    @Autowired
    private com.ebms.sales.repository.SalesOrderRepository salesOrderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ObjectMapper objectMapper;

    private String token;

    @BeforeEach
    public void setup() throws Exception {
        salesOrderItemRepository.deleteAll();
        salesOrderRepository.deleteAll();
        customerRepository.deleteAll();
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
    }

    @Test
    public void testCustomerLifecycle() throws Exception {
        // 1. Create Customer
        Map<String, String> custRequest = new HashMap<>();
        custRequest.put("name", "Acme Corporation");
        custRequest.put("email", "info@acme.com");
        custRequest.put("phone", "9876543210");
        custRequest.put("address", "123 Industrial Way");

        MvcResult createResult = mockMvc.perform(post("/api/customers")
                .header("Authorization", token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(custRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.name").value("Acme Corporation"))
                .andReturn();

        JsonNode createdNode = objectMapper.readTree(createResult.getResponse().getContentAsString());
        Long custId = createdNode.get("id").asLong();

        // 2. Get Customer by ID
        mockMvc.perform(get("/api/customers/" + custId)
                .header("Authorization", token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(custId))
                .andExpect(jsonPath("$.name").value("Acme Corporation"));

        // 3. Search Customers
        mockMvc.perform(get("/api/customers/search")
                .header("Authorization", token)
                .param("keyword", "acme")
                .param("page", "0")
                .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].id").value(custId));

        // 4. Update Customer
        custRequest.put("name", "Acme Corp");
        mockMvc.perform(put("/api/customers/" + custId)
                .header("Authorization", token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(custRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Acme Corp"));

        // 5. Delete Customer
        mockMvc.perform(delete("/api/customers/" + custId)
                .header("Authorization", token))
                .andExpect(status().isOk())
                .andExpect(content().string("Customer deleted successfully"));

        // Verify deleted
        mockMvc.perform(get("/api/customers/" + custId)
                .header("Authorization", token))
                .andExpect(status().isInternalServerError());
    }
}
