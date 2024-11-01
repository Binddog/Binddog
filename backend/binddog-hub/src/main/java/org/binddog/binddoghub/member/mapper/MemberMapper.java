package org.binddog.binddoghub.member.mapper;

import org.binddog.binddoghub.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface MemberMapper {


    @Mapping(source = "email", target = "email")
    @Mapping(source = "hashedPassword", target = "password")
    Member toMember(String email, String hashedPassword);
}
