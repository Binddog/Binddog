package org.binddog.binddoghub.auth.repository;

import org.binddog.binddoghub.global.dto.Tokens;
import org.springframework.data.repository.CrudRepository;

public interface TokenRepository extends CrudRepository<Tokens, Long> {


}
