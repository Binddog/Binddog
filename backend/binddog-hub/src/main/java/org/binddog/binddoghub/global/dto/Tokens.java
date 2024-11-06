package org.binddog.binddoghub.global.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;
import org.springframework.data.redis.core.index.Indexed;

@Getter
@RedisHash("token")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Tokens {

	@Id
	private Long memberId;

	@Indexed
	private String accessToken;

	@Indexed
	private String refreshToken;

	@TimeToLive
	private Long ttl;

	@Builder
	public Tokens(Long memberId, String accessToken, String refreshToken, Long ttl) {
		this.memberId = memberId;
		this.accessToken = accessToken;
		this.refreshToken = refreshToken;
		this.ttl = ttl;
	}

}
