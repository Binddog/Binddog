package org.binddog.binddoghub.project.dto.req;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import org.hibernate.validator.constraints.Length;

@Builder
public record ProjectCreateReq(
        @Length(
                min = 1,
                max = 50,
                message = "Title must be 50 characters or less."
        )
        @NotBlank(message = "Title cannot be an empty value.")
        String title,

        @Length(
                min = 0,
                max = 255,
                message = "Description must be 255 characters or less."
        )
        String description
) {
}
