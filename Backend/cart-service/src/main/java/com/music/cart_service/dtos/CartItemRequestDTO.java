package com.music.cart_service.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record CartItemRequestDTO(

        @NotBlank String productId,
        @NotBlank String name,
        @NotBlank String image,
        @Positive double price,
        @NotNull @Positive int quantity
) {}
