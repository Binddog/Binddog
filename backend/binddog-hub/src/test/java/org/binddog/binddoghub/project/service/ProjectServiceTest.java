package org.binddog.binddoghub.project.service;

import org.binddog.binddoghub.global.enums.NoneResponse;
import org.binddog.binddoghub.global.response.SuccessResponse;
import org.binddog.binddoghub.member.entity.Member;
import org.binddog.binddoghub.member.repository.MemberRepository;
import org.binddog.binddoghub.project.dto.req.ProjectCreateReq;
import org.binddog.binddoghub.project.dto.res.ProjectSearchRes;
import org.binddog.binddoghub.project.entity.Project;
import org.binddog.binddoghub.project.mapper.ProjectMapper;
import org.binddog.binddoghub.project.repository.ProjectRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.binddog.binddoghub.global.enums.NoneResponse.NONE;
import static org.binddog.binddoghub.global.enums.SuccessCode.GET_PROJECT_SUCCESS;
import static org.binddog.binddoghub.global.enums.SuccessCode.PROJECT_CREATED;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProjectServiceTest {

    @InjectMocks
    private ProjectServiceImpl projectService;

    @Mock
    private ProjectRepository projectRepository;

    @Mock
    private ProjectMapper projectMapper;

    @Mock
    private MemberRepository memberRepository;

    @Test
    @DisplayName("Project creation test successful")
    void createTestSuccess() {
        //given
        Long memberId = 1L;
        String title = "Project Title";
        String description = "Project Description";
        ProjectCreateReq request = ProjectCreateReq.builder()
                                                   .title(title)
                                                   .description(description)
                                                   .build();
        Member member = mock(Member.class);
        Project project = mock(Project.class);

        //when
        when(memberRepository.getById(memberId)).thenReturn(member);
        when(projectMapper.toEntity(member, request)).thenReturn(project);
        when(projectRepository.save(any(Project.class))).thenReturn(project);
        SuccessResponse<NoneResponse> response = projectService.createProject(memberId, request);

        //then
        assertThat(response.successCode()).isEqualTo(PROJECT_CREATED);
        assertThat(response.data()).isEqualTo(NONE);
        verify(projectRepository, times(1)).save(any(Project.class));
    }

    @Test
    @DisplayName("Project list inquiry test successful")
    void projectInquiryTestSuccess() {
        //given
        int SIZE = 3;
        Long memberId = 1L;
        Project project = mock(Project.class);
        ProjectSearchRes projectSearchRes = mock(ProjectSearchRes.class);


        List<Project> projects = new ArrayList<>();
        for (int i = 0; i < SIZE; i++) {
            projects.add(project);
        }

        List<ProjectSearchRes> projectSearchResList = new ArrayList<>();
        for (int i = 0; i < SIZE; i++) {
            projectSearchResList.add(projectSearchRes);
        }

        //when
        when(projectRepository.findByMemberIdOrderByUpdatedAtDesc(memberId)).thenReturn(projects);
        when(projectMapper.toDto(any(Project.class))).thenReturn(projectSearchRes);
        SuccessResponse<List<ProjectSearchRes>> response = projectService.getProjects(memberId);

        //then
        assertThat(response.successCode()).isEqualTo(GET_PROJECT_SUCCESS);
        assertThat(response.data()).isEqualTo(projectSearchResList);
        verify(projectMapper, times(SIZE)).toDto(any(Project.class));
    }
}