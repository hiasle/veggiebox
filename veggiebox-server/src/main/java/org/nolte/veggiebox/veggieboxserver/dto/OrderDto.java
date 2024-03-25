package org.nolte.veggiebox.veggieboxserver.dto;

import lombok.*;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Slf4j
public class OrderDto {

    Long id;

    List<OrderDetailDto> details;

    CustomerDto customer;

    LocalDateTime purchased;

    float paid;

    public float getSum() {
        return this.details.stream().map(OrderDetailDto::getPrice).reduce(0f, Float::sum);
    }

    public float getDifference() {
        log.info("Get difference called");
        return this.getSum() - this.paid;
    }

}
