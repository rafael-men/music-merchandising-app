package com.microsservices.api_gateway.filter;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class RateLimitFilter extends OncePerRequestFilter {

    private final Map<String, Bucket> buckets = new ConcurrentHashMap<>();

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain) throws ServletException, IOException {

        String key = clientKey(request) + ":" + bucketScope(request);
        Bucket bucket = buckets.computeIfAbsent(key, k -> buildBucket(request));

        if (bucket.tryConsume(1)) {
            chain.doFilter(request, response);
            return;
        }

        response.setStatus(429);
        response.setContentType("application/json");
        response.getWriter().write("{\"error\":\"Muitas requisições. Tente novamente em instantes.\"}");
    }

    private Bucket buildBucket(HttpServletRequest request) {
        String path = request.getRequestURI();
        String method = request.getMethod();

        Bandwidth limit;
        if (path.startsWith("/users/login") || path.startsWith("/users/register")) {
            limit = Bandwidth.builder()
                    .capacity(5)
                    .refillIntervally(5, Duration.ofMinutes(1))
                    .build();
        } else if (path.startsWith("/products") && "GET".equalsIgnoreCase(method)) {
            limit = Bandwidth.builder()
                    .capacity(60)
                    .refillIntervally(60, Duration.ofMinutes(1))
                    .build();
        } else {
            limit = Bandwidth.builder()
                    .capacity(100)
                    .refillIntervally(100, Duration.ofMinutes(1))
                    .build();
        }
        return Bucket.builder().addLimit(limit).build();
    }

    private String bucketScope(HttpServletRequest request) {
        String path = request.getRequestURI();
        if (path.startsWith("/users/login") || path.startsWith("/users/register")) return "auth";
        if (path.startsWith("/products") && "GET".equalsIgnoreCase(request.getMethod())) return "products-read";
        return "default";
    }

    private String clientKey(HttpServletRequest request) {
        String forwarded = request.getHeader("X-Forwarded-For");
        if (forwarded != null && !forwarded.isBlank()) {
            return forwarded.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}
