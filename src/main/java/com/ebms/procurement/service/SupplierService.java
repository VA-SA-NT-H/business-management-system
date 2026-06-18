package com.ebms.procurement.service;

import com.ebms.procurement.dto.SupplierRequest;
import com.ebms.procurement.dto.SupplierResponse;

import java.util.List;

public interface SupplierService {

    SupplierResponse createSupplier(
            SupplierRequest request
    );

    SupplierResponse getSupplierById(
            Long id
    );

    List<SupplierResponse> getAllSuppliers();

    SupplierResponse updateSupplier(
            Long id,
            SupplierRequest request
    );

    void deleteSupplier(
            Long id
    );
}