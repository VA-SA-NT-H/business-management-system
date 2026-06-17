package com.ebms.report.service;

import com.ebms.inventory.dto.ProductResponse;
import com.ebms.report.dto.DashboardSummaryResponse;
import com.ebms.report.dto.RevenueReportResponse;
import com.ebms.report.dto.TopSellingProductResponse;

import java.util.List;

public interface ReportService {

    DashboardSummaryResponse getDashboardSummary();

    RevenueReportResponse getRevenueReport();

    List<TopSellingProductResponse> getTopSellingProducts();

    List<ProductResponse> getLowStockProducts();
}