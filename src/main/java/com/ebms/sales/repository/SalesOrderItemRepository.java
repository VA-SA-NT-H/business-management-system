package com.ebms.sales.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ebms.report.dto.TopSellingProductResponse;
import com.ebms.sales.entity.SalesOrderItem;

public interface SalesOrderItemRepository
        extends JpaRepository<SalesOrderItem, Long> {

                @Query("""
                        SELECT new com.ebms.report.dto
                        .TopSellingProductResponse(
                        p.name,
                        SUM(i.quantity)
                        )
                        FROM SalesOrderItem i
                        JOIN i.product p
                        GROUP BY p.name
                        ORDER BY SUM(i.quantity) DESC
                        """)
                List<TopSellingProductResponse>
                        getTopSellingProducts();
}