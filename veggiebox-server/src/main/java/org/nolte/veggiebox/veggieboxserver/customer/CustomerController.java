package org.nolte.veggiebox.veggieboxserver.customer;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.nolte.veggiebox.veggieboxserver.dto.CustomerDto;
import org.nolte.veggiebox.veggieboxserver.entities.Customer;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/customers")
@CrossOrigin(origins = "http://localhost:4200")
public class CustomerController {

    private final CustomerService customerService;

    private final ModelMapper mapper;

    public CustomerController(CustomerService customerService, ModelMapper modelMapper) {
        this.customerService = customerService;
        this.mapper = modelMapper;
    }

    @GetMapping
    public ResponseEntity<List<CustomerDto>> getCustomers() {
        return ResponseEntity.ok(customerService.getCustomers().stream()
                .map(entity -> mapper.map(entity, CustomerDto.class)).collect(Collectors.toList()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomerDto> getCustomer(@PathVariable Long id) {
        return ResponseEntity.ok(mapper.map(this.customerService.findCustomerById(id), CustomerDto.class));
    }

    @PostMapping
    public ResponseEntity<CustomerDto> addCustomer(@Valid @RequestBody CustomerDto customer) {
        Customer entity = mapper.map(customer, Customer.class);
        return ResponseEntity.ok(mapper.map(customerService.createOrSaveCustomer(entity), CustomerDto.class));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CustomerDto> editCustomer(@PathVariable Long id, @RequestBody CustomerDto dto) {
        Customer customer = mapper.map(dto, Customer.class);
        return ResponseEntity.ok(mapper.map(customerService.updateCustomer(id, customer), CustomerDto.class));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Long id) {
        this.customerService.deleteCustomer(id);
        return ResponseEntity.noContent().build();
    }

}
