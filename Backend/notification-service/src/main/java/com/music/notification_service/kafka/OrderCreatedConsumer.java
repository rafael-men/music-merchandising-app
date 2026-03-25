package com.music.notification_service.kafka;

import com.music.notification_service.models.Notification;
import com.music.notification_service.models.NotificationType;
import com.music.notification_service.repositories.NotificationRepository;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class OrderCreatedConsumer {

    private final NotificationRepository notificationRepository;

    public OrderCreatedConsumer(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @KafkaListener(topics = "order.created", groupId = "notification-service-group",
            containerFactory = "kafkaListenerContainerFactory")
    public void consume(OrderCreatedEvent event) {
        Notification notification = new Notification(
                null,
                event.userId(),
                "Pedido #" + event.orderId() + " criado com sucesso! Total: R$ " +
                        String.format("%.2f", event.total()),
                NotificationType.ORDER_CONFIRMED
        );
        notificationRepository.save(notification);
    }
}
