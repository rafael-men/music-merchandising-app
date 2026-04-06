package com.music.auth_service.services;

import com.music.auth_service.dtos.RegisterRequest;
import com.music.auth_service.dtos.UpdateUserRequest;
import com.music.auth_service.dtos.UserResponse;

import java.util.List;
import java.util.Set;
import java.util.UUID;

public interface UserService {
    UserResponse register(RegisterRequest request);
    UserResponse findById(UUID id);
    UserResponse findByEmail(String email);
    List<UserResponse> findAll();
    UserResponse update(UUID id, UpdateUserRequest request);
    void delete(UUID id);
    UserResponse addFavorite(UUID userId, String productId);
    UserResponse removeFavorite(UUID userId, String productId);
    Set<String> getFavorites(UUID userId);
}
