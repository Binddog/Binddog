package org.binddog.binddoghub.project.mapper;


import org.binddog.binddoghub.member.entity.Member;
import org.binddog.binddoghub.project.dto.req.ProjectCreateReq;
import org.binddog.binddoghub.project.dto.res.ProjectSearchRes;
import org.binddog.binddoghub.project.entity.Project;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProjectMapper {

    @Mapping(target = "member", source = "member")
    @Mapping(target = "title", source = "request.title")
    @Mapping(target = "description", source = "request.description")
    Project toEntity(Member member, ProjectCreateReq request);


    @Mapping(target = "projectId", source = "project.id")
    @Mapping(target = "title", source = "project.title")
    @Mapping(target = "description", source = "project.description")
    @Mapping(target = "createdDate", source = "project.createdAt")
    @Mapping(target = "lastModifiedDate", source = "project.updatedAt")
    ProjectSearchRes toDto(Project project);
}
