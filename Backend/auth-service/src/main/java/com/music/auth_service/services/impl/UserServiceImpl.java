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
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new EmailAlreadyExistsException(request.email());
        }
        if (request.cpf() != null && userRepository.existsByCpf(request.cpf())) {
            throw new CpfAlreadyExistsException(request.cpf());
        }

        Address address = null;
        if (request.address() != null) {
            address = new Address(
                    request.address().street(),
                    request.address().number(),
                    request.address().complement(),
                    request.address().neighborhood(),
                    request.address().city(),
                    request.address().state(),
                    request.address().zipCode()
            );
        }

        User user = new User(
                null,
                request.name(),
                request.email(),
                request.password(),
                request.cpf(),
                request.profilePhotoUrl(),
                Role.USER,
                address
        );

        return UserResponse.from(userRepository.save(user));
    }

    @Override
    public UserResponse findById(UUID id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
        return UserResponse.from(user);
    }

    @Override
    public UserResponse findByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));
        return UserResponse.from(user);
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

        if (request.email() != null && !request.email().equals(user.getEmail())) {
            if (userRepository.existsByEmail(request.email())) {
                throw new EmailAlreadyExistsException(request.email());
            }
            user.setEmail(request.email());
        }

        if (request.cpf() != null && !request.cpf().equals(user.getCpf())) {
            if (userRepository.existsByCpf(request.cpf())) {
                throw new CpfAlreadyExistsException(request.cpf());
            }
            user.setCpf(request.cpf());
        }

        if (request.name() != null) user.setName(request.name());
        if (request.password() != null) user.setPassword(request.password());
        if (request.profilePhotoUrl() != null) user.setProfilePhotoUrl(request.profilePhotoUrl());

        if (request.address() != null) {
            user.setAddress(new Address(
                    request.address().street(),
                    request.address().number(),
                    request.address().complement(),
                    request.address().neighborhood(),
                    request.address().city(),
                    request.address().state(),
                    request.address().zipCode()
            ));
        }

        return UserResponse.from(userRepository.save(user));
    }

    @Override
    public void delete(UUID id) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException(id);
        }
        userRepository.deleteById(id);
    }
}
