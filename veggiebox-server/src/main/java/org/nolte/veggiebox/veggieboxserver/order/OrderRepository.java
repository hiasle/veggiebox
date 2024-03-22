package org.nolte.veggiebox.veggieboxserver.order;

import org.nolte.veggiebox.veggieboxserver.entities.Order;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RestResource(exported = false)
@Repository
// @Transactional(propagation = Propagation.MANDATORY)
public interface OrderRepository extends ListCrudRepository<Order, Long> {

    @Override
    Order save(Order order);

    List<Order> findByCustomer_Id(Long customerId);

}
