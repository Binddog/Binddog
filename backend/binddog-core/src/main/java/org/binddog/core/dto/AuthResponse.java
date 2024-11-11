package org.binddog.core.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AuthResponse {

	@JsonProperty("resultCode")
	private String resultCode;

	@JsonProperty("code")
	private String code;

	@JsonProperty("message")
	private String message;

	@JsonProperty("data")
	private AuthData data;

	public String getResultCode() {
		return resultCode;
	}

	public void setResultCode(String resultCode) {
		this.resultCode = resultCode;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public AuthData getData() {
		return data;
	}

	public void setData(AuthData data) {
		this.data = data;
	}

	@Override
	public String toString() {
		return "AuthResponse{" +
				"resultCode='" + resultCode + '\'' +
				", code='" + code + '\'' +
				", message='" + message + '\'' +
				", data=" + data +
				'}';
	}
}