package com.music.order_service.kafka;

public record OrderCreatedEvent(
        String orderId,
        String userId,
        double total,
        String paymentMethod
) {}
