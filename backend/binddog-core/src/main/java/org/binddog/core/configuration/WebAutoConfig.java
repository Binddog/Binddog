package org.binddog.core.configuration;

import org.binddog.core.properties.BindDogConfigProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebAutoConfig implements WebMvcConfigurer {

    private final BindDogConfigProperties bindDogConfigProperties;

    public WebAutoConfig(BindDogConfigProperties bindDogConfigProperties) {
        this.bindDogConfigProperties = bindDogConfigProperties;
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        String path = bindDogConfigProperties.getLocalPath();
        if (!path.startsWith("/")) {
            path = "/" + path;
        }
        registry.addViewController(path).setViewName("forward:/BINDDOG-UI/index.html");
    }
}
