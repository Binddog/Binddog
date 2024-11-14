package org.binddog.binddoghub.global.utils;

import java.io.IOException;

import org.binddog.binddoghub.global.enums.ErrorCode;
import org.binddog.binddoghub.global.enums.NoneResponse;
import org.binddog.binddoghub.global.response.Response;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletResponse;

public class JsonResponseUtils {
	private static final String CONTENT_TYPE = "application/json";
	private static final String CHARACTER_ENCODING = "UTF-8";

	public static void writeHttpErrorResponse(HttpServletResponse response, ErrorCode errorCode) throws IOException {
		response.setStatus(errorCode.getHttpStatus().value());
		response.setContentType(CONTENT_TYPE);
		response.setCharacterEncoding(CHARACTER_ENCODING);
		Response<NoneResponse> errorResponse = Response.error(errorCode, NoneResponse.NONE);
		ObjectMapper mapper = new ObjectMapper();
		String json = mapper.writeValueAsString(errorResponse);
		response.getWriter().write(json);
	}
}