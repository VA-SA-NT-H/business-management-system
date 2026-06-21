package com.ebms.inventory.controller;

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
import com.ebms.inventory.repository.InventoryTransactionRepository;
import com.ebms.inventory.repository.ProductRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.HashMap;
import java.util.Map;

@SpringBootTest
@AutoConfigureMockMvc
public class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

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
    public void testProductLifecycle() throws Exception {
        // 1. Create Product
        Map<String, Object> prodRequest = new HashMap<>();
        prodRequest.put("sku", "PROD-001");
        prodRequest.put("name", "Wireless Mouse");
        prodRequest.put("description", "High precision optical mouse");
        prodRequest.put("price", 25.99);
        prodRequest.put("stockQuantity", 50);
        prodRequest.put("minimumStockLevel", 10);

        MvcResult createResult = mockMvc.perform(post("/api/products")
                .header("Authorization", token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(prodRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.sku").value("PROD-001"))
                .andReturn();

        JsonNode createdNode = objectMapper.readTree(createResult.getResponse().getContentAsString());
        Long prodId = createdNode.get("id").asLong();

        // 2. Add Stock
        Map<String, Object> addStockRequest = new HashMap<>();
        addStockRequest.put("quantity", 20);

        mockMvc.perform(post("/api/products/" + prodId + "/add-stock")
                .header("Authorization", token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(addStockRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.stockQuantity").value(70));

        // 3. Remove Stock
        Map<String, Object> removeStockRequest = new HashMap<>();
        removeStockRequest.put("quantity", 65);

        mockMvc.perform(post("/api/products/" + prodId + "/remove-stock")
                .header("Authorization", token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(removeStockRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.stockQuantity").value(5));

        // 4. Check low stock products
        mockMvc.perform(get("/api/products/low-stock")
                .header("Authorization", token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(prodId));

        // 5. Get transactions
        mockMvc.perform(get("/api/products/" + prodId + "/transactions")
                .header("Authorization", token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(2));
    }
}
