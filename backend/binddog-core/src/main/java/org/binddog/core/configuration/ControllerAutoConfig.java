package org.binddog.core.configuration;

import org.binddog.core.controller.BindDogUIController;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ControllerAutoConfig {

    @Bean
    public BindDogUIController bindDogUIController() {
        return new BindDogUIController();
    }
}
