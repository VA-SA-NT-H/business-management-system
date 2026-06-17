package com.ebms.sales.entity;


import com.ebms.inventory.entity.Product;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "sales_order_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SalesOrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer quantity;

    private Double unitPrice;

    private Double lineTotal;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private SalesOrder salesOrder;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
}