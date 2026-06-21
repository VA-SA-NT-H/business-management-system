package com.ebms.sales.controller;

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
import com.ebms.customer.entity.Customer;
import com.ebms.customer.repository.CustomerRepository;
import com.ebms.inventory.entity.Product;
import com.ebms.inventory.repository.InventoryTransactionRepository;
import com.ebms.inventory.repository.ProductRepository;
import com.ebms.sales.repository.SalesOrderItemRepository;
import com.ebms.sales.repository.SalesOrderRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@SpringBootTest
@AutoConfigureMockMvc
public class SalesOrderControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private SalesOrderRepository salesOrderRepository;

    @Autowired
    private SalesOrderItemRepository salesOrderItemRepository;

    @Autowired
    private InventoryTransactionRepository inventoryTransactionRepository;

    @Autowired
    private com.ebms.procurement.repository.PurchaseOrderItemRepository purchaseOrderItemRepository;

    @Autowired
    private com.ebms.procurement.repository.PurchaseOrderRepository purchaseOrderRepository;

    @Autowired
    private ObjectMapper objectMapper;

    private String token;
    private Customer testCustomer;
    private Product testProduct;

    @BeforeEach
    public void setup() throws Exception {
        salesOrderItemRepository.deleteAll();
        salesOrderRepository.deleteAll();
        purchaseOrderItemRepository.deleteAll();
        purchaseOrderRepository.deleteAll();
        inventoryTransactionRepository.deleteAll();
        productRepository.deleteAll();
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

        // Setup Customer
        testCustomer = Customer.builder()
                .name("John Sales")
                .email("john@sales.com")
                .phone("1112223333")
                .address("456 Market St")
                .build();
        testCustomer = customerRepository.save(testCustomer);

        // Setup Product
        testProduct = Product.builder()
                .sku("LAP-001")
                .name("Laptop")
                .description("High end laptop")
                .price(1200.0)
                .stockQuantity(10)
                .minimumStockLevel(2)
                .build();
        testProduct = productRepository.save(testProduct);
    }

    @Test
    public void testSalesOrderLifecycle() throws Exception {
        // 1. Create Sales Order
        Map<String, Object> orderRequest = new HashMap<>();
        orderRequest.put("customerId", testCustomer.getId());

        List<Map<String, Object>> items = new ArrayList<>();
        Map<String, Object> item = new HashMap<>();
        item.put("productId", testProduct.getId());
        item.put("quantity", 3);
        items.add(item);

        orderRequest.put("items", items);

        MvcResult createResult = mockMvc.perform(post("/api/orders")
                .header("Authorization", token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(orderRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.orderId").exists())
                .andExpect(jsonPath("$.orderNumber").value("ORD00001"))
                .andExpect(jsonPath("$.totalAmount").value(3600.0))
                .andExpect(jsonPath("$.customerName").value("John Sales"))
                .andReturn();

        JsonNode orderNode = objectMapper.readTree(createResult.getResponse().getContentAsString());
        Long orderId = orderNode.get("orderId").asLong();

        // Verify stock is reduced
        Product updatedProduct = productRepository.findById(testProduct.getId()).orElseThrow();
        assert updatedProduct.getStockQuantity() == 7;

        // 2. Get Order by ID
        mockMvc.perform(get("/api/orders/" + orderId)
                .header("Authorization", token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.orderId").value(orderId))
                .andExpect(jsonPath("$.orderNumber").value("ORD00001"));

        // 3. Try to order more than available stock
        Map<String, Object> invalidRequest = new HashMap<>();
        invalidRequest.put("customerId", testCustomer.getId());
        List<Map<String, Object>> invalidItems = new ArrayList<>();
        Map<String, Object> invalidItem = new HashMap<>();
        invalidItem.put("productId", testProduct.getId());
        invalidItem.put("quantity", 100); // Exceeds stock which is 7
        invalidItems.add(invalidItem);
        invalidRequest.put("items", invalidItems);

        mockMvc.perform(post("/api/orders")
                .header("Authorization", token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidRequest)))
                .andExpect(status().isInternalServerError());
    }
}
