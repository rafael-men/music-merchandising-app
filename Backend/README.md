# Music Store — Backend

Microsserviços Spring Boot orquestrados via Docker Compose.

## Subir tudo

```bash
docker compose up -d --build
```

O primeiro build leva alguns minutos (Maven baixa dependências de cada serviço). Builds seguintes usam cache de layer e ficam rápidos.

## Serviços e portas

| Serviço              | Porta | Função                                        |
|----------------------|-------|-----------------------------------------------|
| api-gateway          | 8080  | Entrada única (frontend consome esta)         |
| eureka-server        | 8761  | Service discovery                             |
| auth-service         | 8081  | Usuários, login, JWT, favoritos               |
| cart-service         | 8082  | Carrinho                                      |
| product-service      | 8083  | Catálogo de produtos                          |
| order-service        | 8084  | Pedidos e rastreamento                        |
| notification-service | 8085  | Notificações (consumidor Kafka)               |
| auth-db (Postgres)   | 5432  | Banco de usuários                             |
| mongodb              | 27017 | Banco de produtos, carrinho, pedidos, notif.  |
| kafka                | 9092  | Eventos entre serviços                        |

## Comandos úteis

```bash
# Ver logs do gateway (saída do frontend chega aqui)
docker compose logs -f api-gateway

# Reiniciar um serviço após code change
docker compose up -d --build product-service

# Parar tudo (mantém volumes/dados)
docker compose down

# Parar tudo e apagar volumes (zera Postgres, Mongo, Kafka)
docker compose down -v
```

## Ordem de boot

O Compose respeita `depends_on` com `service_healthy`, então a ordem real é:

1. Bancos (Postgres, Mongo) e Kafka — esperam ficar saudáveis
2. eureka-server
3. auth, product, cart, order, notification (em paralelo)
4. api-gateway (último)

## Healthchecks

Cada serviço tem `healthcheck` no compose. Confira o estado com:

```bash
docker compose ps
```

A coluna `STATUS` mostra `healthy` quando o serviço estiver pronto.
