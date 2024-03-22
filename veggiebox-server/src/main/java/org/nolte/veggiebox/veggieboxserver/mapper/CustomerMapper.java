package org.nolte.veggiebox.veggieboxserver.mapper;

import org.nolte.veggiebox.veggieboxserver.dto.CustomerDto;
import org.nolte.veggiebox.veggieboxserver.entities.Customer;
import org.springframework.stereotype.Component;

@Component
public class CustomerMapper implements ModelMapper<CustomerDto, Customer> {
    @Override
    public CustomerDto mapTo(Customer customer) {
        CustomerDto customerDto = new CustomerDto();
        customerDto.setId(customer.getId());
        customerDto.setFirstname(customer.getFirstname());
        customerDto.setLastname(customer.getLastname());
        customerDto.setPhone(customer.getPhone());
        return customerDto;
    }

    @Override
    public Customer mapFrom(CustomerDto dto) {
        Customer customer = new Customer();
        customer.setId(dto.getId());
        customer.setPhone(dto.getPhone());
        customer.setFirstname(dto.getFirstname());
        customer.setLastname(dto.getLastname());
        return customer;
    }
}
