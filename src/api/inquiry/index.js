import Router from "koa-router";
import * as inquiryCtrl from './inquiry.ctrl';

const inquiry = new Router();

inquiry.get('/', inquiryCtrl.list);
inquiry.post('/', inquiryCtrl.write);
inquiry.get('/:id', inquiryCtrl.read);
inquiry.delete('/:id', inquiryCtrl.remove);
inquiry.patch('/:id', inquiryCtrl.update);

export default inquiry;