package org.binddog.binddoghub.member.service;

import org.binddog.binddoghub.global.enums.NoneResponse;
import org.binddog.binddoghub.global.response.SuccessResponse;
import org.binddog.binddoghub.member.dto.req.MemberRegisterReq;

public interface MemberService {

    SuccessResponse<NoneResponse> registerMember(MemberRegisterReq request);
}
