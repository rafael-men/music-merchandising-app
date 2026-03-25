package com.music.auth_service.dtos;

import com.music.auth_service.models.CardBrand;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record CardRequest(
        @NotBlank(message = "Nome do titular é obrigatório")
        String holderName,

        @NotBlank(message = "Últimos 4 dígitos são obrigatórios")
        @Size(min = 4, max = 4, message = "Informe apenas os últimos 4 dígitos")
        @Pattern(regexp = "\\d{4}", message = "Informe apenas números")
        String lastFourDigits,

        @NotNull(message = "Bandeira é obrigatória")
        CardBrand brand,

        @NotBlank(message = "Mês de validade é obrigatório")
        @Pattern(regexp = "^(0[1-9]|1[0-2])$", message = "Mês inválido (01-12)")
        String expiryMonth,

        @NotBlank(message = "Ano de validade é obrigatório")
        @Pattern(regexp = "^\\d{4}$", message = "Ano inválido (ex: 2027)")
        String expiryYear,

        String nickname
) {}