package org.binddog.binddoghub.auth.service;

import org.binddog.binddoghub.auth.dto.AuthResponse;
import org.binddog.binddoghub.auth.dto.LoginRequest;
import org.binddog.binddoghub.auth.dto.RefreshRequest;
import org.binddog.binddoghub.global.dto.Tokens;
import org.binddog.binddoghub.global.enums.NoneResponse;
import org.binddog.binddoghub.global.response.SuccessResponse;

public interface AuthService {
	SuccessResponse<AuthResponse> login(LoginRequest request);

	SuccessResponse<NoneResponse> logout(String header);

	SuccessResponse<AuthResponse> refreshTokens(RefreshRequest request);
}
