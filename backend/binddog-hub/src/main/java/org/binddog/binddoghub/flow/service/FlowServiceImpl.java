package org.binddog.binddoghub.flow.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
import org.springframework.stereotype.Service;

import static org.binddog.binddoghub.global.enums.ErrorCode.PROJECT_INVALID;
import static org.binddog.binddoghub.global.enums.SuccessCode.DELETE_FLOW_SUCCESS;
import static org.binddog.binddoghub.global.enums.SuccessCode.REGISTER_FLOW_SUCCESS;

@Slf4j
@Service
@RequiredArgsConstructor
public class FlowServiceImpl implements FlowService {

    private final FlowMapper flowMapper;
    private final FlowRepository flowRepository;
    private final ProjectService projectService;

    @Override
    public SuccessResponse<FlowCreateRes> createFlow(
            final Long memberId,
            final Long projectId,
            final FlowCreateReq flowCreateReq
    ) {
        projectIdAndMemberIdValidation(projectId, memberId);

        Flow flow = flowMapper.toNewFlow(projectId, flowCreateReq);
        flowRepository.save(flow);

        FlowCreateRes response = FlowCreateRes.builder()
                                              .flowId(flow.getFlowId())
                                              .build();

        return new SuccessResponse<>(REGISTER_FLOW_SUCCESS, response);
    }

    @Override
    public SuccessResponse<NoneResponse> loadFlow(Long projectId, String flowId, FlowRegisterReq flowRegisterReq) {
        return null;
    }

    @Override
    public SuccessResponse<NoneResponse> saveFlow(
            final Long memberId,
            final Long projectId,
            final String flowId,
            FlowRegisterReq flowRegisterReq
    ) {
        projectIdAndMemberIdValidation(projectId, memberId);

        Flow flow = flowMapper.toFlow(projectId, flowId, flowRegisterReq);
        flowRepository.save(flow);
        return new SuccessResponse<>(REGISTER_FLOW_SUCCESS, NoneResponse.NONE);
    }

    @Override
    public SuccessResponse<NoneResponse> deleteFlow(
            final Long memberId,
            final Long projectId,
            final String flowId
    ) {
        projectIdAndMemberIdValidation(projectId, memberId);

        flowRepository.deleteByProjectIdAndFlowId(projectId, flowId);
        return new SuccessResponse<>(DELETE_FLOW_SUCCESS, NoneResponse.NONE);
    }

    private void projectIdAndMemberIdValidation(Long projectId, Long memberId) {
        boolean isExist = projectService.existsByIdAndMemberId(projectId, memberId);
        if (!isExist) {
            throw new AppException(PROJECT_INVALID);
        }
    }
}
