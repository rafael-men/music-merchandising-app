package com.music.notification_service.services.impl;

import com.music.notification_service.dtos.NotificationResponseDTO;
import com.music.notification_service.exceptions.NotificationNotFoundException;
import com.music.notification_service.repositories.NotificationRepository;
import com.music.notification_service.services.NotificationService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationServiceImpl(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @Override
    public NotificationResponseDTO findById(String id) {
        return NotificationResponseDTO.from(notificationRepository.findById(id)
                .orElseThrow(() -> new NotificationNotFoundException(id)));
    }

    @Override
    public List<NotificationResponseDTO> findByUserId(String userId) {
        return notificationRepository.findByUserId(userId).stream().map(NotificationResponseDTO::from).toList();
    }

    @Override
    public List<NotificationResponseDTO> findUnreadByUserId(String userId) {
        return notificationRepository.findByUserIdAndReadFalse(userId).stream().map(NotificationResponseDTO::from).toList();
    }

    @Override
    public NotificationResponseDTO markAsRead(String id) {
        var notification = notificationRepository.findById(id)
                .orElseThrow(() -> new NotificationNotFoundException(id));
        notification.setRead(true);
        return NotificationResponseDTO.from(notificationRepository.save(notification));
    }
}