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

import java.net.URI;

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
                .before(BeforeFilterFunctions.uri("lb://auth-service"))
                .filter(jwtAuthGatewayFilter.filter())
                .build();
    }

    @Bean
    public RouterFunction<ServerResponse> productServiceRoute() {
        return GatewayRouterFunctions.route("product-service")
                .route(RequestPredicates.path("/products/**"), HandlerFunctions.http())
                .before(BeforeFilterFunctions.uri("lb://product-service"))
                .filter(jwtAuthGatewayFilter.filter())
                .build();
    }

    @Bean
    public RouterFunction<ServerResponse> cartServiceRoute() {
        return GatewayRouterFunctions.route("cart-service")
                .route(RequestPredicates.path("/cart/**"), HandlerFunctions.http())
                .before(BeforeFilterFunctions.uri("lb://cart-service"))
                .filter(jwtAuthGatewayFilter.filter())
                .build();
    }

    @Bean
    public RouterFunction<ServerResponse> orderServiceRoute() {
        return GatewayRouterFunctions.route("order-service")
                .route(RequestPredicates.path("/orders/**"), HandlerFunctions.http())
                .before(BeforeFilterFunctions.uri("lb://order-service"))
                .filter(jwtAuthGatewayFilter.filter())
                .build();
    }

    @Bean
    public RouterFunction<ServerResponse> notificationServiceRoute() {
        return GatewayRouterFunctions.route("notification-service")
                .route(RequestPredicates.path("/notifications/**"), HandlerFunctions.http())
                .before(BeforeFilterFunctions.uri("lb://notification-service"))
                .filter(jwtAuthGatewayFilter.filter())
                .build();
    }
}
