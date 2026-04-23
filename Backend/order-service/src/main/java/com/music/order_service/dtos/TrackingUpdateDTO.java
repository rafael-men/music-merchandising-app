package com.music.order_service.dtos;

import jakarta.validation.constraints.NotBlank;

public record TrackingUpdateDTO(
        @NotBlank String trackingCode,
        @NotBlank String carrier,
        String trackingUrl
) {}
