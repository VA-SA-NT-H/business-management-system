package com.ebms.procurement.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class PurchaseOrderResponse {

    private Long id;

    private String poNumber;

    private String supplierName;

    private Double totalAmount;

    private LocalDateTime orderDate;
}