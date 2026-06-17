package com.ebms.sales.dto;

import java.util.List;

import lombok.Data;

@Data
public class CreateOrderRequest {

    private Long customerId;

    private List<OrderItemRequest> items;
}