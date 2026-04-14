package com.music.product_service.migration;

import io.mongock.api.annotations.ChangeUnit;
import io.mongock.api.annotations.Execution;
import io.mongock.api.annotations.RollbackExecution;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.index.Index;

@ChangeUnit(id = "v001-init-product-collection", order = "001", author = "system")
public class V001_InitProductCollection {

    @Execution
    public void execute(MongoTemplate mongoTemplate) {
        if (!mongoTemplate.collectionExists("products")) {
            mongoTemplate.createCollection("products");
        }

        mongoTemplate.indexOps("products")
                .ensureIndex(new Index().on("title", Sort.Direction.ASC).named("idx_product_title"));

        mongoTemplate.indexOps("products")
                .ensureIndex(new Index().on("categories", Sort.Direction.ASC).named("idx_product_categories"));

        mongoTemplate.indexOps("products")
                .ensureIndex(new Index().on("available", Sort.Direction.ASC).named("idx_product_available"));
    }

    @RollbackExecution
    public void rollback(MongoTemplate mongoTemplate) {
        mongoTemplate.dropCollection("products");
    }
}