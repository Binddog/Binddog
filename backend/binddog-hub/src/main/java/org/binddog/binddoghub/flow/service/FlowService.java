package org.binddog.binddoghub.flow.service;

import org.binddog.binddoghub.flow.dto.req.FlowCreateReq;
import org.binddog.binddoghub.flow.dto.req.FlowRegisterReq;
import org.binddog.binddoghub.flow.dto.res.FlowCreateRes;
import org.binddog.binddoghub.flow.dto.res.FlowSearchRes;
import org.binddog.binddoghub.flow.dto.res.FlowsSearchRes;
import org.binddog.binddoghub.global.enums.NoneResponse;
import org.binddog.binddoghub.global.response.SuccessResponse;

public interface FlowService {

    SuccessResponse<FlowCreateRes> createFlow(final Long memberId, final Long projectId, FlowCreateReq flowCreateReq);

    SuccessResponse<FlowsSearchRes> loadFlows(final Long memberId, final Long projectId);

    SuccessResponse<FlowSearchRes> loadFlow(final Long memberId, final Long projectId, final String flowId);

    SuccessResponse<NoneResponse> saveFlow(final Long memberId, final Long projectId, final String flowId, FlowRegisterReq flowRegisterReq);

    SuccessResponse<NoneResponse> deleteFlow(final Long memberId, final Long projectId, final String flowId);
}
