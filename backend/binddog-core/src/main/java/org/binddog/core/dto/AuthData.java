package org.binddog.core.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AuthData {

	@JsonProperty("accessToken")
	private String accessToken;

	@JsonProperty("refreshToken")
	private String refreshToken;

	public String getAccessToken() {
		return accessToken;
	}

	public void setAccessToken(String accessToken) {
		this.accessToken = accessToken;
	}

	public String getRefreshToken() {
		return refreshToken;
	}

	public void setRefreshToken(String refreshToken) {
		this.refreshToken = refreshToken;
	}

	@Override
	public String toString() {
		return "AuthData{" +
				"accessToken='" + accessToken + '\'' +
				", refreshToken='" + refreshToken + '\'' +
				'}';
	}
}
