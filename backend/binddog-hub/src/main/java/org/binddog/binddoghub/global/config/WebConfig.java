package org.binddog.binddoghub.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(
                        "https://localhost:3000",
                        "http://localhost:3000",
                        "https://localhost:5173",
                        "http://localhost:5173",
                        "https://localhost:8080",
                        "http://localhost:8080",
                        "https://binddog.org",
                        "http://binddog.org",
                        "https://api.binddog.org",
                        "http://api.binddog.org",
                        "https://www.binddog.org",   
                        "http://www.binddog.org"
                )
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}

