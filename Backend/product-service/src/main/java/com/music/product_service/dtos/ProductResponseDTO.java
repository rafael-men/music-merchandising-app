package com.music.product_service.dtos;

import com.music.product_service.models.ProductCategory;
import com.music.product_service.models.Product;

public record ProductResponseDTO(
        String id,
        String title,
        String description,
        double price,
        String imageUrl,
        ProductCategory category,
        boolean available
) {
    public static ProductResponseDTO from(Product product) {
        return new ProductResponseDTO(
                product.getId(),
                product.getTitle(),
                product.getDescription(),
                product.getPrice(),
                product.getImageUrl(),
                product.getCategory(),
                product.isAvailable()
        );
    }
}
