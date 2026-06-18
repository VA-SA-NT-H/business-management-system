package com.ebms.procurement.service;

import com.ebms.audit.service.AuditLogService;
import com.ebms.exception.ResourceNotFoundException;
import com.ebms.procurement.dto.SupplierRequest;
import com.ebms.procurement.dto.SupplierResponse;
import com.ebms.procurement.entity.Supplier;
import com.ebms.procurement.repository.SupplierRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SupplierServiceImpl implements SupplierService {

    private final SupplierRepository supplierRepository;
    private final AuditLogService auditLogService;

    @Override
    public SupplierResponse createSupplier(
            SupplierRequest request) {

        Supplier supplier = Supplier.builder()
                .supplierCode(generateSupplierCode())
                .supplierName(request.getSupplierName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .address(request.getAddress())
                .active(true)
                .build();

        Supplier savedSupplier =
                supplierRepository.save(supplier);

        auditLogService.log(
                "SYSTEM",
                "CREATE_SUPPLIER",
                "SUPPLIER",
                savedSupplier.getId()
        );

        return mapToResponse(savedSupplier);
    }

    @Override
    public SupplierResponse getSupplierById(
            Long id) {

        Supplier supplier =
                supplierRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Supplier not found with id: "
                                                + id
                                ));

        return mapToResponse(supplier);
    }

    @Override
    public List<SupplierResponse> getAllSuppliers() {

        return supplierRepository.findAll()
                .stream()
                .filter(Supplier::getActive)
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public SupplierResponse updateSupplier(
            Long id,
            SupplierRequest request) {

        Supplier supplier =
                supplierRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Supplier not found with id: "
                                                + id
                                ));

        supplier.setSupplierName(
                request.getSupplierName());
        supplier.setEmail(
                request.getEmail());
        supplier.setPhone(
                request.getPhone());
        supplier.setAddress(
                request.getAddress());

        Supplier updatedSupplier =
                supplierRepository.save(supplier);

        auditLogService.log(
                "SYSTEM",
                "UPDATE_SUPPLIER",
                "SUPPLIER",
                updatedSupplier.getId()
        );

        return mapToResponse(updatedSupplier);
    }

    @Override
    public void deleteSupplier(
            Long id) {

        Supplier supplier =
                supplierRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Supplier not found with id: "
                                                + id
                                ));

        supplier.setActive(false);

        supplierRepository.save(supplier);

        auditLogService.log(
                "SYSTEM",
                "DELETE_SUPPLIER",
                "SUPPLIER",
                supplier.getId()
        );
    }

    private SupplierResponse mapToResponse(
            Supplier supplier) {

        return SupplierResponse.builder()
                .id(supplier.getId())
                .supplierCode(
                        supplier.getSupplierCode())
                .supplierName(
                        supplier.getSupplierName())
                .email(supplier.getEmail())
                .phone(supplier.getPhone())
                .address(supplier.getAddress())
                .active(supplier.getActive())
                .build();
    }

    private String generateSupplierCode() {

        long count =
                supplierRepository.count() + 1;

        return String.format(
                "SUP%03d",
                count
        );
    }
}