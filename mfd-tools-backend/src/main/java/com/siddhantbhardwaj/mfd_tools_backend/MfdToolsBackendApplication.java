package com.siddhantbhardwaj.mfd_tools_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class MfdToolsBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(MfdToolsBackendApplication.class, args);
	}

}
