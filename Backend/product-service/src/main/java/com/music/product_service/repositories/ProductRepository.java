package com.music.product_service.repositories;

import com.music.product_service.models.Product;
import com.music.product_service.models.ProductCategory;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends MongoRepository<Product, String> {

    List<Product> findByCategoriesContaining(ProductCategory category);
    List<Product> findByAvailableTrue();
    List<Product> findByTitleContainingIgnoreCase(String title);
}
