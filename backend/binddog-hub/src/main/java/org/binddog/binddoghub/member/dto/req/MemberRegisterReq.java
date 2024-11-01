package org.binddog.binddoghub.member.dto.req;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;

@Builder
public record MemberRegisterReq(

        @Email(message = "This is not a valid email format.")
        @NotBlank(message = "Email cannot be an empty value.")
        String email,

        @Pattern(
                regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,16}$",
                message = "Password format is invalid."
        )
        String password
) {
}
