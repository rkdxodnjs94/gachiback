import Router from "koa-router";
import * as eventCtrl from './event.ctrl';

const event = new Router();

event.get('/', eventCtrl.list);
event.post('/', eventCtrl.write);
event.get('/:id', eventCtrl.read);
event.delete('/:id', eventCtrl.remove);
event.patch('/:id', eventCtrl.update);

export default event;