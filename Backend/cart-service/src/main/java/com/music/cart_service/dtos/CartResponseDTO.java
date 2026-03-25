package com.music.cart_service.dtos;

import com.music.cart_service.models.Cart;
import com.music.cart_service.models.CartItem;

import java.util.List;

public record CartResponseDTO(
        String id,
        String userId,
        List<CartItem> items,
        double total
) {
    public static CartResponseDTO from(Cart cart) {
        return new CartResponseDTO(
                cart.getId(),
                cart.getUserId(),
                cart.getItems(),
                cart.getTotal()
        );
    }
}
