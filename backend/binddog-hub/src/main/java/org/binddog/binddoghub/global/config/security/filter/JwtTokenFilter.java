package org.binddog.binddoghub.global.config.security.filter;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;

import org.binddog.binddoghub.global.config.security.JwtProvider;
import org.binddog.binddoghub.global.enums.ErrorCode;
import org.binddog.binddoghub.global.handler.AppException;
import org.binddog.binddoghub.global.repository.RedisRepository;
import org.binddog.binddoghub.member.entity.Member;
import org.binddog.binddoghub.member.repository.MemberRepository;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtTokenFilter extends OncePerRequestFilter {

	private static final String HEADER_PREFIX = "Bearer ";
	private static final int TOKEN_SPLIT_INDEX = 7;

	// 인증이 필요한 URL 패턴들
	private static final String[] AUTHENTICATED_PATHS = {
			"/api/auths/logout",
			"/api/projects/",
			"/api/projects/{projectId}/flows",
			"/api/projects/{projectId}/flows/{flowId}"
	};

	// 인증이 필요없는 URL 패턴들
	private static final String[] PUBLIC_PATHS = {
			"/api/auth/login",
			"/api/members/sign-up",
	};

	private final JwtProvider jwtProvider;
	private final MemberRepository memberRepository;
	private final RedisRepository redisRepository;

	@Override
	protected void doFilterInternal(
			HttpServletRequest request,
			HttpServletResponse response,
			FilterChain filterChain
	) throws ServletException, IOException {

		try {
			if (isPublicPath(request.getRequestURI())) {
				log.info("publicPath access granted");
				filterChain.doFilter(request, response);
				return;
			}

			if (isAuthenticatedPath(request.getRequestURI())) {
				log.info("AuthenticatedPath access checking...");

				String token = extractToken(request);
				if (token != null) {
					processAuthentication(request, token);
					log.info("AuthenticatedPath access granted");
				} else {
					log.error("AuthenticatedPath access denied");
					throw new AppException(ErrorCode.TOKEN_INVALID);
				}
			}

			log.info("filter processing...");
			filterChain.doFilter(request, response);
			log.info("filter process finished");
		} catch (AppException e) {
			log.info("filter throws AppException ({})", e.getMessage());
			throw new AppException(ErrorCode.TOKEN_INVALID);
		} catch (Exception e) {
			log.info("error");
		}
	}

	private String extractToken(HttpServletRequest request) {
		String header = request.getHeader(HttpHeaders.AUTHORIZATION);
		if (header != null && header.startsWith(HEADER_PREFIX)) {
			return header.substring(TOKEN_SPLIT_INDEX);
		}
		return null;
	}

	private void processAuthentication(HttpServletRequest request, String token) {
		Long memberId;
		try {
			memberId = jwtProvider.parseUserId(token);
		} catch (Exception e) {
			log.error("Failed to parse user ID from token: {}", token, e);
			throw new AppException(ErrorCode.TOKEN_INVALID);
		}

		try {
			redisRepository.findByAccessToken(token);
			log.info("Token found in Redis: {}", token);
		} catch (Exception e) {
			log.warn("Token not found in Redis or token is expired: {}", token);
			throw new AppException(ErrorCode.TOKEN_NOT_FOUND);
		}

		// 토큰 유효성 검증
		if (!jwtProvider.isValid(token, memberId)) {
			throw new AppException(ErrorCode.TOKEN_INVALID);
		}
		log.info("Token valid: {}", token);

		// 인증 정보 설정
		Member member = memberRepository.findById(memberId)
										.orElseThrow(() -> new AppException(ErrorCode.MEMBER_NOT_FOUND));
		log.info("matching member in DB: {}", member);

		SecurityContext context = SecurityContextHolder.createEmptyContext();
		UsernamePasswordAuthenticationToken authentication =
				new UsernamePasswordAuthenticationToken(
						memberId,
						null,
						Collections.emptyList()
				);

		authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
		context.setAuthentication(authentication);

		log.info("SecurityContext: {}", context);

		SecurityContextHolder.setContext(context);
	}

	private boolean isPublicPath(String uri) {
		return Arrays.stream(PUBLIC_PATHS)
					 .anyMatch(uri::startsWith);
	}

	private boolean isAuthenticatedPath(String uri) {
		return Arrays.stream(AUTHENTICATED_PATHS)
					 .anyMatch(uri::startsWith);
	}
}
