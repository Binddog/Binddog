package org.binddog.binddoghub.member.repository;

import org.binddog.binddoghub.global.handler.AppException;
import org.binddog.binddoghub.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import static org.binddog.binddoghub.global.enums.ErrorCode.NOT_FOUND_MEMBER;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    boolean existsByEmail(final String email);

    default Member getById(Long memberId){
        return findById(memberId)
                .orElseThrow(() -> new AppException(NOT_FOUND_MEMBER));
    }
}