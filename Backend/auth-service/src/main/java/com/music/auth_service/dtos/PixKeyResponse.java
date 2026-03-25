package com.music.auth_service.dtos;

import com.music.auth_service.models.PixKey;
import com.music.auth_service.models.PixKeyType;

import java.util.UUID;

public record PixKeyResponse(
        UUID id,
        PixKeyType keyType,
        String keyValue
) {
    public static PixKeyResponse from(PixKey pixKey) {
        return new PixKeyResponse(pixKey.getId(), pixKey.getKeyType(), pixKey.getKeyValue());
    }
}