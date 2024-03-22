package org.nolte.veggiebox.veggieboxserver.order;

import org.nolte.veggiebox.veggieboxserver.dto.OrderDto;
import org.nolte.veggiebox.veggieboxserver.entities.Order;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Transactional
    public Order createOrSave(Order order) {
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
