package org.nolte.veggiebox.veggieboxserver.product;

import org.nolte.veggiebox.veggieboxserver.entities.Customer;
import org.nolte.veggiebox.veggieboxserver.entities.Product;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RestResource(exported = false)
@Repository
@Transactional(propagation = Propagation.MANDATORY)
public interface ProductRepository extends ListCrudRepository<Product, Long> {

    public List<Product> findByUuid(String uuid);

    @Override
    Product save(Product product);

    @Override
    void deleteById(Long id);

}
