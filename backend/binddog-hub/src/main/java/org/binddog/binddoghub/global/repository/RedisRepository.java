package org.binddog.binddoghub.global.repository;

import java.util.Optional;
import org.binddog.binddoghub.global.dto.Tokens;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

public interface RedisRepository extends CrudRepository<Tokens, Long> {
	@Transactional
	default void deleteByAccessToken(String accessToken) {
		findByAccessToken(accessToken)
				.ifPresent(this::delete);
	}

	Optional<Tokens> findByAccessToken(String accessToken);

}
