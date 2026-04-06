package com.music.product_service.services.impl;

import com.music.product_service.dtos.ProductRequestDTO;
import com.music.product_service.dtos.ProductResponseDTO;
import com.music.product_service.exceptions.ProductNotFoundException;
import com.music.product_service.models.Product;
import com.music.product_service.models.ProductCategory;
import com.music.product_service.repositories.ProductRepository;
import com.music.product_service.services.ProductService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public ProductResponseDTO create(ProductRequestDTO dto) {
        Product product = new Product(null, dto.title(), dto.description(), dto.price(),
                dto.imageUrl(), dto.categories(), dto.maxInstallments(), dto.stockQuantity(), Boolean.TRUE.equals(dto.available()));
        return ProductResponseDTO.from(productRepository.save(product));
    }

    @Override
    public ProductResponseDTO findById(String id) {
        return ProductResponseDTO.from(productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id)));
    }

    @Override
    public List<ProductResponseDTO> findAll() {
        return productRepository.findAll().stream().map(ProductResponseDTO::from).toList();
    }

    @Override
    public List<ProductResponseDTO> findByCategory(ProductCategory category) {
        return productRepository.findByCategoriesContaining(category).stream().map(ProductResponseDTO::from).toList();
    }

    @Override
    public List<ProductResponseDTO> search(String title) {
        return productRepository.findByTitleContainingIgnoreCase(title).stream().map(ProductResponseDTO::from).toList();
    }

    @Override
    public ProductResponseDTO update(String id, ProductRequestDTO dto) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));
        product.setTitle(dto.title());
        product.setDescription(dto.description());
        product.setPrice(dto.price());
        product.setImageUrl(dto.imageUrl());
        product.setCategories(dto.categories());
        product.setMaxInstallments(dto.maxInstallments());
        product.setStockQuantity(dto.stockQuantity());
        product.setAvailable(Boolean.TRUE.equals(dto.available()));
        return ProductResponseDTO.from(productRepository.save(product));
    }

    @Override
    public void delete(String id) {
        if (!productRepository.existsById(id)) throw new ProductNotFoundException(id);
        productRepository.deleteById(id);
    }
}