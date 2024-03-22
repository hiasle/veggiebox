package org.nolte.veggiebox.veggieboxserver.order;

import lombok.extern.slf4j.Slf4j;
import org.nolte.veggiebox.veggieboxserver.dto.OrderDto;
import org.nolte.veggiebox.veggieboxserver.entities.Order;
import org.nolte.veggiebox.veggieboxserver.mapper.OrderMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:4200")
public class OrderController {

    private final OrderService orderService;

    private final OrderMapper orderMapper;

    public OrderController(OrderService orderService, OrderMapper orderMapper) {
        this.orderService = orderService;
        this.orderMapper = orderMapper;
    }

    @GetMapping
    public ResponseEntity<List<OrderDto>> getOrders(@RequestParam Optional<Long> customerId) {
        List<Order> result = customerId.map(orderService::getCustomerOrders).orElseGet(orderService::getOrders);
        return ResponseEntity.ok(result.stream().map(orderMapper::mapTo).collect(Collectors.toList()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDto> getOrder(@PathVariable Long id) {
        return ResponseEntity.ok(orderMapper.mapTo(this.orderService.getOrder(id)));
    }

    @PostMapping
    public ResponseEntity<OrderDto> addOrder(@RequestBody Order order) {
        return ResponseEntity.ok(orderMapper.mapTo(this.orderService.createOrSave(order)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrderDto> editOrder(@PathVariable Long id, @RequestBody Order entity) {
        return ResponseEntity.ok(orderMapper.mapTo(orderService.update(id, entity)));
    }


}