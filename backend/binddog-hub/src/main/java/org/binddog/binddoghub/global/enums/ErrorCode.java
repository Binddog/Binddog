package org.binddog.binddoghub.global.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ErrorCode implements ResponseCode {

    //Auth Error code
    MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, "Member not found."),
    TOKEN_INVALID(HttpStatus.UNAUTHORIZED, "Invalid or expired token."),
    TOKEN_NOT_FOUND(HttpStatus.NOT_FOUND, "Token not found."),
    TOKEN_EMPTY(HttpStatus.NOT_FOUND, "Token is required but empty."),

    // Member Error code
    EMAIL_DUPLICATED(HttpStatus.CONFLICT, "Email is duplicated"),
    NOT_FOUND_MEMBER(HttpStatus.BAD_REQUEST, "Member not found"),

    // Project Error code
    PROJECT_INVALID(HttpStatus.BAD_REQUEST, "Invalid projectId"),

    // Common Error Code
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "An internal server error occurred."),
    BAD_REQUEST(HttpStatus.BAD_REQUEST, "Invalid request."),
    NOT_FOUND(HttpStatus.NOT_FOUND, "Request not found"),
    METHOD_NOT_ALLOWED(HttpStatus.METHOD_NOT_ALLOWED, "HTTP method not allowed."),
    ACCESS_DENIED(HttpStatus.FORBIDDEN, "Unauthorized request.");

    private final HttpStatus httpStatus;
    private final String message;
}
