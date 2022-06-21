import Router from 'koa-router';
import * as userCtrl from './user.ctrl';

const user = new Router();

user.post('/register', userCtrl.register);
user.post('/login', userCtrl.login);
user.get('/check', userCtrl.check);
user.get('/list', userCtrl.list);
user.post('/logout', userCtrl.logout);

export default user;