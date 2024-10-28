package org.binddog.binddoghub.global.response;

import org.binddog.binddoghub.global.enums.ErrorCode;
import org.springframework.http.ResponseEntity;

public record Response<T>(String resultCode, String code, String message, T data) {
    public static <T> ResponseEntity<Response<T>> success(SuccessResponse<T> response) {
        return new ResponseEntity<>(new Response<>("SUCCESS", response.successCode().name(),
                response.successCode().getMessage(), response.data()), response.successCode().getHttpStatus());
    }

    public static <T> Response<T> error(ErrorCode code, T data) {
        return new Response<>("ERROR", code.name(), code.getMessage(), data);
    }


}

