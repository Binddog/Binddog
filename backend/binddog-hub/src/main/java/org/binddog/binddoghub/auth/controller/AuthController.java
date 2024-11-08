package org.binddog.binddoghub.auth.controller;

import org.binddog.binddoghub.auth.dto.AuthResponse;
import org.binddog.binddoghub.auth.dto.LoginRequest;
import org.binddog.binddoghub.auth.dto.RefreshRequest;
import org.binddog.binddoghub.auth.service.AuthService;
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
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/auths")
@RequiredArgsConstructor
public class AuthController {

	private final AuthService authService;

	@PostMapping("/login")
	public ResponseEntity<Response<AuthResponse>> login(@RequestBody LoginRequest request) {
		SuccessResponse<AuthResponse> response = authService.login(request);
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
	public ResponseEntity<Response<AuthResponse>> refreshTokens(
			@RequestBody RefreshRequest request
	) {
		log.info("Refresh request: {}", request);
		SuccessResponse<AuthResponse> response = authService.refreshTokens(request);
		return Response.success(response);
	}

}
