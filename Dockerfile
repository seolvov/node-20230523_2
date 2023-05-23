# Dockerfile: docker 에 express 서버를 실행하는 image 를 만드는 코드
FROM node:16

# 앱 디렉토리 생성
WORKDIR /data/node_mongo/app

COPY package*.json ./

RUN npm install
RUN npm install -g nodemon

# 앱 소스 추가
COPY . .

# docker 환경에서 나가는 port / 내보내는 것은 9091 로 내보낼 것이다 / localhost:9091
EXPOSE 9091

# nodemon -L : 자동 재시작
CMD ["nodemon", "-L", "index.js"]