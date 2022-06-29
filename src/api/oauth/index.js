import Router from 'koa-router';
import * as oauthCtrl from './oauth.ctrl';

const oauth = new Router();

oauth.post('/', oauthCtrl.token);

export default oauth;