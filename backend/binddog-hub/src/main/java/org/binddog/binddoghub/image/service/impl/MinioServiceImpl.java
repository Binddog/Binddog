package org.binddog.binddoghub.image.service.impl;

import io.minio.*;
import io.minio.http.Method;
import org.binddog.binddoghub.global.enums.ErrorCode;
import org.binddog.binddoghub.global.enums.NoneResponse;
import org.binddog.binddoghub.global.handler.AppException;
import org.binddog.binddoghub.global.response.SuccessResponse;
import org.binddog.binddoghub.image.UploadImageRequest;
import org.binddog.binddoghub.image.service.MinioService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;

import static org.binddog.binddoghub.global.enums.ErrorCode.BUCKET_INVALID;
import static org.binddog.binddoghub.global.enums.ErrorCode.IMAGE_GET_ERROR;
import static org.binddog.binddoghub.global.enums.NoneResponse.NONE;
import static org.binddog.binddoghub.global.enums.SuccessCode.IMAGE_UPLOAD_SUCCESS;

@Service
public class MinioServiceImpl implements MinioService {

    private final MinioClient minioClient;

    @Value("${minio.bucket-name}")
    private String bucketName;

    public MinioServiceImpl(MinioClient minioClient) {
        this.minioClient = minioClient;
    }

    @Override
    public SuccessResponse<NoneResponse> uploadFile(MultipartFile file, UploadImageRequest request) {
        try (InputStream inputStream = file.getInputStream()) {
            ensureBucketExists();
            String fileName = request.projectId() + "-" + request.flowId() + ".jpg" ;
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
    public String getPresignedUrl(Long projectId, Long flowId){
        try {
            ensureBucketExists();
            String fileName = projectId + "-" + flowId + ".jpg" ;
            return minioClient.getPresignedObjectUrl(
                    GetPresignedObjectUrlArgs.builder()
                                             .bucket(bucketName)
                                             .object(fileName)
                                             .method(Method.GET)
                                             .expiry(60 * 60 * 24 * 7)
                                             .build()
            );
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