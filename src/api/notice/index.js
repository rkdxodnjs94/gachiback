import Router from "koa-router";
import * as noticeCtrl from './notice.ctrl';

const notice = new Router();

notice.get('/', noticeCtrl.list);
notice.post('/', noticeCtrl.write);
notice.get('/:id', noticeCtrl.read);
notice.patch('/:id', noticeCtrl.viewupdate);
notice.delete('/:id', noticeCtrl.remove);
notice.patch('/:id', noticeCtrl.update);

export default notice;