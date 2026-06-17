package com.ebms.sales.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ebms.sales.entity.SalesOrder;

public interface SalesOrderRepository
        extends JpaRepository<SalesOrder, Long> {
}