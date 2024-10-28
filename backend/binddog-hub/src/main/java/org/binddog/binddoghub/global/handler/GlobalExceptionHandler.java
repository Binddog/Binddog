package org.binddog.binddoghub.global.handler;

import org.binddog.binddoghub.global.enums.ErrorCode;
import org.binddog.binddoghub.global.enums.NoneResponse;
import org.binddog.binddoghub.global.response.Response;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.HandlerMethodValidationException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import static org.binddog.binddoghub.global.enums.ErrorCode.*;


@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    // custom error handler
    @ExceptionHandler(AppException.class)
    public ResponseEntity<?> AppExceptionHandler(AppException e) {
        return makeErrorResponse(e.getErrorCode());
    }

    // NOT_FOUND error(404) handler
    @Override
    protected ResponseEntity<Object> handleNoResourceFoundException(
            NoResourceFoundException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        return makeErrorResponse(NOT_FOUND);
    }

    // METHOD_NOT_ALLOWED error(405) handler
    @Override
    protected ResponseEntity<Object> handleHttpRequestMethodNotSupported(
            HttpRequestMethodNotSupportedException ex, HttpHeaders headers,
            HttpStatusCode status, WebRequest request) {
        return makeErrorResponse(METHOD_NOT_ALLOWED);
    }

    // BAD_REQUEST error(400) handler
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex, HttpHeaders headers,
            HttpStatusCode status, WebRequest request) {
        return ResponseEntity.status(ex.getStatusCode())
                .body(Response.error(ErrorCode.BAD_REQUEST, ex.getFieldErrors().get(0).getDefaultMessage()));
    }

    // BAD_REQUEST error(400) handler
    @Override
    protected ResponseEntity<Object> handleHandlerMethodValidationException(
            HandlerMethodValidationException ex, HttpHeaders headers,
            HttpStatusCode status, WebRequest request) {
        return makeErrorResponse(BAD_REQUEST);
    }

    // INTERNAL_SERVER_ERROR error(500) handler
    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> commonExceptionHandler() {
        return makeErrorResponse(INTERNAL_SERVER_ERROR);
    }

    private ResponseEntity<Object> makeErrorResponse(ErrorCode errorCode) {
        return ResponseEntity.status(errorCode.getHttpStatus())
                .body(Response.error(errorCode, NoneResponse.NONE));
    }
}
