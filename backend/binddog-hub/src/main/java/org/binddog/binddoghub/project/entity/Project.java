package org.binddog.binddoghub.project.entity;

import jakarta.persistence.*;
import lombok.*;
import org.binddog.binddoghub.global.entity.BaseEntity;
import org.binddog.binddoghub.member.entity.Member;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Project extends BaseEntity {

    @Id
    @Column(name = "project_id", nullable = false, columnDefinition = "INT UNSIGNED")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String title;

    @Column(length = 255)
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Builder
    public Project(String title, String description, Member member) {
        this.title = title;
        this.description = description;
        this.member = member;
    }
}