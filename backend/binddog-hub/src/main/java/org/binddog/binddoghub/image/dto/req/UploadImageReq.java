package org.binddog.binddoghub.image.dto.req;

public record UploadImageReq(
        Long projectId,
        String flowId
) {
}
