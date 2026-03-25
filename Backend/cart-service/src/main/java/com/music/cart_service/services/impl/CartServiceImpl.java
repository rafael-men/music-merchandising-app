package com.music.cart_service.services.impl;

import com.music.cart_service.dtos.CartItemRequestDTO;
import com.music.cart_service.dtos.CartResponseDTO;
import com.music.cart_service.exceptions.CartNotFoundException;
import com.music.cart_service.models.Cart;
import com.music.cart_service.models.CartItem;
import com.music.cart_service.repositories.CartRepository;
import com.music.cart_service.services.CartService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;

    public CartServiceImpl(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    @Override
    public CartResponseDTO getByUserId(String userId) {
        return CartResponseDTO.from(cartRepository.findByUserId(userId)
                .orElseThrow(() -> new CartNotFoundException(userId)));
    }

    @Override
    public CartResponseDTO addItem(String userId, CartItemRequestDTO dto) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseGet(() -> new Cart(null, userId, new ArrayList<>()));

        cart.getItems().stream()
                .filter(i -> i.getProductId().equals(dto.productId()))
                .findFirst()
                .ifPresentOrElse(
                        existing -> existing.setQuantity(existing.getQuantity() + dto.quantity()),
                        () -> cart.getItems().add(new CartItem(dto.productId(), dto.name(), dto.image(), dto.price(), dto.quantity()))
                );

        return CartResponseDTO.from(cartRepository.save(cart));
    }

    @Override
    public CartResponseDTO removeItem(String userId, String productId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new CartNotFoundException(userId));
        cart.getItems().removeIf(i -> i.getProductId().equals(productId));
        return CartResponseDTO.from(cartRepository.save(cart));
    }

    @Override
    public CartResponseDTO clearCart(String userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new CartNotFoundException(userId));
        cart.getItems().clear();
        return CartResponseDTO.from(cartRepository.save(cart));
    }
}
