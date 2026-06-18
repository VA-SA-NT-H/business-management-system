package com.ebms.procurement.controller;

import com.ebms.procurement.dto.SupplierRequest;
import com.ebms.procurement.dto.SupplierResponse;
import com.ebms.procurement.service.SupplierService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/suppliers")
@RequiredArgsConstructor
@Tag(
        name = "Supplier Management",
        description = "Supplier and Procurement APIs"
)
public class SupplierController {

    private final SupplierService supplierService;

    @Operation(summary = "Create Supplier")
    @PostMapping
    public ResponseEntity<SupplierResponse> createSupplier(
            @RequestBody SupplierRequest request) {

        return ResponseEntity.ok(
                supplierService.createSupplier(
                        request
                )
        );
    }

    @Operation(summary = "Get Supplier By ID")
    @GetMapping("/{id}")
    public ResponseEntity<SupplierResponse> getSupplierById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                supplierService.getSupplierById(id)
        );
    }

    @Operation(summary = "Get All Suppliers")
    @GetMapping
    public ResponseEntity<List<SupplierResponse>>
    getAllSuppliers() {

        return ResponseEntity.ok(
                supplierService.getAllSuppliers()
        );
    }

    @Operation(summary = "Update Supplier")
    @PutMapping("/{id}")
    public ResponseEntity<SupplierResponse>
    updateSupplier(
            @PathVariable Long id,
            @RequestBody SupplierRequest request) {

        return ResponseEntity.ok(
                supplierService.updateSupplier(
                        id,
                        request
                )
        );
    }

    @Operation(summary = "Delete Supplier")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSupplier(
            @PathVariable Long id) {

        supplierService.deleteSupplier(id);

        return ResponseEntity.ok(
                "Supplier deleted successfully"
        );
    }
}