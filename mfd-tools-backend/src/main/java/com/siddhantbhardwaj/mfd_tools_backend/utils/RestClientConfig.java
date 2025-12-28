package com.siddhantbhardwaj.mfd_tools_backend.utils;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class RestClientConfig {

    @Bean
    public RestClient restClient(){
        return RestClient.builder()
                .baseUrl("http://localhost:8084")
                .defaultHeader("Content-Type", "application/json")
                .defaultHeader("Origin", "http://localhost:8088")
                .build();
    }

}
