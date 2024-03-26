package org.nolte.veggiebox.veggieboxserver.order;

import org.nolte.veggiebox.veggieboxserver.customer.CustomerRepository;
import org.nolte.veggiebox.veggieboxserver.entities.Order;
import org.nolte.veggiebox.veggieboxserver.product.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class OrderService {

    private final OrderRepository orderRepository;

    private final ProductRepository productRepository;

    private final CustomerRepository customerRepository;

    public OrderService(OrderRepository orderRepository,
                        ProductRepository productRepository,
                        CustomerRepository customerRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.customerRepository = customerRepository;
    }

    @Transactional
    public Order createOrSave(Order order) {
        order.setPurchased(LocalDateTime.now());
        return this.orderRepository.save(order);
    }

    public List<Order> getOrders() {
        return this.orderRepository.findAll();
    }

    public List<Order> getCustomerOrders(Long customerId) {
        return this.orderRepository.findByCustomer_Id(customerId);
    }

    public Order getOrder(Long id) {
        return this.orderRepository.findById(id).orElse(null);
    }

    @Transactional
    public Order update(Long id, Order order) {
        if (orderRepository.existsById(id)) {
            order.setId(id);
            return createOrSave(order);
        }
        return null;
    }
}
