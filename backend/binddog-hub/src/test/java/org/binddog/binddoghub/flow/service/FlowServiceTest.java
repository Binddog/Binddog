package org.binddog.binddoghub.flow.service;

import org.binddog.binddoghub.flow.document.Flow;
import org.binddog.binddoghub.flow.dto.req.FlowCreateReq;
import org.binddog.binddoghub.flow.dto.req.FlowRegisterReq;
import org.binddog.binddoghub.flow.dto.res.FlowCreateRes;
import org.binddog.binddoghub.flow.mapper.FlowMapper;
import org.binddog.binddoghub.flow.repository.FlowRepository;
import org.binddog.binddoghub.global.enums.NoneResponse;
import org.binddog.binddoghub.global.handler.AppException;
import org.binddog.binddoghub.global.response.SuccessResponse;
import org.binddog.binddoghub.project.service.ProjectService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.binddog.binddoghub.global.enums.ErrorCode.PROJECT_INVALID;
import static org.binddog.binddoghub.global.enums.NoneResponse.NONE;
import static org.binddog.binddoghub.global.enums.SuccessCode.DELETE_FLOW_SUCCESS;
import static org.binddog.binddoghub.global.enums.SuccessCode.REGISTER_FLOW_SUCCESS;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class FlowServiceTest {

    @InjectMocks
    private FlowServiceImpl flowService;

    @Mock
    private FlowMapper flowMapper;

    @Mock
    private FlowRepository flowRepository;

    @Mock
    private ProjectService projectService;

    @Test
    @DisplayName("Flow creation test successful")
    void createFlowTestSuccess() {
        //given
        Long memberId = 1L;
        Long projectId = 1L;
        String flowId = "672c53c0eee0f75c9435aba0";

        FlowCreateReq request = mock(FlowCreateReq.class);

        Flow flow = mock(Flow.class);

        //when
        when(flowMapper.toNewFlow(projectId, request)).thenReturn(flow);
        when(flowRepository.save(any(Flow.class))).thenReturn(flow);
        when(flow.getFlowId()).thenReturn(flowId);
        when(projectService.existsByIdAndMemberId(projectId, memberId)).thenReturn(true);

        SuccessResponse<FlowCreateRes> response = flowService.createFlow(memberId, projectId, request);

        //then
        assertThat(response.successCode()).isEqualTo(REGISTER_FLOW_SUCCESS);
        assertThat(response.data()).isInstanceOf(FlowCreateRes.class);
        assertThat(response.data().flowId()).isEqualTo(flowId);

        verify(flowRepository, times(1)).save(any(Flow.class));
        verify(flowMapper, times(1)).toNewFlow(any(Long.class), any(FlowCreateReq.class));
    }


    @Test
    @DisplayName("Flow creation test failed")
    void createFlowTestFail() {
        //given
        Long memberId = 1L;
        Long projectId = 1L;

        FlowCreateReq request = mock(FlowCreateReq.class);

        //when
        when(projectService.existsByIdAndMemberId(projectId, memberId)).thenReturn(false);

        //then
        assertThatThrownBy(() -> flowService.createFlow(memberId, projectId, request))
                .isInstanceOf(AppException.class)
                .hasMessage(PROJECT_INVALID.getMessage());

        verify(projectService, times(1))
                .existsByIdAndMemberId(any(Long.class), any(Long.class));
        verify(flowRepository, never()).save(any(Flow.class));
        verify(flowMapper, never()).toNewFlow(any(Long.class), any(FlowCreateReq.class));
    }

    @Test
    @DisplayName("Flow update(save) test successful")
    void saveFlowTestSuccess() {
        //given
        Long memberId = 1L;
        Long projectId = 1L;
        String flowId = "672c53c0eee0f75c9435aba0";
        FlowRegisterReq request = mock(FlowRegisterReq.class);

        Flow oldFlow = Flow.builder()
                           .flowId(flowId)
                           .title("Project Title")
                           .description("Project Description")
                           .build();

        Flow flow = mock(Flow.class);

        //when
        when(flowMapper.toFlow(projectId, flowId, request)).thenReturn(flow);
        when(flowRepository.save(any(Flow.class))).thenReturn(flow);
        when(projectService.existsByIdAndMemberId(projectId, memberId)).thenReturn(true);

        SuccessResponse<NoneResponse> response = flowService.saveFlow(memberId, projectId, flowId, request);

        //then
        assertThat(response.successCode()).isEqualTo(REGISTER_FLOW_SUCCESS);
        assertThat(response.data()).isInstanceOf(NoneResponse.class);
        assertThat(response.data().getMessage()).isEqualTo(NONE.getMessage());

        verify(flowRepository, times(1)).save(any(Flow.class));
        verify(flowMapper, times(1)).toFlow(projectId,flowId, request);
    }

    @Test
    @DisplayName("Flow update(save) test failed")
    void saveFlowTestFail() {
        //given
        Long memberId = 1L;
        Long projectId = 1L;
        String flowId = "672c53c0eee0f75c9435aba0";
        FlowRegisterReq request = mock(FlowRegisterReq.class);

        //when
        when(projectService.existsByIdAndMemberId(projectId, memberId)).thenReturn(false);

        //then
        assertThatThrownBy(() -> flowService.saveFlow(memberId, projectId, flowId, request))
                .isInstanceOf(AppException.class)
                .hasMessage(PROJECT_INVALID.getMessage());

        verify(projectService, times(1))
                .existsByIdAndMemberId(any(Long.class), any(Long.class));
        verify(flowRepository, never()).save(any(Flow.class));
        verify(flowMapper, never()).toFlow(projectId,flowId, request);

    }

    @Test
    @DisplayName("Flow deletaion test successful")
    void deleteFlowTestSuccess() {
        //given
        Long memberId = 1L;
        Long projectId = 1L;
        String flowId = "672c53c0eee0f75c9435aba0";

        //when
        when(projectService.existsByIdAndMemberId(projectId, memberId)).thenReturn(true);

        //then
        SuccessResponse<NoneResponse> response
                = flowService.deleteFlow(memberId, projectId, flowId);

        assertThat(response.successCode()).isEqualTo(DELETE_FLOW_SUCCESS);
        assertThat(response.data()).isInstanceOf(NoneResponse.class);
        assertThat(response.data().getMessage()).isEqualTo(NONE.getMessage());

        verify(flowRepository, times(1)).deleteByProjectIdAndFlowId(projectId, flowId);
        verify(projectService, times(1)).existsByIdAndMemberId(projectId, memberId);
    }

    @Test
    @DisplayName("Flow deletaion test failed")
    void deleteFlowTestFail() {
        //given
        Long memberId = 1L;
        Long projectId = 1L;
        String flowId = "672c53c0eee0f75c9435aba0";

        //when
        when(projectService.existsByIdAndMemberId(projectId, memberId)).thenReturn(false);

        //then
        assertThatThrownBy(() -> flowService.deleteFlow(memberId, projectId, flowId))
                .isInstanceOf(AppException.class)
                .hasMessage(PROJECT_INVALID.getMessage());

        verify(projectService, times(1)).existsByIdAndMemberId(projectId, memberId);
        verify(flowRepository, never()).deleteByProjectIdAndFlowId(projectId, flowId);
    }
}