package org.binddog.binddoghub.image.controller;

import lombok.RequiredArgsConstructor;
import org.binddog.binddoghub.global.enums.NoneResponse;
import org.binddog.binddoghub.global.response.Response;
import org.binddog.binddoghub.global.response.SuccessResponse;
import org.binddog.binddoghub.image.dto.req.UploadImageReq;
import org.binddog.binddoghub.image.dto.res.ImageUrlRes;
import org.binddog.binddoghub.image.service.MinioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/images")
public class MinioController {

    private final MinioService minioService;

    // 이미지 업로드
    @PostMapping("/upload")
    public ResponseEntity<Response<NoneResponse>> uploadImage(
            @RequestPart("file") MultipartFile file,
            @RequestPart("uploadImageRequest") UploadImageReq request) {
        SuccessResponse<NoneResponse> response = minioService.uploadFile(file, request);
        return Response.success(response);
    }


    // 이미지 조회
    @GetMapping("/{projectId}/{flowId}")
    public ResponseEntity<Response<ImageUrlRes>> getImage(@PathVariable Long flowId, @PathVariable Long projectId) {
            SuccessResponse<ImageUrlRes> response = minioService.getPresignedUrl(projectId, flowId);
            return Response.success(response);
    }
}
