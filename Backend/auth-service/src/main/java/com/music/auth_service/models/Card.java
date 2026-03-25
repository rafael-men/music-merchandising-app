package com.music.auth_service.models;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "cards")
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    @Column(nullable = false)
    private UUID userId;
    @Column(nullable = false)
    private String holderName;
    @Column(nullable = false, length = 4)
    private String lastFourDigits;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CardBrand brand;
    @Column(nullable = false, length = 2)
    private String expiryMonth;
    @Column(nullable = false, length = 4)
    private String expiryYear;

    private String nickname;

    public Card() {}

    public Card(UUID id, UUID userId, String holderName, String lastFourDigits, CardBrand brand, String expiryMonth, String expiryYear, String nickname) {
        this.id = id;
        this.userId = userId;
        this.holderName = holderName;
        this.lastFourDigits = lastFourDigits;
        this.brand = brand;
        this.expiryMonth = expiryMonth;
        this.expiryYear = expiryYear;
        this.nickname = nickname;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public UUID getUserId() { return userId; }
    public void setUserId(UUID userId) { this.userId = userId; }

    public String getHolderName() { return holderName; }
    public void setHolderName(String holderName) { this.holderName = holderName; }

    public String getLastFourDigits() { return lastFourDigits; }
    public void setLastFourDigits(String lastFourDigits) { this.lastFourDigits = lastFourDigits; }

    public CardBrand getBrand() { return brand; }
    public void setBrand(CardBrand brand) { this.brand = brand; }

    public String getExpiryMonth() { return expiryMonth; }
    public void setExpiryMonth(String expiryMonth) { this.expiryMonth = expiryMonth; }

    public String getExpiryYear() { return expiryYear; }
    public void setExpiryYear(String expiryYear) { this.expiryYear = expiryYear; }

    public String getNickname() { return nickname; }
    public void setNickname(String nickname) { this.nickname = nickname; }
}