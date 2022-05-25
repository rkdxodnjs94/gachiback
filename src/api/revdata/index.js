import Router from "koa-router";
import * as revdataCtrl from './revdata.ctrl';

const revdata = new Router();

revdata.get('/', revdataCtrl.list);
revdata.post('/', revdataCtrl.write);
revdata.get('/:id', revdataCtrl.read);
revdata.delete('/:id', revdataCtrl.remove);
revdata.patch('/:id', revdataCtrl.update);

export default revdata;