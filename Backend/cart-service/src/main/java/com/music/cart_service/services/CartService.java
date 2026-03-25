package com.music.cart_service.services;

import com.music.cart_service.dtos.CartItemRequestDTO;
import com.music.cart_service.dtos.CartResponseDTO;

public interface CartService {

    CartResponseDTO getByUserId(String userId);
    CartResponseDTO addItem(String userId, CartItemRequestDTO dto);
    CartResponseDTO removeItem(String userId, String productId);
    CartResponseDTO clearCart(String userId);
}