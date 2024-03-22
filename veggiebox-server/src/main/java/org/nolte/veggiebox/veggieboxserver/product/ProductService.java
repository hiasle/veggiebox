package org.nolte.veggiebox.veggieboxserver.product;

import org.nolte.veggiebox.veggieboxserver.entities.Product;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(final ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Transactional
    public Product createOrSaveProduct(Product product) {
        return this.productRepository.save(product);
    }

    @Transactional
    public Product updateProduct(Long id, Product product) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("ProductEntity with id [" + id + "] not found!");
        }
        product.setId(id);
        return createOrSaveProduct(product);
    }

    @Transactional
    public void deleteProduct(Long id) {
        Optional<Product> product = this.productRepository.findById(id);
        if (product.isPresent()) {
            this.productRepository.deleteById(id);
        }
    }

    public Optional<Product> findProductById(Long id) {
        return this.productRepository.findById(id);
    }

    public List<Product> getProducts() {
        return this.productRepository.findAll().stream()
                .sorted(Comparator.comparing(Product::getName))
                .collect(Collectors.toList());
    }

}
