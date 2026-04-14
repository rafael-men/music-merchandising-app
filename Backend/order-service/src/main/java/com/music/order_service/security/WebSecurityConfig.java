package com.music.order_service.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebSecurityConfig implements WebMvcConfigurer {

    private final OrderSecurityInterceptor orderSecurityInterceptor;

    public WebSecurityConfig(OrderSecurityInterceptor orderSecurityInterceptor) {
        this.orderSecurityInterceptor = orderSecurityInterceptor;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(orderSecurityInterceptor)
                .addPathPatterns("/orders/**");
    }
}
