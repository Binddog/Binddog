package org.binddog.binddoghub.global.response;


import org.binddog.binddoghub.global.enums.SuccessCode;

public record SuccessResponse<T>(SuccessCode successCode, T data) {
}
