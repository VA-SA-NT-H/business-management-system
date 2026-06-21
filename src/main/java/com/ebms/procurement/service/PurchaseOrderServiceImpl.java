package com.ebms.procurement.service;

import com.ebms.audit.service.AuditLogService;
import com.ebms.exception.ResourceNotFoundException;
import com.ebms.inventory.entity.InventoryTransaction;
import com.ebms.inventory.entity.Product;
import com.ebms.inventory.repository.InventoryTransactionRepository;
import com.ebms.inventory.repository.ProductRepository;
import com.ebms.procurement.dto.CreatePurchaseOrderRequest;
import com.ebms.procurement.dto.PurchaseOrderItemRequest;
import com.ebms.procurement.dto.PurchaseOrderResponse;
import com.ebms.procurement.entity.PurchaseOrder;
import com.ebms.procurement.entity.PurchaseOrderItem;
import com.ebms.procurement.entity.Supplier;
import com.ebms.procurement.repository.PurchaseOrderItemRepository;
import com.ebms.procurement.repository.PurchaseOrderRepository;
import com.ebms.procurement.repository.SupplierRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PurchaseOrderServiceImpl
        implements PurchaseOrderService {

    private final PurchaseOrderRepository purchaseOrderRepository;
    private final PurchaseOrderItemRepository purchaseOrderItemRepository;
    private final SupplierRepository supplierRepository;
    private final ProductRepository productRepository;
    private final InventoryTransactionRepository inventoryTransactionRepository;
    private final AuditLogService auditLogService;

    @Override
    @Transactional
    public PurchaseOrderResponse createPurchaseOrder(
            CreatePurchaseOrderRequest request) {

        Supplier supplier =
                supplierRepository.findById(
                                request.getSupplierId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Supplier not found with id: "
                                                + request.getSupplierId()));

        double totalAmount = 0.0;

        for (PurchaseOrderItemRequest item : request.getItems()) {
            totalAmount +=
                    item.getUnitCost()
                            * item.getQuantity();
        }

        PurchaseOrder purchaseOrder =
                PurchaseOrder.builder()
                        .poNumber(generatePONumber())
                        .supplier(supplier)
                        .totalAmount(totalAmount)
                        .orderDate(LocalDateTime.now())
                        .build();

        PurchaseOrder savedPO =
                purchaseOrderRepository.save(purchaseOrder);

        java.util.List<PurchaseOrderItem> poItemsList = new java.util.ArrayList<>();

        for (PurchaseOrderItemRequest item : request.getItems()) {

            Product product =
                    productRepository.findById(
                                    item.getProductId())
                            .orElseThrow(() ->
                                    new ResourceNotFoundException(
                                            "Product not found with id: "
                                                    + item.getProductId()));

            PurchaseOrderItem poItem =
                    PurchaseOrderItem.builder()
                            .purchaseOrder(savedPO)
                            .product(product)
                            .quantity(item.getQuantity())
                            .unitCost(item.getUnitCost())
                            .lineTotal(
                                    item.getUnitCost()
                                            * item.getQuantity())
                            .build();

            purchaseOrderItemRepository.save(poItem);
            poItemsList.add(poItem);

            product.setStockQuantity(
                    product.getStockQuantity()
                            + item.getQuantity());

            productRepository.save(product);

            InventoryTransaction transaction =
                    InventoryTransaction.builder()
                            .productId(product.getId())
                            .transactionType("PURCHASE")
                            .quantity(item.getQuantity())
                            .transactionDate(LocalDateTime.now())
                            .build();

            inventoryTransactionRepository.save(transaction);
        }

        savedPO.setItems(poItemsList);

        auditLogService.log(
                "SYSTEM",
                "CREATE_PURCHASE_ORDER",
                "PURCHASE_ORDER",
                savedPO.getId()
        );

        return mapToResponse(savedPO);
    }

    @Override
    public PurchaseOrderResponse getPurchaseOrderById(
            Long id) {

        PurchaseOrder purchaseOrder =
                purchaseOrderRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Purchase Order not found with id: "
                                                + id));

        return mapToResponse(purchaseOrder);
    }

    @Override
    public List<PurchaseOrderResponse>
    getAllPurchaseOrders() {

        return purchaseOrderRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private PurchaseOrderResponse mapToResponse(
            PurchaseOrder po) {

        String productName = "N/A";
        int totalQty = 0;
        if (po.getItems() != null && !po.getItems().isEmpty()) {
            productName = po.getItems().get(0).getProduct().getName();
            totalQty = po.getItems().stream()
                    .mapToInt(PurchaseOrderItem::getQuantity)
                    .sum();
        }

        return PurchaseOrderResponse.builder()
                .id(po.getId())
                .poNumber(po.getPoNumber())
                .supplierName(
                        po.getSupplier()
                                .getSupplierName())
                .totalAmount(po.getTotalAmount())
                .orderDate(po.getOrderDate())
                .productName(productName)
                .quantity(totalQty)
                .build();
    }

    private String generatePONumber() {

        long count =
                purchaseOrderRepository.count() + 1;

        return String.format(
                "PO%05d",
                count
        );
    }
}