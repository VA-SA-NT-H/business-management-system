package com.ebms.customer.repository;

import com.ebms.customer.entity.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository
        extends JpaRepository<Customer, Long> {

    Page<Customer> findByNameContainingIgnoreCase(
            String keyword,
            Pageable pageable
    );
}