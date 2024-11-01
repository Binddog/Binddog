package org.binddog.binddoghub.flow.dto.req;

import lombok.Builder;

@Builder
public record FlowCreateReq(
        String title,
        String desc
) {
}
