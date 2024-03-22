package org.nolte.veggiebox.veggieboxserver.dto;

import lombok.Data;
import org.nolte.veggiebox.veggieboxserver.entities.enums.Unit;

@Data
public class ProductDto {

    Long id;

    String uuid;

    String name;

    String description;

    Unit unit;

    float price;

}
