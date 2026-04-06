package com.music.product_service.dtos;

import com.music.product_service.models.ProductCategory;
import com.music.product_service.models.Product;

import java.util.List;

public record ProductResponseDTO(
        String id,
        String title,
        String description,
        double price,
        String imageUrl,
        List<ProductCategory> categories,
        int maxInstallments,
        int stockQuantity,
        boolean available
) {
    public static ProductResponseDTO from(Product product) {
        return new ProductResponseDTO(
                product.getId(),
                product.getTitle(),
                product.getDescription(),
                product.getPrice(),
                product.getImageUrl(),
                product.getCategories(),
                product.getMaxInstallments(),
                product.getStockQuantity(),
                product.isAvailable()
        );
    }
}
