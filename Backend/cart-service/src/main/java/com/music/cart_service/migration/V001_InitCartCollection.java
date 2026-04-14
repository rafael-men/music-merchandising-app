package com.music.cart_service.migration;

import io.mongock.api.annotations.ChangeUnit;
import io.mongock.api.annotations.Execution;
import io.mongock.api.annotations.RollbackExecution;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.index.Index;

@ChangeUnit(id = "v001-init-cart-collection", order = "001", author = "system")
public class V001_InitCartCollection {

    @Execution
    public void execute(MongoTemplate mongoTemplate) {
        if (!mongoTemplate.collectionExists("carts")) {
            mongoTemplate.createCollection("carts");
        }

        mongoTemplate.indexOps("carts")
                .ensureIndex(new Index().on("userId", Sort.Direction.ASC).unique().named("idx_cart_userId"));
    }

    @RollbackExecution
    public void rollback(MongoTemplate mongoTemplate) {
        mongoTemplate.dropCollection("carts");
    }
}
