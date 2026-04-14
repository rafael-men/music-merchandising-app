package com.music.notification_service.migration;

import io.mongock.api.annotations.ChangeUnit;
import io.mongock.api.annotations.Execution;
import io.mongock.api.annotations.RollbackExecution;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.index.Index;

@ChangeUnit(id = "v001-init-notification-collection", order = "001", author = "system")
public class V001_InitNotificationCollection {

    @Execution
    public void execute(MongoTemplate mongoTemplate) {
        if (!mongoTemplate.collectionExists("notifications")) {
            mongoTemplate.createCollection("notifications");
        }

        mongoTemplate.indexOps("notifications")
                .ensureIndex(new Index().on("userId", Sort.Direction.ASC).named("idx_notification_userId"));

        mongoTemplate.indexOps("notifications")
                .ensureIndex(new Index().on("read", Sort.Direction.ASC).named("idx_notification_read"));

        mongoTemplate.indexOps("notifications")
                .ensureIndex(new Index()
                        .on("userId", Sort.Direction.ASC)
                        .on("read", Sort.Direction.ASC)
                        .named("idx_notification_userId_read"));

        mongoTemplate.indexOps("notifications")
                .ensureIndex(new Index().on("createdAt", Sort.Direction.DESC).named("idx_notification_createdAt"));
    }

    @RollbackExecution
    public void rollback(MongoTemplate mongoTemplate) {
        mongoTemplate.dropCollection("notifications");
    }
}
