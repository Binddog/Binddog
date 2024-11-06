package org.binddog.binddoghub.flow.controller;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.binddog.binddoghub.flow.dto.req.FlowCreateReq;
import org.binddog.binddoghub.flow.dto.req.FlowRegisterReq;
import org.binddog.binddoghub.flow.dto.res.FlowCreateRes;
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
            @PathVariable String flowId
    ) {
        SuccessResponse<NoneResponse> response = new SuccessResponse<>(GET_FLOW_SUCCESS, NoneResponse.NONE);
        return Response.success(response);
    }

    @Operation(
            summary = "Create flow",
            description = "Create a new flow."
    )
    @PostMapping("/{projectId}/flows")
    public ResponseEntity<Response<FlowCreateRes>> createFlow(
            @PathVariable Long projectId,
            @RequestBody FlowCreateReq flowCreateReq
    ) {
        log.info(flowCreateReq.toString());
        SuccessResponse<FlowCreateRes> response = flowService.createFlow(projectId, flowCreateReq);
        log.info("Create Flow Success : [{}]", projectId);
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
        log.info(flowRegisterReq.toString());
        SuccessResponse<NoneResponse> response = flowService.saveFlow(projectId, flowId, flowRegisterReq);
        log.info("OverWrite Flow Success : [{}]", projectId);
        return Response.success(response);
    }

    @Operation(
            summary = "Delete flow",
            description = "Delete the flow."
    )
    @DeleteMapping("/{projectId}/flows/{flowId}")
    public ResponseEntity<Response<NoneResponse>> deleteFlow(
            @PathVariable Long projectId,
            @PathVariable String flowId
    ) {
        SuccessResponse<NoneResponse> response = flowService.deleteFlow(projectId, flowId);
        return Response.success(response);
    }


}
