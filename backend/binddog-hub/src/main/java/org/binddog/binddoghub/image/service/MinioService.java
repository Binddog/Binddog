package org.binddog.binddoghub.image.service;

import org.binddog.binddoghub.global.enums.NoneResponse;
import org.binddog.binddoghub.global.response.SuccessResponse;
import org.binddog.binddoghub.image.UploadImageRequest;
import org.springframework.web.multipart.MultipartFile;

public interface MinioService {
    SuccessResponse<NoneResponse> uploadFile(MultipartFile file, UploadImageRequest request);
    String getPresignedUrl(Long projectId, Long flowId);
}