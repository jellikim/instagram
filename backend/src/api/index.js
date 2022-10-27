//api 라우터

import Router from 'koa-router';
import auth from './auth'; //auth 라우터를 api 라우터에 연결

const api = new Router();

api.use('/auth', auth.routes());

//라우터를 내보냅니다.
export default api;
