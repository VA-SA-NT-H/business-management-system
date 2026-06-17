package com.ebms.inventory.repository;

import com.ebms.inventory.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepository
        extends JpaRepository<Product, Long> {

    Optional<Product> findBySku(String sku);

    List<Product> findByStockQuantityLessThanEqual(
            Integer stockQuantity
    );
}