package com.music.order_service.dtos;

import com.music.order_service.models.Order;
import com.music.order_service.models.OrderItem;
import com.music.order_service.models.OrderStatus;
import com.music.order_service.models.PaymentMethod;

import java.time.LocalDateTime;
import java.util.List;

public record OrderResponseDTO(
        String id,
        String userId,
        List<OrderItem> items,
        double total,
        PaymentMethod paymentMethod,
        OrderStatus status,
        LocalDateTime createdAt
) {
    public static OrderResponseDTO from(Order order) {
        return new OrderResponseDTO(
                order.getId(),
                order.getUserId(),
                order.getItems(),
                order.getTotal(),
                order.getPaymentMethod(),
                order.getStatus(),
                order.getCreatedAt()
        );
    }
}
