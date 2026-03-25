package com.music.cart_service.controllers;

import com.music.cart_service.dtos.CartItemRequestDTO;
import com.music.cart_service.dtos.CartResponseDTO;
import com.music.cart_service.services.CartService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<CartResponseDTO> getCart(@PathVariable String userId) {
        return ResponseEntity.ok(cartService.getByUserId(userId));
    }
    @PostMapping("/{userId}/items")
    public ResponseEntity<CartResponseDTO> addItem(@PathVariable String userId,
                                                   @RequestBody @Valid CartItemRequestDTO dto) {
        return ResponseEntity.ok(cartService.addItem(userId, dto));
    }
    @DeleteMapping("/{userId}/items/{productId}")
    public ResponseEntity<CartResponseDTO> removeItem(@PathVariable String userId,
                                                      @PathVariable String productId) {
        return ResponseEntity.ok(cartService.removeItem(userId, productId));
    }
    @DeleteMapping("/{userId}")
    public ResponseEntity<CartResponseDTO> clearCart(@PathVariable String userId) {
        return ResponseEntity.ok(cartService.clearCart(userId));
    }
}