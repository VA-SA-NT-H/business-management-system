package com.ebms.sales.service;

import java.util.List;

import com.ebms.sales.dto.CreateOrderRequest;
import com.ebms.sales.dto.SalesOrderResponse;

public interface SalesOrderService {

    SalesOrderResponse createOrder(
            CreateOrderRequest request
    );

    SalesOrderResponse getOrderById(
            Long id
    );

    List<SalesOrderResponse> getAllOrders();
}