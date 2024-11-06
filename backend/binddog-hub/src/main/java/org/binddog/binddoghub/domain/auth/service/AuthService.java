package org.binddog.binddoghub.domain.auth.service;

import org.binddog.binddoghub.domain.auth.dto.LoginRequest;
import org.binddog.binddoghub.global.dto.Tokens;
import org.binddog.binddoghub.global.enums.NoneResponse;
import org.binddog.binddoghub.global.response.SuccessResponse;

public interface AuthService {
	SuccessResponse<Tokens> login(LoginRequest request);

	SuccessResponse<NoneResponse> logout(String header);

	SuccessResponse<Tokens> refreshTokens(Tokens tokens);
}
