package org.nolte.veggiebox.veggieboxserver.mapper;

import org.nolte.veggiebox.veggieboxserver.dto.CustomerDto;
import org.nolte.veggiebox.veggieboxserver.dto.OrderDetailDto;
import org.nolte.veggiebox.veggieboxserver.dto.OrderDto;
import org.nolte.veggiebox.veggieboxserver.entities.Customer;
import org.nolte.veggiebox.veggieboxserver.entities.Order;
import org.nolte.veggiebox.veggieboxserver.entities.OrderDetail;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class OrderMapper implements ModelMapper<OrderDto, Order> {

    private final CustomerMapper customerMapper;

    public OrderMapper(CustomerMapper customerMapper) {
        this.customerMapper = customerMapper;
    }

    @Override
    public OrderDto mapTo(Order order) {
        OrderDto orderDto = new OrderDto();

        // customer property
        orderDto.setCustomer(customerMapper.mapTo(order.getCustomer()));

        // order details
        orderDto.setDetails(new ArrayList<>());
        order.getDetails().forEach(detail -> {
            orderDto.getDetails().add(new OrderDetailDto(detail.getId(), detail.getName(), detail.getQuantity(), detail.getPrice()));
        });

        // order properties
        orderDto.setId(order.getId());
        orderDto.setPaid(order.getPaid());
        orderDto.setPurchased(order.getPurchased());

        return orderDto;
    }

    @Override
    public Order mapFrom(OrderDto dto) {
        Order entity = new Order();

        // customer
        entity.setCustomer(customerMapper.mapFrom(dto.getCustomer()));

        // order detail
        entity.setDetails(new ArrayList<>());
        dto.getDetails().forEach(detail -> {
            entity.getDetails().add(
                    createOrderDetailEntity(
                            detail.getId(),
                            detail.getName(),
                            detail.getQuantity(),
                            detail.getPrice()));
        });

        // order properties
        entity.setPaid(dto.getPaid());
        entity.setId(dto.getId());
        entity.setPurchased(dto.getPurchased());

        return entity;
    }

    private OrderDetail createOrderDetailEntity(Long id, String name, int quantity, float price) {
        OrderDetail orderDetail = new OrderDetail();
        orderDetail.setId(id);
        orderDetail.setName(name);
        orderDetail.setQuantity(quantity);
        orderDetail.setPrice(price);
        return orderDetail;
    }

}
