package com.ebms.procurement.repository;

import com.ebms.procurement.entity.PurchaseOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PurchaseOrderRepository
        extends JpaRepository<PurchaseOrder, Long> {

            @Query("""
            SELECT COALESCE(SUM(p.totalAmount),0)
            FROM PurchaseOrder p
            """)
            Double getTotalProcurementCost();
}