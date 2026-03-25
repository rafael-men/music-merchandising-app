package com.music.auth_service.services.impl;

import com.music.auth_service.dtos.CardRequest;
import com.music.auth_service.dtos.CardResponse;
import com.music.auth_service.dtos.PixKeyRequest;
import com.music.auth_service.dtos.PixKeyResponse;
import com.music.auth_service.exceptions.PaymentMethodNotFoundException;
import com.music.auth_service.exceptions.PixKeyAlreadyExistsException;
import com.music.auth_service.models.Card;
import com.music.auth_service.models.PixKey;
import com.music.auth_service.repositories.CardRepository;
import com.music.auth_service.repositories.PixKeyRepository;
import com.music.auth_service.services.PaymentMethodService;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public class PaymentMethodServiceImpl implements PaymentMethodService {

    private final CardRepository cardRepository;
    private final PixKeyRepository pixKeyRepository;

    public PaymentMethodServiceImpl(CardRepository cardRepository, PixKeyRepository pixKeyRepository) {
        this.cardRepository = cardRepository;
        this.pixKeyRepository = pixKeyRepository;
    }

    @Override
    public CardResponse addCard(UUID userId, CardRequest request) {
        Card card = new Card(null, userId, request.holderName(), request.lastFourDigits(),
                request.brand(), request.expiryMonth(), request.expiryYear(), request.nickname());
        return CardResponse.from(cardRepository.save(card));
    }

    @Override
    public List<CardResponse> getCards(UUID userId) {
        return cardRepository.findByUserId(userId).stream()
                .map(CardResponse::from)
                .toList();
    }

    @Override
    public CardResponse updateCard(UUID cardId, CardRequest request) {
        Card card = cardRepository.findById(cardId)
                .orElseThrow(() -> new PaymentMethodNotFoundException(cardId));
        card.setHolderName(request.holderName());
        card.setLastFourDigits(request.lastFourDigits());
        card.setBrand(request.brand());
        card.setExpiryMonth(request.expiryMonth());
        card.setExpiryYear(request.expiryYear());
        card.setNickname(request.nickname());
        return CardResponse.from(cardRepository.save(card));
    }

    @Override
    public void removeCard(UUID cardId) {
        cardRepository.findById(cardId).orElseThrow(() -> new PaymentMethodNotFoundException(cardId));
        cardRepository.deleteById(cardId);
    }

    @Override
    public PixKeyResponse addPixKey(UUID userId, PixKeyRequest request) {
        if (pixKeyRepository.existsByKeyValue(request.keyValue())) {
            throw new PixKeyAlreadyExistsException(request.keyValue());
        }
        PixKey pixKey = new PixKey(null, userId, request.keyType(), request.keyValue());
        return PixKeyResponse.from(pixKeyRepository.save(pixKey));
    }

    @Override
    public List<PixKeyResponse> getPixKeys(UUID userId) {
        return pixKeyRepository.findByUserId(userId).stream()
                .map(PixKeyResponse::from)
                .toList();
    }

    @Override
    public void removePixKey(UUID pixKeyId) {
        pixKeyRepository.findById(pixKeyId).orElseThrow(() -> new PaymentMethodNotFoundException(pixKeyId));
        pixKeyRepository.deleteById(pixKeyId);
    }
}
