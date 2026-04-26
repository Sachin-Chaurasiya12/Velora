package com.Velora.AuthService.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Velora Auth Service API")
                        .version("1.0")
                        .description("Authentication microservice for Velora application")
                        .contact(new Contact()
                                .name("Velora Team")
                                .email("support@velora.com")
                        )
                );
    }
}