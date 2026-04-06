package com.music.product_service.dtos;

import com.music.product_service.models.PaymentMethod;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record OrderRequestDTO(
        @NotEmpty List<@NotNull String> productIds,
        @NotNull PaymentMethod paymentMethod
) {}
