package com.ebms.procurement.dto;

import lombok.Data;

@Data
public class PurchaseOrderItemRequest {

    private Long productId;

    private Integer quantity;

    private Double unitCost;
}