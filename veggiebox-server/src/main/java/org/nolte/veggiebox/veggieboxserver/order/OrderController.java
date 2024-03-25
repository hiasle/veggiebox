package org.nolte.veggiebox.veggieboxserver.order;

import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.nolte.veggiebox.veggieboxserver.dto.OrderDto;
import org.nolte.veggiebox.veggieboxserver.entities.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:4200")
public class OrderController {

    private final OrderService orderService;

    private final ModelMapper mapper;

    public OrderController(OrderService orderService, ModelMapper modelMapper) {
        this.orderService = orderService;
        this.mapper = modelMapper;
    }

    @GetMapping
    public ResponseEntity<List<OrderDto>> getOrders(@RequestParam Optional<Long> customerId) {
        List<Order> entities = customerId.map(orderService::getCustomerOrders).orElseGet(orderService::getOrders);
        return ResponseEntity.ok(entities.stream().map(entity -> mapper.map(entity, OrderDto.class)).toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDto> getOrder(@PathVariable Long id) {
        return ResponseEntity.ok(mapper.map(this.orderService.getOrder(id), OrderDto.class));
    }

    @PostMapping
    public ResponseEntity<OrderDto> addOrder(@RequestBody OrderDto dto) {
        Order entity = mapper.map(dto, Order.class);
        OrderDto result = mapper.map(this.orderService.createOrSave(entity), OrderDto.class);
        return ResponseEntity.ok(result);
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrderDto> editOrder(@PathVariable Long id, @RequestBody OrderDto dto) {
        Order entity = mapper.map(dto, Order.class);
        return ResponseEntity.ok(mapper.map(orderService.update(id, entity), OrderDto.class));
    }


}