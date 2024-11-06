package org.binddog.binddoghub.member.repository;

import java.util.Optional;

import org.binddog.binddoghub.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import static org.binddog.binddoghub.global.enums.ErrorCode.NOT_FOUND_MEMBER;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    boolean existsByEmail(final String email);

	Optional<Member> findByEmail(String email);
}