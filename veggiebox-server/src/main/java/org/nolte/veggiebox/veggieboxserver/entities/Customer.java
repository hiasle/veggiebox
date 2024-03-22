package org.nolte.veggiebox.veggieboxserver.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@Entity
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    @NotNull(message = "UUID muss gesetzt sein!")
    @NotBlank(message = "UUID darf nicht leer sein!")
    @Column(unique = true)
    String uuid;

    public Customer(String uuid, String firstname, String lastname) {
        this.uuid = uuid;
        this.firstname = firstname;
        this.lastname = lastname;
    }

    public Customer(String uuid, String firstname, String lastname, String phone) {
        this(uuid, firstname, lastname);
        this.phone = phone;
    }

    @NotBlank
    @Size(min = 1, message = "Vorname muss mindestens 1 Zeichen haben!")
    String firstname;

    @NotBlank
    @Size(min = 1, message = "Nachname muss mindestens 1 Zeichen haben!")
    String lastname;

    String phone;

    @OneToMany(mappedBy = "customer", fetch = FetchType.LAZY)
    List<Order> orders;

}
