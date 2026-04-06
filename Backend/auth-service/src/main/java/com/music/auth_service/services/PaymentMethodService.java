package com.music.auth_service.services;

import com.music.auth_service.dtos.PixKeyRequest;
import com.music.auth_service.dtos.PixKeyResponse;

import java.util.List;
import java.util.UUID;

public interface PaymentMethodService {

    PixKeyResponse addPixKey(UUID userId, PixKeyRequest request);
    List<PixKeyResponse> getPixKeys(UUID userId);
    void removePixKey(UUID pixKeyId);
}
