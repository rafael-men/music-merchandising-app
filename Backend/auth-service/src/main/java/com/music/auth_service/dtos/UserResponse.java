package com.music.auth_service.dtos;

import com.music.auth_service.models.Role;
import com.music.auth_service.models.User;

import java.util.UUID;

public record UserResponse(
        UUID id,
        String name,
        String email,
        String cpf,
        String profilePhotoUrl,
        Role role,
        AddressDTO address
) {
    public static UserResponse from(User user) {
        AddressDTO addressDTO = null;
        if (user.getAddress() != null) {
            addressDTO = new AddressDTO(
                    user.getAddress().getStreet(),
                    user.getAddress().getNumber(),
                    user.getAddress().getComplement(),
                    user.getAddress().getNeighborhood(),
                    user.getAddress().getCity(),
                    user.getAddress().getState(),
                    user.getAddress().getZipCode()
            );
        }
        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getCpf(),
                user.getProfilePhotoUrl(),
                user.getRole(),
                addressDTO
        );
    }
}
