package org.binddog.binddoghub.flow.mapper;

import org.binddog.binddoghub.flow.document.Flow;
import org.binddog.binddoghub.flow.dto.req.FlowCreateReq;
import org.binddog.binddoghub.flow.dto.req.FlowRegisterReq;
import org.binddog.binddoghub.flow.dto.res.FlowSearchRes;
import org.binddog.binddoghub.flow.dto.res.FlowSummary;
import org.binddog.binddoghub.flow.dto.res.FlowsSearchRes;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Mapper(componentModel = "spring")
public interface FlowMapper {

    @Mapping(target = "flowId", source = "flowId")
    @Mapping(target = "title", source = "flow.title")
    @Mapping(target = "description", source = "flow.description")
    @Mapping(target = "createdAt", source = "flow.createdAt", qualifiedByName = "mapDateToString")
    @Mapping(target = "updatedAt", source = "flow.updatedAt", qualifiedByName = "mapDateToString")
    FlowSummary toFlowSummary(Flow flow);

    @Mapping(target = "flowId", source = "flowId")
    @Mapping(target = "title", source = "flow.title")
    @Mapping(target = "description", source = "flow.description")
    @Mapping(target = "blocks", source = "flow.blocks", qualifiedByName = "mapBlocks")
    @Mapping(target = "links", source = "flow.links", qualifiedByName = "mapLinks")
    Flow toFlow(Long projectId, String flowId, FlowRegisterReq flow);

    @Mapping(target = "title", source = "flowCreateReq.title")
    @Mapping(target = "description", source = "flowCreateReq.description")
    Flow toNewFlow(Long projectId, FlowCreateReq flowCreateReq);

    Flow.Block toBlock(FlowRegisterReq.Block blocks);

    @Mapping(source = "links.mappings", target = "mappings", qualifiedByName = "mapMappings")
    Flow.Link toLink(FlowRegisterReq.Link links);

    Flow.Mapping toMapping(FlowRegisterReq.Mapping mapping);

    @Mapping(target = "flowId", source = "flow.flowId")
    @Mapping(target = "title", source = "flow.title")
    @Mapping(target = "description", source = "flow.description")
    @Mapping(target = "blocks", source = "flow.blocks")
    @Mapping(target = "links", source = "flow.links")
    FlowSearchRes toFlowSearchRes(Flow flow);

    FlowSearchRes.BlockResponse toBlockResponse(Flow.Block block);

    @Mapping(target = "mappings", source = "link.mappings", qualifiedByName = "mapMappingsDto")
    FlowSearchRes.LinkResponse toLinkResponse(Flow.Link link);

    @Named("mapMappings")
    default List<Flow.Mapping> mapMappings(List<FlowRegisterReq.Mapping> mappings) {
        return mappings.stream()
                       .map(this::toMapping)
                       .toList();
    }

    @Named("mapBlocks")
    default List<Flow.Block> mapBlocks(List<FlowRegisterReq.Block> blocks) {
        return blocks.stream()
                     .map(this::toBlock)
                     .toList();
    }

    @Named("mapLinks")
    default List<Flow.Link> mapLinks(List<FlowRegisterReq.Link> links) {
        return links.stream()
                    .map(this::toLink)
                    .toList();
    }

    @Named("mapDateToString")
    default String mapDateToString(LocalDateTime dateTime) {
        return (dateTime != null) ? dateTime.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME) : null;
    }

    default FlowsSearchRes toFlowsSearchRes(List<Flow> flows) {
        List<FlowSummary> flowSummaries = flows.stream()
                                               .map(this::toFlowSummary)
                                               .toList();
        return new FlowsSearchRes(flowSummaries.size(), flowSummaries);
    }

    @Named("mapMappingsDto")
    default List<FlowSearchRes.MappingResponse> mapMappingsDto(List<Flow.Mapping> mappings) {
        List<FlowSearchRes.MappingResponse> mappingResponses
                = mappings.stream()
                          .map(this::mapMappingDto)
                          .toList();
        return mappingResponses;
    }

    FlowSearchRes.MappingResponse mapMappingDto(Flow.Mapping mapping);
}
