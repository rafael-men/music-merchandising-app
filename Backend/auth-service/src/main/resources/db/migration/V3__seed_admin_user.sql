INSERT INTO users (id, name, email, password, role)
VALUES (
    gen_random_uuid(),
    'Admin',
    'rafael@music.com',
    '$2b$12$EA26S9vQqNLrJT7J9NEdXeNTXiWxYoy8q4sO4.S572ik6ovGbwUiq',
    'ADMIN'
)
ON CONFLICT (email) DO NOTHING;
