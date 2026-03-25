package com.music.auth_service.dtos;

import com.music.auth_service.models.Card;
import com.music.auth_service.models.CardBrand;

import java.util.UUID;

public record CardResponse(
        UUID id,
        String holderName,
        String lastFourDigits,
        CardBrand brand,
        String expiryMonth,
        String expiryYear,
        String nickname
) {
    public static CardResponse from(Card card) {
        return new CardResponse(
                card.getId(),
                card.getHolderName(),
                card.getLastFourDigits(),
                card.getBrand(),
                card.getExpiryMonth(),
                card.getExpiryYear(),
                card.getNickname()
        );
    }
}