package com.music.auth_service.controllers;

import com.music.auth_service.dtos.CardRequest;
import com.music.auth_service.dtos.CardResponse;
import com.music.auth_service.dtos.PixKeyRequest;
import com.music.auth_service.dtos.PixKeyResponse;
import com.music.auth_service.services.PaymentMethodService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/users/{userId}/payment-methods")
public class PaymentMethodController {

    private final PaymentMethodService paymentMethodService;

    public PaymentMethodController(PaymentMethodService paymentMethodService) {
        this.paymentMethodService = paymentMethodService;
    }

    @PostMapping("/cards")
    public ResponseEntity<CardResponse> addCard(@PathVariable UUID userId, @Valid @RequestBody CardRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(paymentMethodService.addCard(userId, request));
    }
    @GetMapping("/cards")
    public ResponseEntity<List<CardResponse>> getCards(@PathVariable UUID userId) {
        return ResponseEntity.ok(paymentMethodService.getCards(userId));
    }
    @PutMapping("/cards/{cardId}")
    public ResponseEntity<CardResponse> updateCard(@PathVariable UUID userId, @PathVariable UUID cardId, @Valid @RequestBody CardRequest request) {
        return ResponseEntity.ok(paymentMethodService.updateCard(cardId, request));
    }
    @DeleteMapping("/cards/{cardId}")
    public ResponseEntity<Void> removeCard(@PathVariable UUID userId, @PathVariable UUID cardId) {
        paymentMethodService.removeCard(cardId);
        return ResponseEntity.noContent().build();
    }
    @PostMapping("/pix")
    public ResponseEntity<PixKeyResponse> addPixKey(@PathVariable UUID userId, @Valid @RequestBody PixKeyRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(paymentMethodService.addPixKey(userId, request));
    }
    @GetMapping("/pix")
    public ResponseEntity<List<PixKeyResponse>> getPixKeys(@PathVariable UUID userId) {
        return ResponseEntity.ok(paymentMethodService.getPixKeys(userId));
    }
    @DeleteMapping("/pix/{pixKeyId}")
    public ResponseEntity<Void> removePixKey(@PathVariable UUID userId, @PathVariable UUID pixKeyId) {
        paymentMethodService.removePixKey(pixKeyId);
        return ResponseEntity.noContent().build();
    }
}
