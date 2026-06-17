package com.ebms.customer.service;

import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.ebms.customer.dto.CustomerRequest;
import com.ebms.customer.dto.CustomerResponse;
import com.ebms.customer.entity.Customer;
import com.ebms.customer.repository.CustomerRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl
        implements CustomerService {

    private final CustomerRepository repository;

    @Override
    public CustomerResponse createCustomer( CustomerRequest request ) {

        Customer customer =
                Customer.builder()
                        .name(request.getName())
                        .email(request.getEmail())
                        .phone(request.getPhone())
                        .address(request.getAddress())
                        .createdAt(LocalDateTime.now())
                        .build();

        Customer saved =
                repository.save(customer);

        return mapToResponse(saved);
    }

    @Override
    public CustomerResponse getCustomerById(Long id) {

        Customer customer =
                repository.findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Customer not found"
                                )
                        );

        return mapToResponse(customer);
    }

    private CustomerResponse mapToResponse(
            Customer customer
    ) {

        return CustomerResponse.builder()
                .id(customer.getId())
                .name(customer.getName())
                .email(customer.getEmail())
                .phone(customer.getPhone())
                .address(customer.getAddress())
                .build();
    }

     @Override
    public Page<CustomerResponse> getAllCustomers(int page, int size) {

        return repository.findAll(PageRequest.of(page, size))
                .map(this::mapToResponse);
    }

    @Override
    public CustomerResponse updateCustomer(Long id, CustomerRequest request) {

        Customer customer = repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Customer not found with id: " + id));

        customer.setName(request.getName());
        customer.setEmail(request.getEmail());
        customer.setPhone(request.getPhone());
        customer.setAddress(request.getAddress());

        Customer updatedCustomer = repository.save(customer);

        return mapToResponse(updatedCustomer);
    }

    @Override
    public void deleteCustomer(Long id) {

        Customer customer = repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Customer not found with id: " + id));

        repository.delete(customer);
    }

    @Override
    public Page<CustomerResponse> searchCustomer(
            String keyword,
            int page,
            int size) {

        return repository
                .findByNameContainingIgnoreCase(
                        keyword,
                        PageRequest.of(page, size))
                .map(this::mapToResponse);
    }
}