import Router from "koa-router";
import * as partyCtrl from './party.ctrl';

const party = new Router();

party.get('/', partyCtrl.list);
party.post('/', partyCtrl.write);
party.get('/:id', partyCtrl.read);
party.delete('/:id', partyCtrl.remove);
party.patch('/:id', partyCtrl.update);

export default party;