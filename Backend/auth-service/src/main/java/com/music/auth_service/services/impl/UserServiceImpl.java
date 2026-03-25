package com.music.auth_service.services.impl;

import com.music.auth_service.dtos.RegisterRequest;
import com.music.auth_service.dtos.UpdateUserRequest;
import com.music.auth_service.dtos.UserResponse;
import com.music.auth_service.exceptions.CpfAlreadyExistsException;
import com.music.auth_service.exceptions.EmailAlreadyExistsException;
import com.music.auth_service.exceptions.UserNotFoundException;
import com.music.auth_service.models.Address;
import com.music.auth_service.models.Role;
import com.music.auth_service.models.User;
import com.music.auth_service.repositories.UserRepository;
import com.music.auth_service.services.UserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserResponse register(RegisterRequest request) {
        validateEmailAvailable(request.email());
        Optional.ofNullable(request.cpf()).ifPresent(this::validateCpfAvailable);

        User user = new User(
                null,
                request.name(),
                request.email(),
                request.password(),
                request.cpf(),
                request.profilePhotoUrl(),
                Role.USER,
                buildAddress(request.address())
        );

        return UserResponse.from(userRepository.save(user));
    }

    @Override
    public UserResponse findById(UUID id) {
        return userRepository.findById(id)
                .map(UserResponse::from)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    @Override
    public UserResponse findByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(UserResponse::from)
                .orElseThrow(() -> new UserNotFoundException("Usuário não encontrado com email: " + email));
    }

    @Override
    public List<UserResponse> findAll() {
        return userRepository.findAll().stream()
                .map(UserResponse::from)
                .toList();
    }

    @Override
    public UserResponse update(UUID id, UpdateUserRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));

        applyEmailUpdate(request, user);
        applyCpfUpdate(request, user);

        Optional.ofNullable(request.name()).ifPresent(user::setName);
        Optional.ofNullable(request.password()).ifPresent(user::setPassword);
        Optional.ofNullable(request.profilePhotoUrl()).ifPresent(user::setProfilePhotoUrl);
        Optional.ofNullable(request.address()).map(this::buildAddress).ifPresent(user::setAddress);

        return UserResponse.from(userRepository.save(user));
    }

    @Override
    public void delete(UUID id) {
        userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
        userRepository.deleteById(id);
    }

    private void validateEmailAvailable(String email) {
        if (userRepository.existsByEmail(email)) throw new EmailAlreadyExistsException(email);
    }

    private void validateCpfAvailable(String cpf) {
        if (userRepository.existsByCpf(cpf)) throw new CpfAlreadyExistsException(cpf);
    }

    private void applyEmailUpdate(UpdateUserRequest request, User user) {
        Optional.ofNullable(request.email())
                .filter(e -> !e.equals(user.getEmail()))
                .ifPresent(e -> {
                    validateEmailAvailable(e);
                    user.setEmail(e);
                });
    }

    private void applyCpfUpdate(UpdateUserRequest request, User user) {
        Optional.ofNullable(request.cpf())
                .filter(c -> !c.equals(user.getCpf()))
                .ifPresent(c -> {
                    validateCpfAvailable(c);
                    user.setCpf(c);
                });
    }

    private Address buildAddress(com.music.auth_service.dtos.AddressDTO dto) {
        if (dto == null) return null;
        return new Address(dto.street(), dto.number(), dto.complement(),
                dto.neighborhood(), dto.city(), dto.state(), dto.zipCode());
    }
}
