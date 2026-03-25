package com.music.notification_service.dtos;

import com.music.notification_service.models.Notification;
import com.music.notification_service.models.NotificationType;

import java.time.LocalDateTime;

public record NotificationResponseDTO(
        String id,
        String userId,
        String message,
        NotificationType type,
        boolean read,
        LocalDateTime createdAt
) {
    public static NotificationResponseDTO from(Notification notification) {
        return new NotificationResponseDTO(
                notification.getId(),
                notification.getUserId(),
                notification.getMessage(),
                notification.getType(),
                notification.isRead(),
                notification.getCreatedAt()
        );
    }
}
