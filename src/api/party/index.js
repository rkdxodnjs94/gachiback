import Router from "koa-router";
import * as partyCtrl from './party.ctrl';

const party = new Router();

party.get('/', partyCtrl.list);
party.post('/', partyCtrl.write);
party.get('/read', partyCtrl.read);
party.delete('/:id', partyCtrl.remove);
party.patch('/apply', partyCtrl.apply);

export default party;