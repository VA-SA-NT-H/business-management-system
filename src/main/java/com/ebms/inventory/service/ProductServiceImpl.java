package com.ebms.inventory.service;

import com.ebms.exception.ResourceNotFoundException;
import com.ebms.inventory.dto.ProductRequest;
import com.ebms.inventory.dto.ProductResponse;
import com.ebms.inventory.entity.InventoryTransaction;
import com.ebms.inventory.entity.Product;
import com.ebms.inventory.repository.InventoryTransactionRepository;
import com.ebms.inventory.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final InventoryTransactionRepository transactionRepository;

    @Override
    public ProductResponse createProduct(ProductRequest request) {

        if (productRepository.findBySku(request.getSku()).isPresent()) {
            throw new RuntimeException(
                    "Product already exists with SKU: "
                            + request.getSku()
            );
        }

        Product product = Product.builder()
                .sku(request.getSku())
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .stockQuantity(request.getStockQuantity())
                .minimumStockLevel(request.getMinimumStockLevel())
                .createdAt(LocalDateTime.now())
                .build();

        Product savedProduct =
                productRepository.save(product);

        return mapToResponse(savedProduct);
    }

    @Override
    public ProductResponse getProductById(Long id) {

        Product product = productRepository
                .findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Product not found with id: " + id
                        ));

        return mapToResponse(product);
    }

    @Override
    public Page<ProductResponse> getAllProducts(
            int page,
            int size
    ) {

        return productRepository
                .findAll(PageRequest.of(page, size))
                .map(this::mapToResponse);
    }

    @Override
    public ProductResponse updateProduct(
            Long id,
            ProductRequest request
    ) {

        Product product = productRepository
                .findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Product not found with id: " + id
                        ));

        product.setSku(request.getSku());
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStockQuantity(request.getStockQuantity());
        product.setMinimumStockLevel(
                request.getMinimumStockLevel()
        );

        Product updatedProduct =
                productRepository.save(product);

        return mapToResponse(updatedProduct);
    }

    @Override
    public void deleteProduct(Long id) {

        Product product = productRepository
                .findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Product not found with id: " + id
                        ));

        productRepository.delete(product);
    }

    @Override
    public ProductResponse addStock(
            Long id,
            Integer quantity
    ) {

        Product product = productRepository
                .findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Product not found with id: " + id
                        ));

        product.setStockQuantity(
                product.getStockQuantity() + quantity
        );

        Product updatedProduct =
                productRepository.save(product);

        InventoryTransaction transaction =
                InventoryTransaction.builder()
                        .productId(id)
                        .transactionType("IN")
                        .quantity(quantity)
                        .transactionDate(
                                LocalDateTime.now()
                        )
                        .build();

        transactionRepository.save(transaction);

        return mapToResponse(updatedProduct);
    }

    @Override
    public ProductResponse removeStock(
            Long id,
            Integer quantity
    ) {

        Product product = productRepository
                .findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Product not found with id: " + id
                        ));

        if (product.getStockQuantity() < quantity) {
            throw new RuntimeException(
                    "Insufficient stock available"
            );
        }

        product.setStockQuantity(
                product.getStockQuantity() - quantity
        );

        Product updatedProduct =
                productRepository.save(product);

        InventoryTransaction transaction =
                InventoryTransaction.builder()
                        .productId(id)
                        .transactionType("OUT")
                        .quantity(quantity)
                        .transactionDate(
                                LocalDateTime.now()
                        )
                        .build();

        transactionRepository.save(transaction);

        return mapToResponse(updatedProduct);
    }

    @Override
    public List<ProductResponse> getLowStockProducts() {

        return productRepository.findAll()
                .stream()
                .filter(product ->
                        product.getStockQuantity()
                                <=
                                product.getMinimumStockLevel()
                )
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<InventoryTransaction> getTransactionHistory(
            Long productId
    ) {

        Product product = productRepository
                .findById(productId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Product not found with id: "
                                        + productId
                        ));

        return transactionRepository
                .findByProductId(product.getId());
    }

    private ProductResponse mapToResponse(
            Product product
    ) {

        return ProductResponse.builder()
                .id(product.getId())
                .sku(product.getSku())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .stockQuantity(
                        product.getStockQuantity()
                )
                .minimumStockLevel(
                        product.getMinimumStockLevel()
                )
                .build();
    }
}