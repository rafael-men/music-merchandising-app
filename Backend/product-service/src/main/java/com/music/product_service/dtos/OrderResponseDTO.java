package com.music.product_service.dtos;

import com.music.product_service.models.PaymentMethod;

import java.util.List;

public record OrderResponseDTO(
        String orderId,
        List<String> productIds,
        double total,
        PaymentMethod paymentMethod,
        String pixKey,
        String status
) {}
