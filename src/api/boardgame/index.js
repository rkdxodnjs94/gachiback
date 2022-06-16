import Router from "koa-router";
import * as boardgameCtrl from './boardgame.ctrl';

const boardgame = new Router();
``
boardgame.get('/', boardgameCtrl.list);
boardgame.post('/', boardgameCtrl.write);
boardgame.get('/:id', boardgameCtrl.read);
boardgame.delete('/:id', boardgameCtrl.remove);
boardgame.patch('/:id', boardgameCtrl.update);

export default boardgame;