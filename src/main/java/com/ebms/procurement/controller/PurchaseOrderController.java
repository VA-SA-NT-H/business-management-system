package com.ebms.procurement.controller;

import com.ebms.procurement.dto.CreatePurchaseOrderRequest;
import com.ebms.procurement.dto.PurchaseOrderResponse;
import com.ebms.procurement.service.PurchaseOrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/purchase-orders")
@RequiredArgsConstructor
@Tag(
        name = "Purchase Order Management",
        description = "Procurement APIs"
)
public class PurchaseOrderController {

    private final PurchaseOrderService purchaseOrderService;

    @Operation(summary = "Create Purchase Order")
    @PostMapping
    public ResponseEntity<PurchaseOrderResponse>
    createPurchaseOrder(
            @RequestBody
            CreatePurchaseOrderRequest request) {

        return ResponseEntity.ok(
                purchaseOrderService
                        .createPurchaseOrder(request)
        );
    }

    @Operation(summary = "Get Purchase Order By ID")
    @GetMapping("/{id}")
    public ResponseEntity<PurchaseOrderResponse>
    getPurchaseOrderById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                purchaseOrderService
                        .getPurchaseOrderById(id)
        );
    }

    @Operation(summary = "Get All Purchase Orders")
    @GetMapping
    public ResponseEntity<List<PurchaseOrderResponse>>
    getAllPurchaseOrders() {

        return ResponseEntity.ok(
                purchaseOrderService
                        .getAllPurchaseOrders()
        );
    }
}