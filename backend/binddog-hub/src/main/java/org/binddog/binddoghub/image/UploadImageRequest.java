package org.binddog.binddoghub.image;

public record UploadImageRequest(
        Long projectId,
        Long flowId
) {
}
