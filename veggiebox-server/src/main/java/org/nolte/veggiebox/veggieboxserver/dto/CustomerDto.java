package org.nolte.veggiebox.veggieboxserver.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerDto {

    Long id;

    String uuid;

    String firstname;

    String lastname;

    String phone;

}
