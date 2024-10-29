package org.binddog.core.configuration;

import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.context.annotation.ComponentScan;

@AutoConfiguration
@ComponentScan(basePackages = "org.binddog.core.configuration")
@ConfigurationPropertiesScan(basePackages = "org.binddog.core.properties")
public class BindDogConfiguration {

}
