package com.ebms.sales.controller;

import com.ebms.sales.dto.CreateOrderRequest;
import com.ebms.sales.dto.SalesOrderResponse;
import com.ebms.sales.service.SalesOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class SalesOrderController {

    private final SalesOrderService salesOrderService;

    @PostMapping
    public ResponseEntity<SalesOrderResponse> createOrder(
            @RequestBody CreateOrderRequest request) {

        return ResponseEntity.ok(
                salesOrderService.createOrder(request)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<SalesOrderResponse> getOrderById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                salesOrderService.getOrderById(id)
        );
    }

    @GetMapping
    public ResponseEntity<List<SalesOrderResponse>> getAllOrders() {

        return ResponseEntity.ok(
                salesOrderService.getAllOrders()
        );
    }
}