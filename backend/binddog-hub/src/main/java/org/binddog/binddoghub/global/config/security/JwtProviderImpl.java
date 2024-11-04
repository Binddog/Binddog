package org.binddog.binddoghub.global.config.security;

import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;

import org.binddog.binddoghub.global.dto.Tokens;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtProviderImpl implements JwtProvider {

	private static final long ACCESS_TOKEN_EXPIRED_TIME = 1000L * 60 * 60;
	private static final long REFRESH_TOKEN_EXPIRED_TIME = 1000L * 60 * 60 * 24 * 7;

	@Value("${JWT_SECRET_KEY}") //TODO: 환경변수에 이거 추가하기
	private String SIGNING_KEY;

	@Override
	public Tokens generateTokens(Long memberId) {
		return Tokens.builder()
					 .memberId(memberId)
					 .accessToken(generateAccessToken(memberId))
					 .refreshToken(generateRefreshToken(memberId))
					 .ttl(REFRESH_TOKEN_EXPIRED_TIME)
					 .build();
	}

	@Override
	public long parseUserId(String refreshToken) {
		return Long.parseLong(extractClaim(refreshToken, Claims::getSubject));
	}

	private String generateAccessToken(Long memberId) {
		return generateToken(new HashMap<>(), memberId, ACCESS_TOKEN_EXPIRED_TIME);
	}

	private String generateRefreshToken(Long memberId) {
		return generateToken(new HashMap<>(), memberId, REFRESH_TOKEN_EXPIRED_TIME);
	}

	private String generateToken(Map<String, Object> claims, Long memberId, long expiredTime) {
		Date now = new Date();
		String compact = Jwts.builder()
							 .claims(claims)
							 .subject(String.valueOf(memberId))
							 .issuedAt(now)
							 .expiration(new Date(now.getTime() + expiredTime))
							 .signWith(getKey())
							 .compact();
		return compact;
	}

	private <T> T extractClaim(String token, Function<Claims, T> claimsResolvers) {
		final Claims claims = extractAllClaims(token);
		return claimsResolvers.apply(claims);
	}

	private Date extractExpiration(String token) {
		return extractClaim(token, Claims::getExpiration);
	}

	private Claims extractAllClaims(String token) {
		return Jwts.parser()
				   .verifyWith(getKey())
				   .build()
				   .parseSignedClaims(token)
				   .getPayload();
	}

	private SecretKey getKey() {
		String encoded = Base64.getEncoder()
							   .encodeToString(SIGNING_KEY.getBytes());
		return Keys.hmacShaKeyFor(encoded.getBytes());
	}
}
