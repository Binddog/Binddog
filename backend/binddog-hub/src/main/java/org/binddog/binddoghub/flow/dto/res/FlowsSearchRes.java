package org.binddog.binddoghub.flow.dto.res;

import java.util.List;

public record FlowsSearchRes(
        Integer count,
        List<FlowSummary> flows
) {
}
