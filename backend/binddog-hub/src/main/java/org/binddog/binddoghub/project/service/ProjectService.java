package org.binddog.binddoghub.project.service;

import org.binddog.binddoghub.global.enums.NoneResponse;
import org.binddog.binddoghub.global.response.SuccessResponse;
import org.binddog.binddoghub.project.dto.req.ProjectCreateReq;
import org.binddog.binddoghub.project.dto.res.ProjectSearchRes;

import java.util.List;

public interface ProjectService {

    SuccessResponse<NoneResponse> createProject(Long memberId, ProjectCreateReq request);

    SuccessResponse<List<ProjectSearchRes>> getProjects(Long memberId);

    boolean existsByIdAndMemberId(Long projectId, Long memberId);
}
