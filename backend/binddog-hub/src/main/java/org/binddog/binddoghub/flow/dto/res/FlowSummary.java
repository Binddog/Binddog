package org.binddog.binddoghub.flow.dto.res;

import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record FlowSummary(
    String flowId,
    String title,
    String description,
    String createdAt,
    String updatedAt
) { }
