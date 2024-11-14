package org.binddog.binddoghub.flow.dto.res;

import lombok.Builder;

import java.util.List;
import java.util.Map;

@Builder
public record FlowSearchRes(
        String flowId,
        String title,
        String description,
        List<BlockResponse> blocks,
        List<LinkResponse> links
) {

    public record Position(
            Float x,
            Float y
    ) { }

    public record BlockResponse(
            Long blockId,
            String method,
            String endpoint,
            String name,
            Position position,
            Map<String, String> header,
            Map<String, String> parameter,
            Map<String, String> pathVariable,
            Map<String, Object> request,
            Map<String, Object> response
    ) { }

    public record LinkResponse(
            Long linkId,
            Long fromBlockId,
            Long toBlockId,
            List<MappingResponse> mappings
    ) { }

    public record MappingResponse(
            String fromFieldType,
            String fromField,
            String toFieldType,
            String toField
    ) { }
}
