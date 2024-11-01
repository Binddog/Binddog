package org.binddog.binddoghub.project.repository;

import org.binddog.binddoghub.project.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    List<Project> findByMemberId(Long memberId);
}
