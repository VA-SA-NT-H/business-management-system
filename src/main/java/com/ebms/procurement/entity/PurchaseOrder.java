package com.ebms.procurement.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "purchase_orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PurchaseOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String poNumber;

    private Double totalAmount;

    private LocalDateTime orderDate;

    @ManyToOne
    @JoinColumn(name = "supplier_id")
    private Supplier supplier;
}