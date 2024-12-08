package org.nolte.veggiebox.veggieboxserver;

import org.modelmapper.ModelMapper;
import org.nolte.veggiebox.veggieboxserver.customer.CustomerService;
import org.nolte.veggiebox.veggieboxserver.entities.Customer;
import org.nolte.veggiebox.veggieboxserver.entities.Order;
import org.nolte.veggiebox.veggieboxserver.entities.OrderDetail;
import org.nolte.veggiebox.veggieboxserver.entities.Product;
import org.nolte.veggiebox.veggieboxserver.entities.enums.Unit;
import org.nolte.veggiebox.veggieboxserver.order.OrderService;
import org.nolte.veggiebox.veggieboxserver.product.ProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class AppRunner implements CommandLineRunner {

    private final static Logger LOG = LoggerFactory.getLogger(AppRunner.class);

    private final CustomerService customerService;
    private final ProductService productService;

    private final OrderService orderService;

    public AppRunner(CustomerService customerService, ProductService productService, OrderService orderService, ModelMapper modelMapper) {
        this.customerService = customerService;
        this.productService = productService;
        this.orderService = orderService;
    }

    @Override
    public void run(String... args) throws Exception {
        Customer customer = customerService.createOrSaveCustomer(new Customer(UUID.randomUUID().toString(), "Max", "Mustermann"));
        productService.createOrSaveProduct(new Product(UUID.randomUUID().toString(), "Apfel", Unit.kiste, 5.0f));
        productService.createOrSaveProduct(new Product(UUID.randomUUID().toString(), "Kartoffel", Unit.kilogramm, 5.0f));
        productService.createOrSaveProduct(new Product(UUID.randomUUID().toString(), "Saft", Unit.flasche, 1f, "Apfelsaft"));

        OrderDetail appleOrder = new OrderDetail();
        appleOrder.setName("Äpfel");
        appleOrder.setPrice(25f);
        appleOrder.setQuantity(5);

        OrderDetail potatoesOrder = new OrderDetail();
        potatoesOrder.setName("Kartoffel");
        potatoesOrder.setPrice(5f);
        potatoesOrder.setQuantity(5);

        Order order = new Order();
        order.setCustomer(customer);
        order.addOrderDetail(appleOrder);
        order.addOrderDetail(potatoesOrder);
        order.setPurchased(LocalDateTime.now());
        order.setPaid(24f);

        OrderDetail potatoesOrder2 = new OrderDetail();
        potatoesOrder2.setName("Kartoffel");
        potatoesOrder2.setPrice(14f);
        potatoesOrder2.setQuantity(6);

        Order order2 = new Order();
        order2.setCustomer(customer);
        order2.addOrderDetail(potatoesOrder2);
        order2.setPurchased(LocalDateTime.now());
        order2.setPaid(14f);

//        orderDetail.setOrder(order);

        this.orderService.createOrSave(order);
        this.orderService.createOrSave(order2);


        List<Customer> customers = customerService.getCustomers();
        Assert.isTrue(customers.size() == 1, "should be true");

        LOG.info("Customers size: {}", customers.size());
        LOG.info("Customers: {}", customers.stream().map(Customer::getFirstname).collect(Collectors.joining(",")));
    }

}
