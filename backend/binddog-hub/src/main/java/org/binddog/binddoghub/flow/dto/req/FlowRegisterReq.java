package org.binddog.binddoghub.flow.dto.req;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@ToString
public class FlowRegisterReq {

    private String title;
    private String description;

    private List<Block> blocks;
    private List<Link> links;

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Position {
        private Float x;
        private Float y;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Block {
        private Long blockId;
        private String method;
        private String endpoint;
        private String name;
        private Position position;
        private Map<String, String> header;
        private Map<String, String> parameter;
        private Map<String, String> pathVariable;
        private Map<String, Object> request;
        private Map<String, Object> response;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Link {
        private Long linkId;
        private Long fromBlockId;
        private Long toBlockId;
        private List<Mapping> mappings;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Mapping {
        private String fromFieldType;
        private String fromField;
        private String toFieldType;
        private String toField;
    }
}