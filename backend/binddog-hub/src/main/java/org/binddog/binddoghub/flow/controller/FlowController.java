package org.binddog.binddoghub.flow.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.binddog.binddoghub.global.enums.NoneResponse;
import org.binddog.binddoghub.global.response.Response;
import org.binddog.binddoghub.global.response.SuccessResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.binddog.binddoghub.global.enums.SuccessCode.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/projects/")
public class FlowController {

    @GetMapping("/{projectId}/flows/{flowId}")
    public ResponseEntity<Response<NoneResponse>> getFlow(
            @PathVariable Long projectId,
            @PathVariable Long flowId
    ){
        log.info("플로우 불러 오기 성공 {}", "/{projectId}/flows/{flowId}");
        SuccessResponse<NoneResponse> response = new SuccessResponse<>(GET_FLOW_SUCCESS, NoneResponse.NONE);
        return Response.success(response);
    }

    @PostMapping("/{projectId}/flows/{flowId}")
    public ResponseEntity<Response<NoneResponse>> registerFlow(
            @PathVariable Long projectId,
            @PathVariable Long flowId,
            @RequestParam String flow
    ){
        log.info("플로우 저장 성공 {}", "/{projectId}/flows/{flowId}");
        log.info(flow);
        SuccessResponse<NoneResponse> response = new SuccessResponse<>(REGISTER_FLOW_SUCCESS, NoneResponse.NONE);
        return Response.success(response);
    }
}
