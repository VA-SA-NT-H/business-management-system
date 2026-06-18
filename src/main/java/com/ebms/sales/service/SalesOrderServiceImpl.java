package com.ebms.sales.service;

import com.ebms.customer.entity.Customer;
import com.ebms.customer.repository.CustomerRepository;
import com.ebms.exception.ResourceNotFoundException;
import com.ebms.inventory.entity.InventoryTransaction;
import com.ebms.inventory.entity.Product;
import com.ebms.inventory.repository.InventoryTransactionRepository;
import com.ebms.inventory.repository.ProductRepository;
import com.ebms.sales.dto.CreateOrderRequest;
import com.ebms.sales.dto.OrderItemRequest;
import com.ebms.sales.dto.SalesOrderResponse;
import com.ebms.sales.entity.SalesOrder;
import com.ebms.sales.entity.SalesOrderItem;
import com.ebms.sales.repository.SalesOrderItemRepository;
import com.ebms.sales.repository.SalesOrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SalesOrderServiceImpl implements SalesOrderService {

    private final SalesOrderRepository salesOrderRepository;
    private final SalesOrderItemRepository salesOrderItemRepository;

    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;

    private final InventoryTransactionRepository
            inventoryTransactionRepository;

    @Override
    public SalesOrderResponse createOrder(
            CreateOrderRequest request) {

        Customer customer =
                customerRepository.findById(
                                request.getCustomerId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Customer not found with id: "
                                                + request.getCustomerId()
                                ));

        double totalAmount = 0.0;

        for (OrderItemRequest item : request.getItems()) {

            Product product =
                    productRepository.findById(
                                    item.getProductId())
                            .orElseThrow(() ->
                                    new ResourceNotFoundException(
                                            "Product not found with id: "
                                                    + item.getProductId()
                                    ));

            if (product.getStockQuantity()
                    < item.getQuantity()) {

                throw new RuntimeException(
                        "Insufficient stock for product: "
                                + product.getName()
                );
            }

            totalAmount +=
                    product.getPrice()
                            * item.getQuantity();
        }

        SalesOrder order =
                SalesOrder.builder()
                        .orderNumber(generateOrderNumber())
                        .customer(customer)
                        .totalAmount(totalAmount)
                        .orderDate(LocalDateTime.now())
                        .build();

        SalesOrder savedOrder =
                salesOrderRepository.save(order);

        for (OrderItemRequest item : request.getItems()) {

            Product product =
                    productRepository.findById(
                                    item.getProductId())
                            .orElseThrow(() ->
                                    new ResourceNotFoundException(
                                            "Product not found with id: "
                                                    + item.getProductId()
                                    ));

            SalesOrderItem orderItem =
                    SalesOrderItem.builder()
                            .salesOrder(savedOrder)
                            .product(product)
                            .quantity(item.getQuantity())
                            .unitPrice(product.getPrice())
                            .lineTotal(
                                    product.getPrice()
                                            * item.getQuantity()
                            )
                            .build();

            salesOrderItemRepository.save(orderItem);

            product.setStockQuantity(
                    product.getStockQuantity()
                            - item.getQuantity()
            );

            productRepository.save(product);

            InventoryTransaction transaction =
                    InventoryTransaction.builder()
                            .productId(product.getId())
                            .transactionType("SALE")
                            .quantity(item.getQuantity())
                            .transactionDate(
                                    LocalDateTime.now()
                            )
                            .build();

            inventoryTransactionRepository
                    .save(transaction);
        }

        return mapToResponse(savedOrder);
    }

    @Override
    public SalesOrderResponse getOrderById(
            Long id) {

        SalesOrder order =
                salesOrderRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Order not found with id: "
                                                + id
                                ));

        return mapToResponse(order);
    }

    @Override
    public List<SalesOrderResponse> getAllOrders() {

        return salesOrderRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public void deleteOrderById(Long id){

        SalesOrder order = salesOrderRepository
                                .findById(id)
                                .orElseThrow(() ->
                                        new ResourceNotFoundException(
                                                "Order not found with id: "+ id
                                        ));
        salesOrderRepository.delete(order);
    }

    private SalesOrderResponse mapToResponse(
            SalesOrder order) {

        return SalesOrderResponse.builder()
                .orderId(order.getId())
                .orderNumber(order.getOrderNumber())
                .customerName(
                        order.getCustomer().getName()
                )
                .totalAmount(order.getTotalAmount())
                .orderDate(order.getOrderDate())
                .build();
    }

    private String generateOrderNumber() {

        long count =
                salesOrderRepository.count() + 1;

        return String.format(
                "ORD%05d",
                count
        );
    }
}