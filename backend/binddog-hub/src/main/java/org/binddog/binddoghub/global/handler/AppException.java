package org.binddog.binddoghub.global.handler;

import lombok.Getter;
import org.binddog.binddoghub.global.enums.ErrorCode;

@Getter
public class AppException extends RuntimeException {
    private final ErrorCode errorCode;
    private final String message;

    public AppException(ErrorCode errorCode) {
        this.errorCode = errorCode;
        this.message = errorCode.getMessage();
    }
}
