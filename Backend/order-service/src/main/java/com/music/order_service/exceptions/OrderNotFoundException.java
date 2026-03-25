package com.music.order_service.exceptions;

public class OrderNotFoundException extends RuntimeException {
    public OrderNotFoundException(String id) {
        super("Pedido não encontrado com id: " + id);
    }
}
