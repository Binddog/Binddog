package org.binddog.core.controller;

import org.binddog.core.dto.AuthData;
import org.binddog.core.service.CoreService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/binddog/core")
public class CoreController {

	private final CoreService coreService;

	public CoreController(CoreService coreService) {
		this.coreService = coreService;
	}

	@GetMapping("/")
	public ResponseEntity<?> login() {
		AuthData authData = coreService.login();
		return ResponseEntity.ok(authData);
	}

}