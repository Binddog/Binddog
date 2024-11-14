package org.binddog.binddoghub.member.controller;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.binddog.binddoghub.global.enums.NoneResponse;
import org.binddog.binddoghub.global.response.Response;
import org.binddog.binddoghub.global.response.SuccessResponse;
import org.binddog.binddoghub.member.dto.req.MemberRegisterReq;
import org.binddog.binddoghub.member.service.MemberService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;

    @Operation(
            summary = "Register Member",
            description = "Sign up for member"
    )
    @PostMapping("/sign-up")
    public ResponseEntity<Response<NoneResponse>> registerMember(
            @RequestBody @Valid MemberRegisterReq request)
    {
        SuccessResponse<NoneResponse> response = memberService.registerMember(request);
        return Response.success(response);
    }
}
