package org.binddog.binddoghub.domain.auth.controller;

import org.binddog.binddoghub.domain.auth.dto.LoginRequest;
import org.binddog.binddoghub.domain.auth.service.AuthService;
import org.binddog.binddoghub.global.dto.Tokens;
import org.binddog.binddoghub.global.enums.NoneResponse;
import org.binddog.binddoghub.global.response.Response;
import org.binddog.binddoghub.global.response.SuccessResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auths")
@RequiredArgsConstructor
public class AuthController {

	private final AuthService authService;

	@PostMapping("/login")
	public ResponseEntity<Response<Tokens>> login(@RequestBody LoginRequest request) {
		SuccessResponse<Tokens> response = authService.login(request);
		return Response.success(response);
	}

	@PostMapping("/logout")
	public ResponseEntity<Response<NoneResponse>> logout(
			@RequestHeader("Authorization") String header
	) {
		SuccessResponse<NoneResponse> response = authService.logout(header);
		return Response.success(response);
	}

	@PostMapping("/refresh")
	public ResponseEntity<Response<Tokens>> refreshTokens(
			@RequestBody Tokens tokens
	) {
		SuccessResponse<Tokens> response = authService.refreshTokens(tokens);
		return Response.success(response);
	}

}
