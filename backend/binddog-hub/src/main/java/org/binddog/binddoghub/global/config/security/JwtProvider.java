package org.binddog.binddoghub.global.config.security;

import org.binddog.binddoghub.global.dto.Tokens;

public interface JwtProvider {
	Tokens generateTokens(Long memberId);

	long parseUserId(String refreshToken);
}
