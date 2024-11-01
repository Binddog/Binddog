package org.binddog.binddoghub.global.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum SuccessCode implements ResponseCode {

    // MemberAPI
    USER_CREATED(HttpStatus.CREATED, "Member creation has been completed."),

    // Flow APi
    GET_FLOW_SUCCESS(HttpStatus.OK, "플로우 단일 조회가 성공적으로 완료되었습니다."),
    REGISTER_FLOW_SUCCESS(HttpStatus.OK, "플로우 저장이 성공적으로 완료되었습니다."),

    // BASE API
    SUCCESS(HttpStatus.OK, "조회가 성공적으로 완료되었습니다.");

    private final HttpStatus httpStatus;
    private final String message;


}
