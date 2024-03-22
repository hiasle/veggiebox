package org.nolte.veggiebox.veggieboxserver.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
public class OrderDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    String name;

    int quantity;

    float price;

}
