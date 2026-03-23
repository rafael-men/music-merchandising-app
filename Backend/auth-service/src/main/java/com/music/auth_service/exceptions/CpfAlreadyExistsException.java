package com.music.auth_service.exceptions;

public class CpfAlreadyExistsException extends RuntimeException {

    public CpfAlreadyExistsException(String cpf) {
        super("CPF already in use: " + cpf);
    }
}
