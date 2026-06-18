package com.ebms.procurement.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SupplierResponse {

    private Long id;

    private String supplierCode;

    private String supplierName;

    private String email;

    private String phone;

    private String address;

    private Boolean active;
}