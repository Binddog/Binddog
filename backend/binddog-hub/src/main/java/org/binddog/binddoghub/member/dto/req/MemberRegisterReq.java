package org.binddog.binddoghub.member.dto.req;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;

@Builder
public record MemberRegisterReq(

        @Email(message = "유효한 이메일 형식이 아닙니다.")
        @NotBlank(message = "이메일은 빈 값일 수 없습니다.")
        String email,

        @Pattern(
                regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,16}$",
                message = "비밀번호 형식이 유효하지 않습니다."
        )
        String password
) {
}
