package org.nolte.veggiebox.veggieboxserver.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    // @OneToMany(mappedBy = "theOrder", cascade = CascadeType.ALL, orphanRemoval = false)
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    List<OrderDetail> details = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    Customer customer;

    LocalDateTime purchased;

    float paid;

    public void addOrderDetail(OrderDetail detail) {
        details.add(detail);
        detail.setOrder(this);
    }

    public void removeOrderDetail(OrderDetail detail) {
        details.remove(detail);
        detail.setOrder(null);
    }

}
