package org.binddog.binddoghub.global.config.security;

import static org.binddog.binddoghub.global.enums.ErrorCode.*;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.binddog.binddoghub.global.config.security.filter.AppExceptionFilter;
import org.binddog.binddoghub.global.config.security.filter.JwtTokenFilter;
import org.binddog.binddoghub.global.enums.ErrorCode;
import org.binddog.binddoghub.global.handler.AppException;
import org.binddog.binddoghub.global.handler.CustomAccessDeniedHandler;
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

import com.fasterxml.jackson.databind.ObjectMapper;

@Slf4j
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
	public static final String[] AUTHENTICATED_PATHS = {
			"/api/auths/logout",
			"/api/projects/**"
	};

	public static final String[] PUBLIC_PATHS = {
			"/api/auth/login",
			"/api/members/sign-up"
	};

	private final MemberRepository memberRepository;
	private final JwtTokenFilter jwtTokenFilter;
	private final AppExceptionFilter appExceptionFilter;
	private final ObjectMapper objectMapper;

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
					   .authorities(Collections.emptyList())
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
						.requestMatchers(AUTHENTICATED_PATHS).authenticated()
						.anyRequest().permitAll()
				)
				.exceptionHandling(handler -> handler
						.authenticationEntryPoint(authenticationEntryPoint())
				)
				.addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class)
				.addFilterBefore(appExceptionFilter, JwtTokenFilter.class)
				.build();
	}

	@Bean
	public AuthenticationEntryPoint authenticationEntryPoint() {
		return (request, response, authException) -> {
			ErrorCode errorCode;
			Throwable cause = authException.getCause();
			if (cause instanceof AppException) {
				errorCode = ((AppException) cause).getErrorCode();
				log.error("Authentication failed with AppException: {}", errorCode);
			} else {
				errorCode = ErrorCode.AUTHENTICATION_FAILED;  // 새로운 ErrorCode 추가 필요
				log.error("Unexpected authentication error: {}", authException.getMessage());
			}

			Response<Void> errorResponse = Response.error(errorCode, null);
			response.setStatus(HttpStatus.UNAUTHORIZED.value());
			response.setContentType("application/json;charset=UTF-8");
			response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
		};
	}

}