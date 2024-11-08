package org.binddog.binddoghub.auth.dto;

import lombok.Builder;

@Builder
public record LoginRequest(
		String email,
		String password
) {
}
