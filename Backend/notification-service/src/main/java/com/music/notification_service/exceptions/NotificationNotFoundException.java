package com.music.notification_service.exceptions;

public class NotificationNotFoundException extends RuntimeException {
    public NotificationNotFoundException(String id) {
        super("Notification not found with id: " + id);
    }
}
