package org.nolte.veggiebox.veggieboxserver.customer;

import org.nolte.veggiebox.veggieboxserver.entities.Customer;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RestResource(exported = false)
@Repository
@Transactional(propagation = Propagation.MANDATORY)
public interface CustomerRepository
        extends ListCrudRepository<Customer, Long> {

    public List<Customer> findByLastname(String lastname);

    public Customer findById(long id);

    public List<Customer> findByUuid(String uuid);

    public List<Customer> findByPhone(String phone);

    @Override
    Customer save(Customer entity);

    @Override
    void deleteById(Long id);

}
