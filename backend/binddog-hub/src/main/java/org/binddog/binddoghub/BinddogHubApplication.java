package org.binddog.binddoghub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories(basePackages = "org.binddog.binddoghub.flow.repository")
@EnableJpaRepositories(basePackages =
		{
				"org.binddog.binddoghub.project.repository",
				"org.binddog.binddoghub.member.repository"
		})
public class BinddogHubApplication {

	public static void main(String[] args) {
		SpringApplication.run(BinddogHubApplication.class, args);
	}

}
