package com.music.order_service.migration;

import io.mongock.api.annotations.ChangeUnit;
import io.mongock.api.annotations.Execution;
import io.mongock.api.annotations.RollbackExecution;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.index.Index;

@ChangeUnit(id = "v001-init-order-collection", order = "001", author = "system")
public class V001_InitOrderCollection {

    @Execution
    public void execute(MongoTemplate mongoTemplate) {
        if (!mongoTemplate.collectionExists("orders")) {
            mongoTemplate.createCollection("orders");
        }

        mongoTemplate.indexOps("orders")
                .ensureIndex(new Index().on("userId", Sort.Direction.ASC).named("idx_order_userId"));

        mongoTemplate.indexOps("orders")
                .ensureIndex(new Index().on("status", Sort.Direction.ASC).named("idx_order_status"));

        mongoTemplate.indexOps("orders")
                .ensureIndex(new Index().on("createdAt", Sort.Direction.DESC).named("idx_order_createdAt"));
    }

    @RollbackExecution
    public void rollback(MongoTemplate mongoTemplate) {
        mongoTemplate.dropCollection("orders");
    }
}
