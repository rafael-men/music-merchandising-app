CREATE TABLE IF NOT EXISTS user_favorites (
    user_id UUID NOT NULL,
    product_id VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id, product_id),
    CONSTRAINT fk_user_favorites_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_user_favorites_user_id ON user_favorites(user_id);
