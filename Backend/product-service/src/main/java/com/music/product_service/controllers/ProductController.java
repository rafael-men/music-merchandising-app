package com.music.product_service.controllers;

import com.music.product_service.dtos.ProductRequestDTO;
import com.music.product_service.dtos.ProductResponseDTO;
import com.music.product_service.models.ProductCategory;
import com.music.product_service.services.ProductService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    private static final Logger audit = LoggerFactory.getLogger("AUDIT");

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/new")
    public ResponseEntity<ProductResponseDTO> create(
            @RequestHeader(value = "X-User-Id", required = false) String userId,
            @RequestBody @Valid ProductRequestDTO dto) {
        ProductResponseDTO created = productService.create(dto);
        audit.info("action=CREATE_PRODUCT userId={} productId={} title={}", userId, created.id(), created.title());
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> findById(@PathVariable String id) {
        return ResponseEntity.ok(productService.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<ProductResponseDTO>> findAll(
            @RequestParam(required = false) ProductCategory category,
            @RequestParam(required = false) String search) {
        if (category != null) return ResponseEntity.ok(productService.findByCategory(category));
        if (search != null) return ResponseEntity.ok(productService.search(search));
        return ResponseEntity.ok(productService.findAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> update(
            @RequestHeader(value = "X-User-Id", required = false) String userId,
            @PathVariable String id,
            @RequestBody @Valid ProductRequestDTO dto) {
        ProductResponseDTO updated = productService.update(id, dto);
        audit.info("action=UPDATE_PRODUCT userId={} productId={}", userId, id);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @RequestHeader(value = "X-User-Id", required = false) String userId,
            @PathVariable String id) {
        productService.delete(id);
        audit.info("action=DELETE_PRODUCT userId={} productId={}", userId, id);
        return ResponseEntity.noContent().build();
    }
}
