package com.music.auth_service.dtos;

import com.music.auth_service.models.PixKeyType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record PixKeyRequest(
        @NotNull(message = "Tipo da chave é obrigatório")
        PixKeyType keyType,

        @NotBlank(message = "Valor da chave é obrigatório")
        String keyValue
) {}