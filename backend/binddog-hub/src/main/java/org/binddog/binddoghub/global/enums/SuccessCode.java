package org.binddog.binddoghub.global.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum SuccessCode implements ResponseCode {

    // Project API
    PROJECT_CREATED(HttpStatus.CREATED, "Project creation has been completed."),
    GET_PROJECT_SUCCESS(HttpStatus.OK, "Project list retrieved successfully."),

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
