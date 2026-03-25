package com.music.order_service.services;

import com.music.order_service.dtos.OrderRequestDTO;
import com.music.order_service.dtos.OrderResponseDTO;
import com.music.order_service.models.OrderStatus;

import java.util.List;

public interface OrderService {
    OrderResponseDTO create(OrderRequestDTO dto);
    OrderResponseDTO findById(String id);
    List<OrderResponseDTO> findByUserId(String userId);
    OrderResponseDTO updateStatus(String id, OrderStatus status);
}