package com.music.auth_service.controllers;

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

    @PostMapping("/pix")
    public ResponseEntity<PixKeyResponse> addPixKey(
            @PathVariable UUID userId,
            @Valid @RequestBody PixKeyRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(paymentMethodService.addPixKey(userId, request));
    }

    @GetMapping("/pix")
    public ResponseEntity<List<PixKeyResponse>> getPixKeys(@PathVariable UUID userId) {
        return ResponseEntity.ok(paymentMethodService.getPixKeys(userId));
    }

    @DeleteMapping("/pix/{pixKeyId}")
    public ResponseEntity<Void> removePixKey(
            @PathVariable UUID userId,
            @PathVariable UUID pixKeyId) {
        paymentMethodService.removePixKey(pixKeyId);
        return ResponseEntity.noContent().build();
    }
}
