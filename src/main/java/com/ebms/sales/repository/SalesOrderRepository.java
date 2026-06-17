package com.ebms.sales.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ebms.sales.entity.SalesOrder;

public interface SalesOrderRepository
        extends JpaRepository<SalesOrder, Long> {

                @Query("""
                SELECT COALESCE(SUM(s.totalAmount),0)
                FROM SalesOrder s
                """)
                Double getTotalRevenue();
}