package org.nolte.veggiebox.veggieboxserver.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
    private Order order;

    String name;

    int quantity;

    float price;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof OrderDetail )) return false;
        return id != null && id.equals(((OrderDetail) o).getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

}
