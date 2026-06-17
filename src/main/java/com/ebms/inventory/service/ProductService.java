package com.ebms.inventory.service;

import com.ebms.inventory.dto.*;
import com.ebms.inventory.entity.InventoryTransaction;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProductService {

    ProductResponse createProduct(ProductRequest request);

    ProductResponse getProductById(Long id);

    Page<ProductResponse> getAllProducts(
            int page,
            int size
    );

    ProductResponse updateProduct(
            Long id,
            ProductRequest request
    );

    void deleteProduct(Long id);

    ProductResponse addStock(
            Long id,
            Integer quantity
    );

    ProductResponse removeStock(
            Long id,
            Integer quantity
    );

    List<ProductResponse> getLowStockProducts();

    List<InventoryTransaction>
    getTransactionHistory(Long productId);
}