package com.music.product_service.dtos;

import com.music.product_service.models.ProductCategory;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.util.List;

public record ProductRequestDTO(
        @NotBlank String title,
        @NotBlank String description,
        @NotNull @Positive Double price,
        @NotBlank String imageUrl,
        @NotEmpty List<@NotNull ProductCategory> categories,
        @NotNull @Min(1) @Max(24) Integer maxInstallments,
        @NotNull @Min(0) Integer stockQuantity,
        Boolean available
) {}
