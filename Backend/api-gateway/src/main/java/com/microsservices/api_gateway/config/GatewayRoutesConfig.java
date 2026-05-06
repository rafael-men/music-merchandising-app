package com.microsservices.api_gateway.config;

import com.microsservices.api_gateway.filter.JwtAuthGatewayFilter;
import org.springframework.cloud.gateway.server.mvc.filter.BeforeFilterFunctions;
import org.springframework.cloud.gateway.server.mvc.handler.GatewayRouterFunctions;
import org.springframework.cloud.gateway.server.mvc.handler.HandlerFunctions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.function.RequestPredicates;
import org.springframework.web.servlet.function.RouterFunction;
import org.springframework.web.servlet.function.ServerResponse;

@Configuration
public class GatewayRoutesConfig {

    private final JwtAuthGatewayFilter jwtAuthGatewayFilter;

    public GatewayRoutesConfig(JwtAuthGatewayFilter jwtAuthGatewayFilter) {
        this.jwtAuthGatewayFilter = jwtAuthGatewayFilter;
    }

    @Bean
    public RouterFunction<ServerResponse> authServiceRoute() {
        return GatewayRouterFunctions.route("auth-service")
                .route(RequestPredicates.path("/users/**"), HandlerFunctions.http())
                .before(BeforeFilterFunctions.uri("http://auth-service:8081"))
                .filter(jwtAuthGatewayFilter.filter())
                .build();
    }

    @Bean
    public RouterFunction<ServerResponse> productServiceRoute() {
        return GatewayRouterFunctions.route("product-service")
                .route(RequestPredicates.path("/products/**"), HandlerFunctions.http())
                .before(BeforeFilterFunctions.uri("http://product-service:8083"))
                .filter(jwtAuthGatewayFilter.filter())
                .build();
    }

    @Bean
    public RouterFunction<ServerResponse> cartServiceRoute() {
        return GatewayRouterFunctions.route("cart-service")
                .route(RequestPredicates.path("/cart/**"), HandlerFunctions.http())
                .before(BeforeFilterFunctions.uri("http://cart-service:8082"))
                .filter(jwtAuthGatewayFilter.filter())
                .build();
    }

    @Bean
    public RouterFunction<ServerResponse> orderServiceRoute() {
        return GatewayRouterFunctions.route("order-service")
                .route(RequestPredicates.path("/orders/**"), HandlerFunctions.http())
                .before(BeforeFilterFunctions.uri("http://order-service:8084"))
                .filter(jwtAuthGatewayFilter.filter())
                .build();
    }

    @Bean
    public RouterFunction<ServerResponse> notificationServiceRoute() {
        return GatewayRouterFunctions.route("notification-service")
                .route(RequestPredicates.path("/notifications/**"), HandlerFunctions.http())
                .before(BeforeFilterFunctions.uri("http://notification-service:8085"))
                .filter(jwtAuthGatewayFilter.filter())
                .build();
    }
}
