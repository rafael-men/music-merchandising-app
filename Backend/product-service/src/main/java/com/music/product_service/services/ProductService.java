package com.music.product_service.services;

import com.music.product_service.dtos.ProductRequestDTO;
import com.music.product_service.dtos.ProductResponseDTO;
import com.music.product_service.models.ProductCategory;

import java.util.List;

public interface ProductService {

    ProductResponseDTO create(ProductRequestDTO dto);
    ProductResponseDTO findById(String id);
    List<ProductResponseDTO> findAll();
    List<ProductResponseDTO> findByCategory(ProductCategory category);
    List<ProductResponseDTO> search(String title);
    ProductResponseDTO update(String id, ProductRequestDTO dto);
    void delete(String id);
}
