package com.music.auth_service.exceptions;

public class PixKeyAlreadyExistsException extends RuntimeException {
    public PixKeyAlreadyExistsException(String keyValue) {
        super("Chave Pix já cadastrada: " + keyValue);
    }
}
