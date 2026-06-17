package com.ebms.inventory.controller;

import com.ebms.inventory.dto.ProductRequest;
import com.ebms.inventory.dto.ProductResponse;
import com.ebms.inventory.dto.StockUpdateRequest;
import com.ebms.inventory.entity.InventoryTransaction;
import com.ebms.inventory.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping
    public ResponseEntity<ProductResponse> createProduct(
            @Valid @RequestBody ProductRequest request) {

        return ResponseEntity.ok(
                productService.createProduct(request)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getProductById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                productService.getProductById(id)
        );
    }

    @GetMapping
    public ResponseEntity<Page<ProductResponse>> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        return ResponseEntity.ok(
                productService.getAllProducts(page, size)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse> updateProduct(
            @PathVariable Long id,
            @Valid @RequestBody ProductRequest request) {

        return ResponseEntity.ok(
                productService.updateProduct(id, request)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(
            @PathVariable Long id) {

        productService.deleteProduct(id);

        return ResponseEntity.ok(
                "Product deleted successfully"
        );
    }

    @PostMapping("/{id}/add-stock")
    public ResponseEntity<ProductResponse> addStock(
            @PathVariable Long id,
            @Valid @RequestBody StockUpdateRequest request) {

        return ResponseEntity.ok(
                productService.addStock(
                        id,
                        request.getQuantity()
                )
        );
    }

    @PostMapping("/{id}/remove-stock")
    public ResponseEntity<ProductResponse> removeStock(
            @PathVariable Long id,
            @Valid @RequestBody StockUpdateRequest request) {

        return ResponseEntity.ok(
                productService.removeStock(
                        id,
                        request.getQuantity()
                )
        );
    }

    @GetMapping("/low-stock")
    public ResponseEntity<List<ProductResponse>> getLowStockProducts() {

        return ResponseEntity.ok(
                productService.getLowStockProducts()
        );
    }

    @GetMapping("/{id}/transactions")
    public ResponseEntity<List<InventoryTransaction>> getTransactionHistory(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                productService.getTransactionHistory(id)
        );
    }
}