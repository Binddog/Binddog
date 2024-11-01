package org.binddog.binddoghub.flow.controller;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.binddog.binddoghub.flow.dto.req.FlowRegisterReq;
import org.binddog.binddoghub.flow.service.FlowService;
import org.binddog.binddoghub.global.enums.NoneResponse;
import org.binddog.binddoghub.global.response.Response;
import org.binddog.binddoghub.global.response.SuccessResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.binddog.binddoghub.global.enums.SuccessCode.GET_FLOW_SUCCESS;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/projects")
public class FlowController {

    private final FlowService flowService;

    @Operation(
            summary = "Load flow",
            description = "Load a saved flow."
    )
    @GetMapping("/{projectId}/flows/{flowId}")
    public ResponseEntity<Response<NoneResponse>> getFlow(
            @PathVariable Long projectId,
            @PathVariable Long flowId
    ) {
        SuccessResponse<NoneResponse> response = new SuccessResponse<>(GET_FLOW_SUCCESS, NoneResponse.NONE);
        return Response.success(response);
    }

    @Operation(
            summary = "Overwrite flow",
            description = "Overwrites any modifications made to the existing flow."
    )
    @PutMapping("/{projectId}/flows/{flowId}")
    public ResponseEntity<Response<NoneResponse>> overWriteFlow(
            @PathVariable Long projectId,
            @PathVariable String flowId,
            @RequestBody FlowRegisterReq flowRegisterReq
    ) {
        log.info("OverWrite Flow Success : [{}]", projectId);
        log.info(flowRegisterReq.toString());
        SuccessResponse<NoneResponse> response = flowService.updateFlow(projectId, flowId, flowRegisterReq);
        return Response.success(response);
    }
}
