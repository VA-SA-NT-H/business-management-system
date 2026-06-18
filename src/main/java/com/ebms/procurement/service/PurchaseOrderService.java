package com.ebms.procurement.service;

import com.ebms.procurement.dto.CreatePurchaseOrderRequest;
import com.ebms.procurement.dto.PurchaseOrderResponse;

import java.util.List;

public interface PurchaseOrderService {

    PurchaseOrderResponse createPurchaseOrder(
            CreatePurchaseOrderRequest request
    );

    PurchaseOrderResponse getPurchaseOrderById(
            Long id
    );

    List<PurchaseOrderResponse> getAllPurchaseOrders();
}