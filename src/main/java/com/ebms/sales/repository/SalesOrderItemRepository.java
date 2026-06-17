package com.ebms.sales.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ebms.sales.entity.SalesOrderItem;

public interface SalesOrderItemRepository
        extends JpaRepository<SalesOrderItem, Long> {
}