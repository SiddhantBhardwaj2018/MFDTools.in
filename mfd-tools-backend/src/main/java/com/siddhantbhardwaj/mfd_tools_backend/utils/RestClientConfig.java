package com.siddhantbhardwaj.mfd_tools_backend.utils;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestClient;

@Configuration
public class RestClientConfig {

    @Bean
    @Qualifier("mfResearchRestClient")
    public RestClient restClient(){
        return RestClient.builder()
                .baseUrl("http://localhost:8084/api/navCalculator")
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .defaultHeader("Origin", "http://localhost:8088")
                .build();
    }

}
