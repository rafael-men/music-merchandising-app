package com.music.order_service.services.impl;

import com.music.order_service.dtos.OrderRequestDTO;
import com.music.order_service.dtos.OrderResponseDTO;
import com.music.order_service.exceptions.OrderNotFoundException;
import com.music.order_service.kafka.OrderCreatedEvent;
import com.music.order_service.kafka.OrderEventPublisher;
import com.music.order_service.models.Order;
import com.music.order_service.models.OrderItem;
import com.music.order_service.models.OrderStatus;
import com.music.order_service.repositories.OrderRepository;
import com.music.order_service.services.OrderService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final OrderEventPublisher eventPublisher;

    public OrderServiceImpl(OrderRepository orderRepository, OrderEventPublisher eventPublisher) {
        this.orderRepository = orderRepository;
        this.eventPublisher = eventPublisher;
    }

    @Override
    public OrderResponseDTO create(OrderRequestDTO dto) {
        List<OrderItem> items = dto.items().stream()
                .map(i -> new OrderItem(i.productId(), i.name(), i.image(), i.price(), i.quantity()))
                .toList();
        double total = items.stream().mapToDouble(i -> i.getPrice() * i.getQuantity()).sum();
        Order order = new Order(null, dto.userId(), items, total, dto.paymentMethod());
        Order saved = orderRepository.save(order);

        eventPublisher.publishOrderCreated(new OrderCreatedEvent(
                saved.getId(),
                saved.getUserId(),
                saved.getTotal(),
                saved.getPaymentMethod().name()
        ));

        return OrderResponseDTO.from(saved);
    }

    @Override
    public OrderResponseDTO findById(String id) {
        return OrderResponseDTO.from(orderRepository.findById(id)
                .orElseThrow(() -> new OrderNotFoundException(id)));
    }

    @Override
    public List<OrderResponseDTO> findByUserId(String userId) {
        return orderRepository.findByUserId(userId).stream().map(OrderResponseDTO::from).toList();
    }

    @Override
    public OrderResponseDTO updateStatus(String id, OrderStatus status) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new OrderNotFoundException(id));
        order.setStatus(status);
        return OrderResponseDTO.from(orderRepository.save(order));
    }
}
