package org.binddog.binddoghub.auth.dto;

import lombok.Builder;

@Builder
public record RefreshRequest(
	String accessToken,
	String refreshToken
) {
}
