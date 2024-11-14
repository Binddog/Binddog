package org.binddog.binddoghub.global.handler;

import static org.binddog.binddoghub.global.enums.ErrorCode.*;

import java.io.IOException;

import org.binddog.binddoghub.global.utils.JsonResponseUtils;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class CustomAccessDeniedHandler implements AccessDeniedHandler {
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response,
                       AccessDeniedException accessDeniedException) throws IOException, ServletException {
        JsonResponseUtils.writeHttpErrorResponse(response, ACCESS_DENIED);
    }
}
