package com.music.auth_service.dtos;

import com.music.auth_service.models.Role;

import java.util.UUID;

public record AuthResponse(
        String token,
        UUID userId,
        String email,
        String name,
        Role role
) {}