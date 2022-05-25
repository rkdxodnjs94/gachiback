// 맥으로 포트연결시 brew services start mongodb-community
require('dotenv').config();

import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import api from './api';
import jwtMiddleware from './lib/jwtMiddleware';

// 비구조화 할당을 통해 process.env 내부 값에 대한 래퍼런스 만들기
const { PORT, MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB 연결됨');
  })
  .catch((e) => {
    console.error(e);
  });

const app = new Koa();
const router = new Router();

// 라우터 설정
router.use('/api', api.routes());

// *** 반드시 라우터 적용 전에 bodyParser 적용 ***
app.use(bodyParser());
app.use(jwtMiddleware);

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

// 지정된 port가 없으면 4000을 사용하도록 설정
// .env 파일에 이미 4000으로 지정되어있지만,
// 혹시 모를경우 또는 기타 다양한 이유로 이런식으로 코딩해 대처할 수 있습니다.
const port = PORT || 4000;
app.listen(port, () => {
  console.log('포트 %d 개방', port);
});