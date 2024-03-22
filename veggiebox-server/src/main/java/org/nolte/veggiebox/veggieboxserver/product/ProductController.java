package org.nolte.veggiebox.veggieboxserver.product;

import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.nolte.veggiebox.veggieboxserver.dto.ProductDto;
import org.nolte.veggiebox.veggieboxserver.entities.Product;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {

    private final ProductService productService;

    private final ModelMapper mapper;

    public ProductController(ProductService productService, ModelMapper modelMapper) {
        this.productService = productService;
        this.mapper = modelMapper;
    }

    @GetMapping
    public ResponseEntity<List<ProductDto>> getProducts() {
        List<Product> products = productService.getProducts();
        return ResponseEntity.ok(products.stream().map(product -> mapper.map(product, ProductDto.class)).toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getProduct(@PathVariable Long id) {
        return productService.getProduct(id)
                .map((product -> ResponseEntity.ok(mapper.map(product, ProductDto.class))))
                .orElse(ResponseEntity.notFound().build());
    }
}
