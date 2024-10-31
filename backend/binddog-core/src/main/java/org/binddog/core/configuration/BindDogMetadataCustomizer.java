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

    @Override
    public void customise(OpenAPI openApi) {
        Map<String, PathItem> paths = openApi.getPaths();
        paths.forEach((path, pathItem) -> {
            pathItem.readOperations().forEach(operation -> {
                // 해당 API의 핸들러 메서드 정보를 가져옴
                HandlerMethod handlerMethod = handlerMapping.getHandlerMethods()
                                                            .entrySet()
                                                            .stream()
                                                            .filter(entry -> entry.getKey().getPatternValues().contains(path))
                                                            .map(Map.Entry::getValue)
                                                            .findFirst()
                                                            .orElse(null);

                if (handlerMethod != null) {
                    BindDogMetadata bindDogMetadata = handlerMethod.getMethodAnnotation(BindDogMetadata.class);
                    if (bindDogMetadata != null) {
                        // 기존 확장 필드를 가져오거나 새로 생성
                        Map<String, Object> extensions = operation.getExtensions();
                        if (extensions == null) {
                            extensions = new HashMap<>();
                            operation.setExtensions(extensions);  // 새로 생성한 경우 설정해줌
                        }

                        // 확장 필드 추가
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
