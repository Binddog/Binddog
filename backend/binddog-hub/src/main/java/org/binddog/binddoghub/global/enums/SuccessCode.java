package org.binddog.binddoghub.global.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum SuccessCode implements ResponseCode {

    //Auth
    LOGIN_SUCCESS(HttpStatus.OK, "Login successfully."),
    LOGOUT_SUCCESS(HttpStatus.OK, "Logout successfully."),
    AUTH_TOKEN_CHANGE_SUCCESS(HttpStatus.OK, "Auth token change successfully."),

    // MemberAPI
    USER_CREATED(HttpStatus.CREATED, "Member creation has been completed."),

    // Flow API
    GET_FLOW_SUCCESS(HttpStatus.OK, "Flow retrieval completed successfully."),
    REGISTER_FLOW_SUCCESS(HttpStatus.OK, "Flow registration completed successfully."),
    DELETE_FLOW_SUCCESS(HttpStatus.NO_CONTENT, "Flow deletion completed successfully."),

    // BASE API
    SUCCESS(HttpStatus.OK, "Retrieval completed successfully.");

    private final HttpStatus httpStatus;
    private final String message;


}
