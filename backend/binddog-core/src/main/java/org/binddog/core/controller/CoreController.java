package org.binddog.core.controller;

import java.util.HashMap;
import java.util.Map;

import org.binddog.core.dto.AuthData;
import org.binddog.core.dto.AuthResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/binddog/core")
public class CoreController {
	@Value("${binddog.hub.email}")
	private String email;

	@Value("${binddog.hub.password}")
	private String password;

	@Value("${binddog.hub.login-url}")
	private String loginUrl;

	private final RestTemplate restTemplate = new RestTemplate();

	@GetMapping("/")
	public ResponseEntity<?> login() {
		HttpHeaders headers = new HttpHeaders();
		headers.set("Content-Type", "application/json");

		Map<String, String> requestBody = new HashMap<>();
		requestBody.put("email", email);
		requestBody.put("password", password);
		HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(requestBody, headers);

		ResponseEntity<AuthResponse> responseEntity = restTemplate.exchange(
				loginUrl,
				HttpMethod.POST,
				requestEntity,
				AuthResponse.class
		);

		AuthData authData = responseEntity.getBody().getData();
		return ResponseEntity.status(responseEntity.getStatusCode()).body(authData);
	}

}