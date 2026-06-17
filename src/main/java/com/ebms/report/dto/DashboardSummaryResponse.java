package com.ebms.report.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DashboardSummaryResponse {

    private Long totalCustomers;
    private Long totalProducts;
    private Long totalEmployees;
    private Long totalOrders;
    private Double totalRevenue;
}