package org.binddog.binddoghub.project.service;

import lombok.RequiredArgsConstructor;
import org.binddog.binddoghub.global.enums.NoneResponse;
import org.binddog.binddoghub.global.response.SuccessResponse;
import org.binddog.binddoghub.member.entity.Member;
import org.binddog.binddoghub.member.repository.MemberRepository;
import org.binddog.binddoghub.project.dto.req.ProjectCreateReq;
import org.binddog.binddoghub.project.dto.res.ProjectSearchRes;
import org.binddog.binddoghub.project.entity.Project;
import org.binddog.binddoghub.project.mapper.ProjectMapper;
import org.binddog.binddoghub.project.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

import static org.binddog.binddoghub.global.enums.SuccessCode.GET_PROJECT_SUCCESS;
import static org.binddog.binddoghub.global.enums.SuccessCode.PROJECT_CREATED;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final ProjectMapper projectMapper;
    private final ProjectRepository projectRepository;
    private final MemberRepository memberRepository;

    @Override
    public SuccessResponse<NoneResponse> createProject(Long memberId, ProjectCreateReq request) {
        Member member = memberRepository.getById(memberId);
        Project project = projectMapper.toEntity(member, request);
        projectRepository.save(project);
        return new SuccessResponse<>(PROJECT_CREATED, NoneResponse.NONE);
    }

    @Override
    public SuccessResponse<List<ProjectSearchRes>> getProjects(Long memberId) {
        List<Project> projectList = projectRepository.findByMemberId(memberId);
        List<ProjectSearchRes> response
                = projectList.stream()
                             .map(projectMapper::toDto)
                             .toList();
        return new SuccessResponse<>(GET_PROJECT_SUCCESS, response);
    }
}
