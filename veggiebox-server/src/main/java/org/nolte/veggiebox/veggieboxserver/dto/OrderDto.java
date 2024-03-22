package org.nolte.veggiebox.veggieboxserver.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Slf4j
public class OrderDto {

    Long id;

    List<OrderDetailDto> details;

    CustomerDto customer;

    LocalDateTime purchased;

    float paid;

    public float sumPriceOrder() {
        return this.details.stream().map(detail -> detail.getPrice()).reduce(0f, Float::sum);
    }

    public float getDifference() {
        log.info("Get difference called");
        return this.sumPriceOrder() - this.paid;
    }

}