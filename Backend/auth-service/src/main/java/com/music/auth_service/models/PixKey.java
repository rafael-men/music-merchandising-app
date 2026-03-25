package com.music.auth_service.models;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "pix_keys")
public class PixKey {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false)
    private UUID userId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PixKeyType keyType;

    @Column(nullable = false, unique = true)
    private String keyValue;

    public PixKey() {}

    public PixKey(UUID id, UUID userId, PixKeyType keyType, String keyValue) {
        this.id = id;
        this.userId = userId;
        this.keyType = keyType;
        this.keyValue = keyValue;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public UUID getUserId() { return userId; }
    public void setUserId(UUID userId) { this.userId = userId; }

    public PixKeyType getKeyType() { return keyType; }
    public void setKeyType(PixKeyType keyType) { this.keyType = keyType; }

    public String getKeyValue() { return keyValue; }
    public void setKeyValue(String keyValue) { this.keyValue = keyValue; }
}