package org.binddog.binddoghub.flow.service;

import org.binddog.binddoghub.flow.dto.req.FlowCreateReq;
import org.binddog.binddoghub.flow.dto.req.FlowRegisterReq;
import org.binddog.binddoghub.flow.dto.res.FlowCreateRes;
import org.binddog.binddoghub.global.enums.NoneResponse;
import org.binddog.binddoghub.global.response.SuccessResponse;

public interface FlowService {

    SuccessResponse<FlowCreateRes> saveFlow(final Long projectId, FlowCreateReq flowCreateReq);

    SuccessResponse<NoneResponse> loadFlow(final Long projectId, final String flowId, final FlowRegisterReq flowRegisterReq);

    SuccessResponse<NoneResponse> updateFlow(final Long projectId, final String flowId, final FlowRegisterReq flowRegisterReq);

    SuccessResponse<NoneResponse> deleteFlow(final Long projectId, final String flowId);
}
