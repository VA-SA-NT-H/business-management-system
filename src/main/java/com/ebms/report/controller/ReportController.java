package com.ebms.report.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ebms.inventory.dto.ProductResponse;
import com.ebms.report.dto.DashboardSummaryResponse;
import com.ebms.report.dto.RevenueReportResponse;
import com.ebms.report.dto.TopSellingProductResponse;
import com.ebms.report.service.ReportService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @GetMapping("/dashboard")
    public DashboardSummaryResponse
    getDashboard() {

        return reportService
                .getDashboardSummary();
    }

    @GetMapping("/revenue")
    public RevenueReportResponse
    getRevenueReport() {

        return reportService
                .getRevenueReport();
    }

    @GetMapping("/top-products")
    public List<TopSellingProductResponse>
    getTopProducts() {

        return reportService
                .getTopSellingProducts();
    }

    @GetMapping("/low-stock")
    public List<ProductResponse>
    getLowStockProducts() {

        return reportService
                .getLowStockProducts();
    }
}