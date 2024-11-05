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
			// 공개 경로는 인증 없이 통과
			if (isPublicPath(request.getRequestURI())) {
				filterChain.doFilter(request, response);
				return;
			}

			// 인증이 필요한 경로인 경우 토큰 검증
			if (isAuthenticatedPath(request.getRequestURI())) {
				String token = extractToken(request);
				if (token != null) {
					processAuthentication(request, token);
				} else {
					throw new AppException(ErrorCode.TOKEN_INVALID);
				}
			}

			filterChain.doFilter(request, response);
		} catch (AppException e) {
			throw new AppException(ErrorCode.TOKEN_INVALID);
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
		Long userId = jwtProvider.parseUserId(token);

		// Redis에서 로그아웃된 토큰인지 확인
		redisRepository.findByAccessToken(token);  // 로그아웃된 토큰이면 예외 발생

		// 토큰 유효성 검증
		if (!jwtProvider.isValid(token, userId)) {
			throw new AppException(ErrorCode.TOKEN_INVALID);
		}

		// 인증 정보 설정
		Member member = memberRepository.findById(userId)
										.orElseThrow(() -> new AppException(ErrorCode.TOKEN_INVALID));

		SecurityContext context = SecurityContextHolder.createEmptyContext();
		UsernamePasswordAuthenticationToken authentication =
				new UsernamePasswordAuthenticationToken(
						userId,
						null,
						Collections.emptyList()  // 권한 없이 인증만 표시
				);

		authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
		context.setAuthentication(authentication);
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
