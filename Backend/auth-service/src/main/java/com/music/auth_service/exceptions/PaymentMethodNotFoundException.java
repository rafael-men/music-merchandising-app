package com.music.auth_service.exceptions;

import java.util.UUID;

public class PaymentMethodNotFoundException extends RuntimeException {
    public PaymentMethodNotFoundException(UUID id) {
        super("Forma de pagamento não encontrada com id: " + id);
    }
}
