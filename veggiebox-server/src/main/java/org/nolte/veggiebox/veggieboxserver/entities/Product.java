package org.nolte.veggiebox.veggieboxserver.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.nolte.veggiebox.veggieboxserver.entities.enums.Unit;

@Data
@NoArgsConstructor
@Entity
public class Product {

    public Product(String uuid, String name, Unit unit, float price) {
        this.uuid = uuid;
        this.name = name;
        this.unit = unit;
        this.price = price;
    }

    public Product(String uuid, String name, Unit unit, float price, String description) {
        this(uuid, name, unit, price);
        this.description = description;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    @NotBlank(message = "UUID muss gesetzt sein!")
    @Column(unique = true)
    String uuid;

    @NotBlank(message = "Name muss gesetzt sein!")
    String name;

    String description;

    @Enumerated(EnumType.STRING)
    Unit unit;

    float price;

}
