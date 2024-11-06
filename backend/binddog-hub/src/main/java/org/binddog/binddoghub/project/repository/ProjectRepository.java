package org.binddog.binddoghub.project.repository;

import org.binddog.binddoghub.project.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    boolean existsByIdAndMemberId(Long id, Long memberId);

    List<Project> findByMemberIdOrderByUpdatedAtDesc(Long memberId);
}
