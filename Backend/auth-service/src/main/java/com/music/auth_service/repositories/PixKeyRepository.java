package com.music.auth_service.repositories;

import com.music.auth_service.models.PixKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PixKeyRepository extends JpaRepository<PixKey, UUID> {

    List<PixKey> findByUserId(UUID userId);

    boolean existsByKeyValue(String keyValue);
}