package com.music.order_service.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

public record OrderItemDTO(

        @NotBlank String productId,
        @NotBlank String name,
        @NotBlank String image,
        @Positive double price,
        @Positive int quantity
) {}
