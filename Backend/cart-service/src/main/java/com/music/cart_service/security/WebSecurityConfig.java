package com.music.cart_service.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebSecurityConfig implements WebMvcConfigurer {

    private final OwnerInterceptor ownerInterceptor;

    public WebSecurityConfig(OwnerInterceptor ownerInterceptor) {
        this.ownerInterceptor = ownerInterceptor;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(ownerInterceptor)
                .addPathPatterns("/cart/**");
    }
}