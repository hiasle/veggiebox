package org.nolte.veggiebox.veggieboxserver.customer;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.nolte.veggiebox.veggieboxserver.entities.Customer;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

@Service
@Transactional(readOnly = true)
public class CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Transactional
    public Customer createOrSaveCustomer(Customer customer) {
        return this.customerRepository.save(customer);
    }

    public Customer findCustomerById(Long id) {
        return this.customerRepository.findById((long) id);
    }

    public List<Customer> getCustomers() {
        return this.customerRepository.findAll().stream()
                .sorted(Comparator.comparing(Customer::getLastname))
                .collect(Collectors.toList());
    }

    @Transactional
    public Customer updateCustomer(Long id, Customer customer) {
        if (!existsById(id)) {
            throw new RuntimeException("CustomerEntity with id [" + id + "] not found!");
        }
        customer.setId(id);
        return createOrSaveCustomer(customer);
    }

    @Transactional
    public void deleteCustomer(Long id) {
        Optional<Customer> customer = this.customerRepository.findById(id);
        if (customer.isPresent()) {
            customerRepository.deleteById(id);
        }
    }

    boolean existsById(Long id) {
        Assert.notNull(id, "The id should not be null!");
        return this.customerRepository.existsById((long) id);
    }

}
