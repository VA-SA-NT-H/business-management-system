package com.ebms.report.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TopSellingProductResponse {

    private String productName;
    private Long totalSold;
}