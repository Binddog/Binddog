package org.binddog.binddoghub.image.service;

import org.binddog.binddoghub.global.enums.NoneResponse;
import org.binddog.binddoghub.global.response.SuccessResponse;
import org.binddog.binddoghub.image.dto.req.UploadImageReq;
import org.binddog.binddoghub.image.dto.res.ImageUrlRes;
import org.springframework.web.multipart.MultipartFile;

public interface MinioService {
    SuccessResponse<NoneResponse> uploadFile(MultipartFile file, UploadImageReq request);
    SuccessResponse<ImageUrlRes> getPresignedUrl(Long projectId, Long flowId);
}