package com.ebms.procurement.dto;

import lombok.Data;

@Data
public class SupplierRequest {

    private String supplierName;

    private String email;

    private String phone;

    private String address;
}