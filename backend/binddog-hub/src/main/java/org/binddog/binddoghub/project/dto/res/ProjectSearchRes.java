package org.binddog.binddoghub.project.dto.res;

import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record ProjectSearchRes(
        String title,
        String description,
        LocalDateTime createdDate,
        LocalDateTime lastModifiedDate
) {

}
