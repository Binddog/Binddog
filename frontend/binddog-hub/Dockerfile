# 베이스 이미지로 Node.js 20-alpine을 사용
FROM node:20-alpine as builder

# 앱 디렉토리를 생성하고 작업 디렉토리로 설정
WORKDIR /app

# package.json과 package-lock.json을 복사 (가능한 경우)
COPY ./package*.json ./

# 의존성 설치
RUN npm install

# 앱 소스 복사
COPY . .

# 빌드
RUN npm run build

# nginx 설정
FROM nginx
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html