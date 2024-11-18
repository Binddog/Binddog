package org.binddog.binddoghub.image.service.impl;

import io.minio.BucketExistsArgs;
import io.minio.MakeBucketArgs;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import lombok.RequiredArgsConstructor;
import org.binddog.binddoghub.global.enums.ErrorCode;
import org.binddog.binddoghub.global.enums.NoneResponse;
import org.binddog.binddoghub.global.handler.AppException;
import org.binddog.binddoghub.global.response.SuccessResponse;
import org.binddog.binddoghub.image.dto.req.UploadImageReq;
import org.binddog.binddoghub.image.dto.res.ImageUrlRes;
import org.binddog.binddoghub.image.service.MinioService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;

import static org.binddog.binddoghub.global.enums.ErrorCode.BUCKET_INVALID;
import static org.binddog.binddoghub.global.enums.ErrorCode.IMAGE_GET_ERROR;
import static org.binddog.binddoghub.global.enums.NoneResponse.NONE;
import static org.binddog.binddoghub.global.enums.SuccessCode.IMAGE_GET_SUCCESS;
import static org.binddog.binddoghub.global.enums.SuccessCode.IMAGE_UPLOAD_SUCCESS;

@Service
@RequiredArgsConstructor
public class MinioServiceImpl implements MinioService {

    private final MinioClient minioClient;

    @Value("${minio.bucket-name}")
    private String bucketName;

    @Value("${minio.presigned-url}")
    private String presignedURL;

    @Override
    public SuccessResponse<NoneResponse> uploadFile(MultipartFile file, UploadImageReq request) {
        try (InputStream inputStream = file.getInputStream()) {
            ensureBucketExists();
            String fileName = request.projectId() + "-" + request.flowId() + ".jpg";
            minioClient.putObject(
                    PutObjectArgs.builder()
                                 .bucket(bucketName)
                                 .object(fileName)
                                 .stream(inputStream, file.getSize(), -1)
                                 .contentType(file.getContentType())
                                 .build()
            );
            return new SuccessResponse<>(IMAGE_UPLOAD_SUCCESS, NONE);
        } catch (Exception e) {
            throw new AppException(ErrorCode.IMAGE_UPLOAD_ERROR);
        }
    }

    @Override
    public SuccessResponse<ImageUrlRes> getPreSignedUrl(Long projectId, String flowId) {
        try {
            ensureBucketExists();
            String fileName = projectId + "-" + flowId + ".jpg";
            String url = presignedURL + "/" + bucketName + "/" + fileName;
            ImageUrlRes response = ImageUrlRes.builder()
                                              .url(url)
                                              .build();
            return new SuccessResponse<>(IMAGE_GET_SUCCESS, response);
        } catch (Exception e) {
            throw new AppException(IMAGE_GET_ERROR);
        }
    }


    private void ensureBucketExists() {
        try {
            boolean exists = minioClient.bucketExists(BucketExistsArgs.builder()
                                                                      .bucket(bucketName)
                                                                      .build());
            if (!exists) {
                minioClient.makeBucket(MakeBucketArgs.builder()
                                                     .bucket(bucketName)
                                                     .build());
            }
        } catch (Exception e) {
            throw new AppException(BUCKET_INVALID);
        }
    }
}