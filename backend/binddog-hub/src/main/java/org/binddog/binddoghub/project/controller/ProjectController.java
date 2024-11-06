package org.binddog.binddoghub.project.controller;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.binddog.binddoghub.global.enums.NoneResponse;
import org.binddog.binddoghub.global.response.Response;
import org.binddog.binddoghub.global.response.SuccessResponse;
import org.binddog.binddoghub.project.dto.req.ProjectCreateReq;
import org.binddog.binddoghub.project.dto.res.ProjectSearchRes;
import org.binddog.binddoghub.project.service.ProjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/projects")
public class ProjectController {

    private final ProjectService projectService;

    @Operation(
            summary = "View project list",
            description = "View all of a user's projects."
    )
    @GetMapping
    public ResponseEntity<Response<List<ProjectSearchRes>>> getProjects(
            @AuthenticationPrincipal Long memberId
    ) {
        SuccessResponse<List<ProjectSearchRes>> response
                = projectService.getProjects(memberId);
        return Response.success(response);
    }

    @Operation(
            summary = "Create project",
            description = "Create a new project."
    )
    @PostMapping
    public ResponseEntity<Response<NoneResponse>> createProject(
            @RequestBody @Valid ProjectCreateReq request,
            @AuthenticationPrincipal Long memberId
    ) {
        SuccessResponse<NoneResponse> response
                = projectService.createProject(memberId, request);
        return Response.success(response);
    }

}
