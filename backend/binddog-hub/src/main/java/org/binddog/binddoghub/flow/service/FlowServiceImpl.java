package org.binddog.binddoghub.flow.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.binddog.binddoghub.flow.document.Flow;
import org.binddog.binddoghub.flow.dto.req.FlowRegisterReq;
import org.binddog.binddoghub.flow.mapper.FlowMapper;
import org.binddog.binddoghub.flow.repository.FlowRepository;
import org.binddog.binddoghub.global.enums.NoneResponse;
import org.binddog.binddoghub.global.response.SuccessResponse;
import org.springframework.stereotype.Service;

import static org.binddog.binddoghub.global.enums.SuccessCode.REGISTER_FLOW_SUCCESS;

@Slf4j
@Service
@RequiredArgsConstructor
public class FlowServiceImpl implements FlowService {

    private final FlowMapper flowMapper;
    private final FlowRepository flowRepository;

    @Override
    public SuccessResponse<NoneResponse> updateFlow(
            final Long projectId,
            final String flowId,
            final FlowRegisterReq flowRegisterReq)
    {
        Flow flow = flowMapper.toFlow(projectId, flowId, flowRegisterReq);
        flowRepository.save(flow);
        return new SuccessResponse<>(REGISTER_FLOW_SUCCESS, NoneResponse.NONE);
    }
}
