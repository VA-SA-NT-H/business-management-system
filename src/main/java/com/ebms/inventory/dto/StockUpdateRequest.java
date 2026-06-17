package com.ebms.inventory.dto;

import jakarta.validation.constraints.Min;
import lombok.Data;

@Data
public class StockUpdateRequest {

    @Min(1)
    private Integer quantity;
}