package org.binddog.binddoghub.global.config.security;

import static org.binddog.binddoghub.global.enums.ErrorCode.*;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

import org.binddog.binddoghub.global.config.security.filter.AppExceptionFilter;
import org.binddog.binddoghub.global.config.security.filter.JwtTokenFilter;
import org.binddog.binddoghub.global.enums.ErrorCode;
import org.binddog.binddoghub.global.handler.AppException;
import org.binddog.binddoghub.global.response.Response;
import org.binddog.binddoghub.member.entity.Member;
import org.binddog.binddoghub.member.repository.MemberRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
	private static final String[] AUTHENTICATED_PATHS = {
			"/api/auths/logout",
			"/api/projects/**"
	};

	private static final String[] PUBLIC_PATHS = {
			"/api/auth/login",
			"/api/members/sign-up"
	};

	private final MemberRepository memberRepository;
	private final JwtTokenFilter jwtTokenFilter;
	private final AppExceptionFilter appExceptionFilter;

	@Bean
	public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
		AuthenticationManagerBuilder authenticationManagerBuilder =
				http.getSharedObject(AuthenticationManagerBuilder.class);
		authenticationManagerBuilder.authenticationProvider(authenticationProvider());
		return authenticationManagerBuilder.build();
	}

	@Bean
	AuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
		authenticationProvider.setUserDetailsService(userDetailsService());
		authenticationProvider.setPasswordEncoder(passwordEncoder());
		return authenticationProvider;
	}

	@Bean
	public UserDetailsService userDetailsService() {
		return username -> {
			Member member = memberRepository.findByEmail(username)
											.orElseThrow(() -> new AppException(MEMBER_NOT_FOUND));

			return User.builder()
					   .username(member.getEmail())
					   .password(member.getPassword())
					   .authorities(Collections.emptyList())  // roles 대신 빈 authorities 사용
					   .build();
		};
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		return http
				.csrf(AbstractHttpConfigurer::disable)
				.formLogin(AbstractHttpConfigurer::disable)
				.httpBasic(AbstractHttpConfigurer::disable)
				.sessionManagement(sessionManagement ->
						sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
				)
				.authorizeHttpRequests(authorize -> authorize
						.requestMatchers(PUBLIC_PATHS).permitAll()
						.requestMatchers(AUTHENTICATED_PATHS).authenticated()
						.anyRequest().anonymous()  // 나머지는 비로그인 사용자만 접근 가능
				)
				.exceptionHandling(handler ->
						handler.authenticationEntryPoint(new JwtAuthenticationEntryPoint())
				)
				.addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class)
				.addFilterBefore(appExceptionFilter, JwtTokenFilter.class)
				.build();
	}

	private class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {
		@Override
		public void commence(HttpServletRequest request,
				HttpServletResponse response,
				AuthenticationException authException) throws IOException {
			response.setStatus(HttpStatus.UNAUTHORIZED.value());
			response.setContentType("application/json;charset=UTF-8");

			// AUTHENTICATED_PATHS에 해당하는 경로인 경우
			if (isAuthenticatedPath(request.getRequestURI())) {
				response.getWriter().write(
						"{\"error\": \"로그인이 필요한 서비스입니다.\", " +
								"\"status\": 401, " +
								"\"path\": \"" + request.getRequestURI() + "\"}"
				);
			} else {
				// 비로그인 사용자만 접근 가능한 경로에 로그인 사용자가 접근한 경우
				response.setStatus(HttpStatus.FORBIDDEN.value());
				response.getWriter().write(
						"{\"error\": \"로그인하지 않은 사용자만 접근 가능합니다.\", " +
								"\"status\": 403, " +
								"\"path\": \"" + request.getRequestURI() + "\"}"
				);
			}
		}

		private boolean isAuthenticatedPath(String uri) {
			return Arrays.stream(AUTHENTICATED_PATHS)
						 .anyMatch(uri::startsWith);
		}
	}
}