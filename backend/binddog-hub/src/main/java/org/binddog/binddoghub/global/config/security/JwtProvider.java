package org.binddog.binddoghub.global.config.security;

import org.binddog.binddoghub.global.dto.Tokens;

public interface JwtProvider {
	Tokens generateTokens(Long memberId);
	boolean isValid(String token, Long userId);
	long parseUserId(String refreshToken);
}
