package org.binddog.binddoghub.flow.service;

import org.binddog.binddoghub.flow.dto.req.FlowRegisterReq;
import org.binddog.binddoghub.global.enums.NoneResponse;
import org.binddog.binddoghub.global.response.SuccessResponse;

public interface FlowService {

    SuccessResponse<NoneResponse> updateFlow(final Long projectId, final String flowId, final FlowRegisterReq flowRegisterReq);
}
