FROM openjdk:17-jdk-buster AS builder

RUN apt-get update && apt-get install -y findutils && apt-get install dos2unix tzdata

# 타임존을 한국으로 설정
RUN ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime && echo "Asia/Seoul" > /etc/timezone


# 작업 디렉토리 설정
WORKDIR /app

# 프로젝트 root에서 Gradle Wrapper와 설정 파일 복사
COPY gradlew /app/
COPY gradle /app/gradle
RUN dos2unix /app/gradlew && chmod +x /app/gradlew

# 프로젝트 설정 파일 복사
COPY settings.gradle /app/
COPY build.gradle /app/
COPY . /app/binddog-hub

# binddog-hub 모듈의 빌드 실행
WORKDIR /app/binddog-hub
RUN /app/gradlew bootJar --no-daemon

# 최종 이미지
FROM openjdk:17-jdk-buster
RUN ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime && echo "Asia/Seoul" > /etc/timezone

COPY --from=builder /app/binddog-hub/build/libs/*.jar /home/server.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/home/server.jar", "--spring.profiles.active=dev"]
