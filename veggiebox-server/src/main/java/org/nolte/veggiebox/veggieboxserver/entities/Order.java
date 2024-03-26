package org.nolte.veggiebox.veggieboxserver.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
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
    @OneToMany(mappedBy = "theOrder")
    List<OrderDetail> details;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    Customer customer;

    LocalDateTime purchased;

    float paid;

}
