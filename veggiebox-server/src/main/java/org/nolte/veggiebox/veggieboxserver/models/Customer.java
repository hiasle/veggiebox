package org.nolte.veggiebox.veggieboxserver.models;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Customer {

    long id;
    String uuid;

    public Customer(String firstname, String lastname) {
        this.firstname = firstname;
        this.lastname = lastname;
    }

    @NotBlank
    @Size(min = 1)
    String firstname;

    @NotBlank
    @Size(min = 1)
    String lastname;

    String phone;

}
