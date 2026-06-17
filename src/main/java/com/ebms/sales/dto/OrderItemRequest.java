package com.ebms.sales.dto;

import lombok.Data;

@Data
public class OrderItemRequest {

    private Long productId;

    private Integer quantity;
}