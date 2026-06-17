package com.ebms.sales.dto;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SalesOrderResponse {

    private Long orderId;

    private String orderNumber;

    private String customerName;

    private Double totalAmount;

    private LocalDateTime orderDate;
}