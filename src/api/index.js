/**
 *
  [라우트 모듈화에 대하여]
  플젝을 하다보면, 여럿의 라우트를 만들게 됩니다.
  여기에 라우트 관련 코드를 전부 작성해도 되지만,
  나중에 한 파일의 코드가 너무 길어지고, 유지보수 하기도 힘들어 집니다.
  그래서 성격 및 주제별로 도메인을 나눠서, 라우터를 모듈화하면 좋습니다
 */
  import Router from 'koa-router';
  import user from './user';
  import revdata from './revdata';
  import reserve from './reserve';
  import party from './party';
  
  const api = new Router();
  
  api.use('/user', user.routes());
  api.use('/search', revdata.routes());
  api.use('/reserve', reserve.routes());
  api.use('/party', party.routes());
  
  export default api;