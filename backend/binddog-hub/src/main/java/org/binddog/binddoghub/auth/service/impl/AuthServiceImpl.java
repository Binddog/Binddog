package org.binddog.binddoghub.auth.service.impl;

import static org.binddog.binddoghub.global.enums.ErrorCode.*;
import static org.binddog.binddoghub.global.enums.SuccessCode.*;

import org.binddog.binddoghub.auth.dto.AuthResponse;
import org.binddog.binddoghub.auth.dto.LoginRequest;
import org.binddog.binddoghub.auth.dto.RefreshRequest;
import org.binddog.binddoghub.auth.service.AuthService;
import org.binddog.binddoghub.global.config.security.JwtProvider;
import org.binddog.binddoghub.global.dto.Tokens;
import org.binddog.binddoghub.global.enums.ErrorCode;
import org.binddog.binddoghub.global.enums.NoneResponse;
import org.binddog.binddoghub.global.handler.AppException;
import org.binddog.binddoghub.global.repository.RedisRepository;
import org.binddog.binddoghub.global.response.SuccessResponse;
import org.binddog.binddoghub.member.entity.Member;
import org.binddog.binddoghub.member.repository.MemberRepository;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
	private static final int TOKEN_SPLIT_INDEX = 7;
	private final AuthenticationManager authenticationManager;
	private final JwtProvider jwtProvider;
	private final MemberRepository memberRepository;
	private final RedisRepository redisRepository;

	@Override
	public SuccessResponse<AuthResponse> login(LoginRequest request) {
		UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
				request.email(), request.password()
		);
		authenticationManager.authenticate(token);

		Long memberId = getByEmail(request.email()).getId();
		Tokens tokens = jwtProvider.generateTokens(memberId);
		redisRepository.save(tokens);
		log.info("Tokens saved to Redis: " + redisRepository.findByAccessToken(tokens.getAccessToken()));

		return new SuccessResponse<>(LOGIN_SUCCESS, new AuthResponse(tokens.getAccessToken(), tokens.getRefreshToken()));
	}

	@Override
	public SuccessResponse<NoneResponse> logout(String header) {
		log.info("Header: " + header);
		String accessToken = header.substring(TOKEN_SPLIT_INDEX);
		log.info("Access token: " + accessToken);
		log.info("Tokens exist in db: " + redisRepository.findByAccessToken(accessToken));
		redisRepository.deleteByAccessToken(accessToken);
		log.info("Tokens exist in db: " + redisRepository.findByAccessToken(accessToken));
		return new SuccessResponse<>(LOGOUT_SUCCESS, NoneResponse.NONE);
	}

	@Override
	public SuccessResponse<AuthResponse> refreshTokens(RefreshRequest request) {
		log.info("enter the service layer");

		String accessToken = request.accessToken();
		String refreshToken = redisRepository.findByAccessToken(accessToken)
											 .getRefreshToken();
		if (!request.refreshToken()
				   .equals(refreshToken)) {
			log.error("Refresh token doesn't match: "+request.refreshToken()+" "+refreshToken);
			throw new AppException(TOKEN_INVALID);
		}

		redisRepository.deleteByAccessToken(accessToken);
		long memberId = jwtProvider.parseUserId(refreshToken);
		Tokens newTokens = jwtProvider.generateTokens(memberId);
		log.info("Succesfully generate new tokens: " + newTokens);

		redisRepository.save(newTokens);
		log.info("Updated tokens saved to Redis");

		log.info("back to the controller layer");
		return new SuccessResponse<>(AUTH_TOKEN_CHANGE_SUCCESS, new AuthResponse(newTokens.getAccessToken(),
				newTokens.getRefreshToken()));
	}

	private Member getByEmail(final String email) {
		return memberRepository.findByEmail(email)
							   .orElseThrow(
									   () -> new AppException(ErrorCode.MEMBER_NOT_FOUND)
							   );
	}

}
