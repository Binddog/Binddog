package org.binddog.binddoghub.global.repository;

import org.binddog.binddoghub.global.dto.Tokens;
import org.springframework.data.repository.CrudRepository;


public interface RedisRepository extends CrudRepository<Tokens, Long> {
	void deleteByAccessToken(String accessToken);
	Tokens findByAccessToken(String accessToken);
}
