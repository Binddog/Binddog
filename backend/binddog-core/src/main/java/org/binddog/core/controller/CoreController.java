package org.binddog.core.controller;

import java.util.HashMap;
import java.util.Map;

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
	private String email = "jinniek48@gmail.com";

	private String password = "Password1!";

	private String loginUrl = "https://api.binddog.org/api/auths/login" ;

	private final RestTemplate restTemplate = new RestTemplate();

	@GetMapping("/")
	public ResponseEntity<?> login() {
		HttpHeaders headers = new HttpHeaders();
		headers.set("Content-Type", "application/json");
		Map<String, String> requestBody = new HashMap<>();
		requestBody.put("email", email);
		requestBody.put("password", password);
		HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(requestBody, headers);
		ResponseEntity<String> responseEntity = restTemplate.exchange(
				loginUrl,
				HttpMethod.POST,
				requestEntity,
				String.class
		);

		return ResponseEntity.status(responseEntity.getStatusCode()).body(responseEntity.getBody());
	}

}
