package com.ebms.report.service;

import com.ebms.customer.repository.CustomerRepository;
import com.ebms.employee.repository.EmployeeRepository;
import com.ebms.inventory.dto.ProductResponse;
import com.ebms.inventory.entity.Product;
import com.ebms.inventory.repository.ProductRepository;
import com.ebms.report.dto.DashboardSummaryResponse;
import com.ebms.report.dto.RevenueReportResponse;
import com.ebms.report.dto.TopSellingProductResponse;
import com.ebms.sales.repository.SalesOrderItemRepository;
import com.ebms.sales.repository.SalesOrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;
    private final EmployeeRepository employeeRepository;
    private final SalesOrderRepository salesOrderRepository;
    private final SalesOrderItemRepository salesOrderItemRepository;

    @Override
    public DashboardSummaryResponse getDashboardSummary() {

        Double revenue =
                salesOrderRepository.getTotalRevenue();

        if (revenue == null) {
            revenue = 0.0;
        }

        return DashboardSummaryResponse.builder()
                .totalCustomers(customerRepository.count())
                .totalProducts(productRepository.count())
                .totalEmployees(employeeRepository.count())
                .totalOrders(salesOrderRepository.count())
                .totalRevenue(revenue)
                .build();
    }

    @Override
    public RevenueReportResponse getRevenueReport() {

        Double revenue =
                salesOrderRepository.getTotalRevenue();

        if (revenue == null) {
            revenue = 0.0;
        }

        long totalOrders =
                salesOrderRepository.count();

        double averageOrderValue =
                totalOrders == 0
                        ? 0
                        : revenue / totalOrders;

        return RevenueReportResponse.builder()
                .totalRevenue(revenue)
                .totalOrders(totalOrders)
                .averageOrderValue(averageOrderValue)
                .build();
    }

    @Override
    public List<TopSellingProductResponse>
    getTopSellingProducts() {

        return salesOrderItemRepository
                .getTopSellingProducts();
    }

    @Override
    public List<ProductResponse>
    getLowStockProducts() {

        return productRepository.findAll()
                .stream()
                .filter(product ->
                        product.getStockQuantity()
                                <=
                                product.getMinimumStockLevel()
                )
                .map(this::mapToProductResponse)
                .toList();
    }

    private ProductResponse mapToProductResponse(
            Product product) {

        return ProductResponse.builder()
                .id(product.getId())
                .sku(product.getSku())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .stockQuantity(product.getStockQuantity())
                .minimumStockLevel(
                        product.getMinimumStockLevel()
                )
                .build();
    }
}