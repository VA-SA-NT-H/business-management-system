package com.ebms.audit.controller;

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
import com.ebms.audit.repository.AuditLogRepository;
import com.ebms.inventory.entity.Product;
import com.ebms.inventory.repository.InventoryTransactionRepository;
import com.ebms.inventory.repository.ProductRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.HashMap;
import java.util.Map;

@SpringBootTest
@AutoConfigureMockMvc
public class AuditLogControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuditLogRepository auditLogRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private InventoryTransactionRepository inventoryTransactionRepository;

    @Autowired
    private com.ebms.sales.repository.SalesOrderItemRepository salesOrderItemRepository;

    @Autowired
    private com.ebms.sales.repository.SalesOrderRepository salesOrderRepository;

    @Autowired
    private com.ebms.procurement.repository.PurchaseOrderItemRepository purchaseOrderItemRepository;

    @Autowired
    private com.ebms.procurement.repository.PurchaseOrderRepository purchaseOrderRepository;

    @Autowired
    private ObjectMapper objectMapper;

    private String token;

    @BeforeEach
    public void setup() throws Exception {
        salesOrderItemRepository.deleteAll();
        salesOrderRepository.deleteAll();
        purchaseOrderItemRepository.deleteAll();
        purchaseOrderRepository.deleteAll();
        inventoryTransactionRepository.deleteAll();
        productRepository.deleteAll();
        auditLogRepository.deleteAll();
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

        // Create a product to trigger an audit log entry
        Map<String, Object> prodRequest = new HashMap<>();
        prodRequest.put("sku", "PROD-100");
        prodRequest.put("name", "Test Item");
        prodRequest.put("description", "A product to test auditing");
        prodRequest.put("price", 10.0);
        prodRequest.put("stockQuantity", 5);
        prodRequest.put("minimumStockLevel", 1);

        mockMvc.perform(post("/api/products")
                .header("Authorization", token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(prodRequest)))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetAuditLogs() throws Exception {
        mockMvc.perform(get("/api/audit-logs")
                .header("Authorization", token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(1));
                // Wait! ProductController createProduct calls: auditLogService.log("admin", "CREATE_PRODUCT", "PRODUCT", id). That's 1 log.
                // Wait! Let's check if there is any other log. No, so there should be 1 log.
                // Let's modify the expectation to .value(1) just in case, or just checking exists. Let's do checking if the first log is CREATE_PRODUCT.
    }
}
