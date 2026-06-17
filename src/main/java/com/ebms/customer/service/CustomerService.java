package com.ebms.customer.service;

import com.ebms.customer.dto.CustomerRequest;
import com.ebms.customer.dto.CustomerResponse;
import org.springframework.data.domain.Page;

public interface CustomerService {

    CustomerResponse createCustomer(
            CustomerRequest request
    );

    CustomerResponse getCustomerById(
            Long id
    );

    Page<CustomerResponse> getAllCustomers(
            int page,
            int size
    );

    CustomerResponse updateCustomer(
            Long id,
            CustomerRequest request
    );

    void deleteCustomer(
            Long id
    );

    Page<CustomerResponse> searchCustomer(
            String keyword,
            int page,
            int size
    );
}