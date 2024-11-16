package org.binddog.binddoghub.image.controller;

import lombok.RequiredArgsConstructor;
import org.binddog.binddoghub.global.enums.NoneResponse;
import org.binddog.binddoghub.global.response.Response;
import org.binddog.binddoghub.global.response.SuccessResponse;
import org.binddog.binddoghub.image.UploadImageRequest;
import org.binddog.binddoghub.image.service.MinioService;
import org.springframework.http.HttpStatus;
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
            @RequestPart("uploadImageRequest") UploadImageRequest request) {
        SuccessResponse<NoneResponse> response = minioService.uploadFile(file, request);
        return Response.success(response);
    }


    // 이미지 조회
    @GetMapping("/{projectId}/{flowId}")
    public ResponseEntity<String> getImage(@PathVariable Long flowId, @PathVariable Long projectId) {
        try {
            String presignedUrl = minioService.getPresignedUrl(projectId, flowId);
            return ResponseEntity.ok(presignedUrl); // Pre-signed URL 반환
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Failed to generate URL: " + e.getMessage());
        }
    }
}
