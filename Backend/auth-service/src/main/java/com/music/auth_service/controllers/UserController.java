package com.music.auth_service.controllers;

import com.music.auth_service.dtos.UpdateUserRequest;
import com.music.auth_service.dtos.UserResponse;
import com.music.auth_service.services.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    @PreAuthorize("#id.toString() == authentication.principal.id.toString()")
    public ResponseEntity<UserResponse> findById(@PathVariable UUID id) {
        return ResponseEntity.ok(userService.findById(id));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserResponse>> findAll() {
        return ResponseEntity.ok(userService.findAll());
    }

    @PutMapping("/{id}")
    @PreAuthorize("#id.toString() == authentication.principal.id.toString()")
    public ResponseEntity<UserResponse> update(@PathVariable UUID id,
                                               @Valid @RequestBody UpdateUserRequest request) {
        return ResponseEntity.ok(userService.update(id, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/favorites/{productId}")
    @PreAuthorize("#id.toString() == authentication.principal.id.toString()")
    public ResponseEntity<UserResponse> addFavorite(@PathVariable UUID id,
                                                    @PathVariable String productId) {
        return ResponseEntity.ok(userService.addFavorite(id, productId));
    }

    @DeleteMapping("/{id}/favorites/{productId}")
    @PreAuthorize("#id.toString() == authentication.principal.id.toString()")
    public ResponseEntity<UserResponse> removeFavorite(@PathVariable UUID id,
                                                       @PathVariable String productId) {
        return ResponseEntity.ok(userService.removeFavorite(id, productId));
    }

    @GetMapping("/{id}/favorites")
    @PreAuthorize("#id.toString() == authentication.principal.id.toString()")
    public ResponseEntity<Set<String>> getFavorites(@PathVariable UUID id) {
        return ResponseEntity.ok(userService.getFavorites(id));
    }
}
