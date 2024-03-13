package org.nolte.veggiebox.veggieboxserver.controllers;

import java.util.Arrays;
import java.util.List;

import org.nolte.veggiebox.veggieboxserver.models.Customer;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/customer")
@CrossOrigin(origins = "http://localhost:4200")
public class CustomerController {

    List<Customer> customers = Arrays.asList(
            new Customer("Matthias", "Huber"),
            new Customer("Viktoria", "Czanek"));

    @GetMapping("/names")
    public ResponseEntity<List<String>> getCustomerNames() {
        return ResponseEntity.ok(Arrays.asList("Matthias", "Hans"));
    }

    @GetMapping("/")
    public List<Customer> getCustomers() {
        return this.customers;
    }

}
