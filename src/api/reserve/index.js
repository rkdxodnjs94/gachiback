import Router from "koa-router";
import * as reserveCtrl from './reserve.ctrl';

const reserve = new Router();

reserve.get('/', reserveCtrl.list);
reserve.post('/', reserveCtrl.write);
reserve.get('/place', reserveCtrl.placeread);
reserve.delete('/:id', reserveCtrl.remove);
reserve.patch('/:id', reserveCtrl.update);

export default reserve;