package com.ebms.customer.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ebms.customer.dto.CustomerRequest;
import com.ebms.customer.dto.CustomerResponse;
import com.ebms.customer.service.CustomerService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/customers")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService service;

    @PostMapping
    public ResponseEntity<CustomerResponse>
    createCustomer(
            @Valid
            @RequestBody
            CustomerRequest request
    ) {

        return ResponseEntity.ok(
                service.createCustomer(
                        request
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomerResponse>
    getCustomerById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                service.getCustomerById(id)
        );
    }

    @GetMapping
        public ResponseEntity<Page<CustomerResponse>> getAllCustomers(
                @RequestParam(defaultValue = "0") int page,
                @RequestParam(defaultValue = "10") int size) {

        return ResponseEntity.ok(
                service.getAllCustomers(page, size)
        );
        }

        @PutMapping("/{id}")
        public ResponseEntity<CustomerResponse> updateCustomer(
        @PathVariable Long id,
        @Valid @RequestBody CustomerRequest request) {

        return ResponseEntity.ok(
            service.updateCustomer(id, request)
        );
        }

        @DeleteMapping("/{id}")
        public ResponseEntity<String> deleteCustomer(
                @PathVariable Long id) {

        service.deleteCustomer(id);

        return ResponseEntity.ok("Customer deleted successfully");
        }

        @GetMapping("/search")
        public ResponseEntity<Page<CustomerResponse>> searchCustomers(
                @RequestParam String keyword,
                @RequestParam(defaultValue = "0") int page,
                @RequestParam(defaultValue = "10") int size) {

        return ResponseEntity.ok(
                service.searchCustomer(
                        keyword,
                        page,
                        size)
        );
        }

}