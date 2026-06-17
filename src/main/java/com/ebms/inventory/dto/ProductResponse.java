package com.ebms.inventory.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProductResponse {

    private Long id;
    private String sku;
    private String name;
    private String description;
    private Double price;
    private Integer stockQuantity;
    private Integer minimumStockLevel;
}