package com.music.auth_service.services;

import com.music.auth_service.dtos.CardRequest;
import com.music.auth_service.dtos.CardResponse;
import com.music.auth_service.dtos.PixKeyRequest;
import com.music.auth_service.dtos.PixKeyResponse;

import java.util.List;
import java.util.UUID;

public interface PaymentMethodService {

    CardResponse addCard(UUID userId, CardRequest request);
    List<CardResponse> getCards(UUID userId);
    CardResponse updateCard(UUID cardId, CardRequest request);
    void removeCard(UUID cardId);
    PixKeyResponse addPixKey(UUID userId, PixKeyRequest request);
    List<PixKeyResponse> getPixKeys(UUID userId);
    void removePixKey(UUID pixKeyId);
}
