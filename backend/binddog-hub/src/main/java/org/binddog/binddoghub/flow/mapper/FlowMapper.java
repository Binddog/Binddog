package org.binddog.binddoghub.flow.mapper;

import org.binddog.binddoghub.flow.document.Flow;
import org.binddog.binddoghub.flow.dto.req.FlowCreateReq;
import org.binddog.binddoghub.flow.dto.req.FlowRegisterReq;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring")
public interface FlowMapper {

    @Mapping(target = "flowId", source = "flowId")
    @Mapping(target = "blocks", source = "flow.blocks", qualifiedByName = "mapBlocks")
    @Mapping(target = "links", source = "flow.links", qualifiedByName = "mapLinks")
    @Mapping(target = "mapping", expression = "java(toMapping(flow.getMapping()))")
    Flow toFlow(Long projectId, String flowId, FlowRegisterReq flow);

    @Mapping(target = "title", source = "flowCreateReq.title")
    @Mapping(target = "description", source = "flowCreateReq.description")
    Flow toNewFlow(Long projectId, FlowCreateReq flowCreateReq);

    Flow.Block toBlock(FlowRegisterReq.Block blocks);

    Flow.Link toLink(FlowRegisterReq.Link links);

    Flow.Mapping toMapping(FlowRegisterReq.Mapping mapping);

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
}
