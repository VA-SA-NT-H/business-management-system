package com.ebms.report.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RevenueReportResponse {

    private Double totalRevenue;
    private Long totalOrders;
    private Double averageOrderValue;
}