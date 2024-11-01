package org.binddog.binddoghub.member.service.impl;

import lombok.RequiredArgsConstructor;
import org.binddog.binddoghub.global.enums.NoneResponse;
import org.binddog.binddoghub.global.handler.AppException;
import org.binddog.binddoghub.global.response.SuccessResponse;
import org.binddog.binddoghub.member.dto.req.MemberRegisterReq;
import org.binddog.binddoghub.member.entity.Member;
import org.binddog.binddoghub.member.mapper.MemberMapper;
import org.binddog.binddoghub.member.repository.MemberRepository;
import org.binddog.binddoghub.member.service.MemberService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import static org.binddog.binddoghub.global.enums.ErrorCode.EMAIL_DUPLICATED;
import static org.binddog.binddoghub.global.enums.SuccessCode.USER_CREATED;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final PasswordEncoder passwordEncoder;
    private final MemberRepository memberRepository;
    private final MemberMapper memberMapper;

    /**
     * Method to receive member information<br>
     * and sign up as a member
     * @param request
     * @return
     */
    @Override
    public SuccessResponse<NoneResponse> registerMember(MemberRegisterReq request){
        // Check Email Redundancy
        String email = request.email();
        validateByEmail(email);

        // Member Entity
        Member member =
                memberMapper.toMember(email, passwordEncoder.encode(request.password()));

        memberRepository.save(member);

        return new SuccessResponse<>(USER_CREATED, NoneResponse.NONE);
    }

    /**
     * Method to check email duplicate<br>
     * @param email
     */
    private void validateByEmail(final String email){
        if(memberRepository.existsByEmail(email)){
            throw new AppException(EMAIL_DUPLICATED);
        }
    }
}
