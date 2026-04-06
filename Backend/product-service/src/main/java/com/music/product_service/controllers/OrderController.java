package com.music.product_service.controllers;

import com.music.product_service.dtos.OrderRequestDTO;
import com.music.product_service.dtos.OrderResponseDTO;
import com.music.product_service.models.PaymentMethod;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private static final String PIX_KEY = "pagamentos@musicstore.com.br";

    @PostMapping
    public ResponseEntity<OrderResponseDTO> createOrder(@Valid @RequestBody OrderRequestDTO dto) {
        if (dto.paymentMethod() != PaymentMethod.PIX) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).build();
        }

        OrderResponseDTO response = new OrderResponseDTO(
                UUID.randomUUID().toString(),
                dto.productIds(),
                0.0,
                PaymentMethod.PIX,
                PIX_KEY,
                "AGUARDANDO_PAGAMENTO"
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
