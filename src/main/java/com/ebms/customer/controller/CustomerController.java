package com.ebms.customer.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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

}