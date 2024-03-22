package org.nolte.veggiebox.veggieboxserver.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDetailDto {

    Long id;

    String name;

    int quantity;

    float price;

}
