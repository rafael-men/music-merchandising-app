package com.music.product_service.dtos;

import com.music.product_service.models.ProductCategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record ProductRequestDTO(
        @NotBlank String title,
        @NotBlank String description,
        @NotNull @Positive Double price,
        @NotBlank String imageUrl,
        @NotNull ProductCategory category,
        Boolean available
) {}
