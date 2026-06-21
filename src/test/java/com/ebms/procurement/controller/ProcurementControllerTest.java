package com.ebms.procurement.controller;

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
import com.ebms.inventory.entity.Product;
import com.ebms.inventory.repository.InventoryTransactionRepository;
import com.ebms.inventory.repository.ProductRepository;
import com.ebms.procurement.entity.Supplier;
import com.ebms.procurement.repository.PurchaseOrderItemRepository;
import com.ebms.procurement.repository.PurchaseOrderRepository;
import com.ebms.procurement.repository.SupplierRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@SpringBootTest
@AutoConfigureMockMvc
public class ProcurementControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SupplierRepository supplierRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private PurchaseOrderRepository purchaseOrderRepository;

    @Autowired
    private PurchaseOrderItemRepository purchaseOrderItemRepository;

    @Autowired
    private InventoryTransactionRepository inventoryTransactionRepository;

    @Autowired
    private com.ebms.sales.repository.SalesOrderItemRepository salesOrderItemRepository;

    @Autowired
    private com.ebms.sales.repository.SalesOrderRepository salesOrderRepository;

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
        supplierRepository.deleteAll();
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
    public void testSupplierAndPurchaseOrderLifecycle() throws Exception {
        // 1. Create Supplier
        Map<String, String> supplierRequest = new HashMap<>();
        supplierRequest.put("supplierName", "Global Tech Parts");
        supplierRequest.put("contactName", "Jane Smith");
        supplierRequest.put("email", "jane@globaltech.com");
        supplierRequest.put("phone", "555-0199");
        supplierRequest.put("address", "789 Assembly Road");

        MvcResult supplierResult = mockMvc.perform(post("/api/suppliers")
                .header("Authorization", token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(supplierRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.supplierName").value("Global Tech Parts"))
                .andReturn();

        JsonNode supplierNode = objectMapper.readTree(supplierResult.getResponse().getContentAsString());
        Long supplierId = supplierNode.get("id").asLong();

        // 2. Create Product
        Product product = Product.builder()
                .sku("CPU-001")
                .name("Intel Core i7")
                .description("8-core processor")
                .price(299.99)
                .stockQuantity(10)
                .minimumStockLevel(5)
                .build();
        product = productRepository.save(product);

        // 3. Create Purchase Order
        Map<String, Object> poRequest = new HashMap<>();
        poRequest.put("supplierId", supplierId);

        List<Map<String, Object>> items = new ArrayList<>();
        Map<String, Object> item = new HashMap<>();
        item.put("productId", product.getId());
        item.put("quantity", 15);
        item.put("unitCost", 250.0);
        items.add(item);

        poRequest.put("items", items);

        mockMvc.perform(post("/api/purchase-orders")
                .header("Authorization", token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(poRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.poNumber").value("PO00001"))
                .andExpect(jsonPath("$.totalAmount").value(3750.0))
                .andExpect(jsonPath("$.supplierName").value("Global Tech Parts"));

        // Verify product stock is updated
        Product updatedProduct = productRepository.findById(product.getId()).orElseThrow();
        // Initial stock (10) + PO quantity (15) = 25
        assert updatedProduct.getStockQuantity() == 25;
    }
}
