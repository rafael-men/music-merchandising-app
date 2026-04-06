package com.music.auth_service.services.impl;

import com.music.auth_service.dtos.PixKeyRequest;
import com.music.auth_service.dtos.PixKeyResponse;
import com.music.auth_service.exceptions.PaymentMethodNotFoundException;
import com.music.auth_service.exceptions.PixKeyAlreadyExistsException;
import com.music.auth_service.models.PixKey;
import com.music.auth_service.repositories.PixKeyRepository;
import com.music.auth_service.services.PaymentMethodService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class PaymentMethodServiceImpl implements PaymentMethodService {

    private final PixKeyRepository pixKeyRepository;

    public PaymentMethodServiceImpl(PixKeyRepository pixKeyRepository) {
        this.pixKeyRepository = pixKeyRepository;
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
        pixKeyRepository.findById(pixKeyId)
                .orElseThrow(() -> new PaymentMethodNotFoundException(pixKeyId));
        pixKeyRepository.deleteById(pixKeyId);
    }
}
