package org.binddog.core.configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.PathItem;
import org.binddog.core.annotation.BindDogMetadata;
import org.binddog.core.annotation.BlockInfo;
import org.springdoc.core.customizers.OpenApiCustomizer;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import java.util.HashMap;
import java.util.Map;

@Component
public class BindDogMetadataCustomizer implements OpenApiCustomizer {

    private final RequestMappingHandlerMapping handlerMapping;
    private final String BINDDOG_FIELD = "blockInfo";

    public BindDogMetadataCustomizer(RequestMappingHandlerMapping handlerMapping) {
        this.handlerMapping = handlerMapping;
    }

    /**
     * Customizes the OpenAPI object by adding extended metadata for specific API paths.
     *
     * <p>This method retrieves handler method information for each API path and checks for the presence
     * of the {@link BindDogMetadata} annotation on each handler method. If the annotation is found,
     * it adds the extended field information specified by {@link BindDogMetadata} to the operation's
     * extensions.
     *
     * @param openApi the OpenAPI object to customize
     */
    @Override
    public void customise(OpenAPI openApi) {
        // Retrieve all paths in the OpenAPI object
        Map<String, PathItem> paths = openApi.getPaths();

        // Iterate through each path and its associated PathItem
        paths.forEach((path, pathItem) -> {
            pathItem.readOperations().forEach(operation -> {
                // Retrieve handler method information of the specified API
                HandlerMethod handlerMethod = handlerMapping.getHandlerMethods()
                                                            .entrySet()
                                                            .stream()
                                                            .filter(entry -> entry.getKey().getPatternValues().contains(path))
                                                            .map(Map.Entry::getValue)
                                                            .findFirst()
                                                            .orElse(null);

                if (handlerMethod != null) {
                    // Check if the handler method has the BindDogMetadata annotation
                    BindDogMetadata bindDogMetadata = handlerMethod.getMethodAnnotation(BindDogMetadata.class);
                    if (bindDogMetadata != null) {
                        // Retrieve existing extended fields or create new ones
                        Map<String, Object> extensions = operation.getExtensions();
                        if (extensions == null) {
                            extensions = new HashMap<>();
                            operation.setExtensions(extensions);  // Set it up if newly created
                        }

                        // Add extended field
                        BlockInfo blockInfo = new BlockInfo.Builder()
                                .blockName(bindDogMetadata.blockName())
                                .status(bindDogMetadata.status())
                                .build();

                        extensions.put(BINDDOG_FIELD, blockInfo);
                    }
                }
            });
        });
    }


}
