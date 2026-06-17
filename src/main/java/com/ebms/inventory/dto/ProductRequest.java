package com.ebms.inventory.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class ProductRequest {

    @NotBlank
    private String sku;

    @NotBlank
    private String name;

    private String description;

    @Positive
    private Double price;

    @Min(0)
    private Integer stockQuantity;

    @Min(0)
    private Integer minimumStockLevel;
}