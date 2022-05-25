import RevData from '../../models/revdata';
/**
 * POST http://localhost:4000/api/search
{
  id: Number,
  name: String,
  address: String
} **/
export const write = async (context) => {
  const {
    id,
    name,
    address
  } = context.request.body;

  const revdata = new RevData({
    id,
    name,
    address
  });

  try {
    await revdata.save();
    context.body = revdata;
  } catch (e) {
    context.throw(500, e);
  }
};
/** GET /api/search **/
export const list = async (context) => {
  try {
    // exec() 안해주면 서버에 쿼리요청 안 합니다. 종종 하는 실수.
    const revdata = await RevData.find().exec();
    context.body = revdata;
  } catch (e) {
    context.throw(500, e);
  }
};
/** GET /api/search/:id 
 * :id에 들어가는 값은, mongoDB의 collection내 document 고유 id를 말합니다.
해당되는 id가 없으면 404, id의 포맷이 아예다른경우 500 이란 http code가 나올겁니다**/
export const read = async (context) => {
  const { id } = context.params;
  try {
    const revdata = await RevData.findById(id).exec();
    if (!revdata) {
      context.status = 404; // Not Found
      return;
    }
    context.body = revdata;
  } catch (e) {
    context.throw(500, e);
  }
};
/**
  DELETE /api/article/:id
  부연설명) 삭제하고 또 그대로 요청하면 204 http code(no content)를 반환합니다. 이젠 삭제되서 아무것도 없으니까요.
            이 api에선 id를 기준으로 삭제하는 걸 사용했는 데,
            remove()나 findOneAndRemove() 등 여러 다른 함수를 통해서도 삭제 가능합니다. **/
export const remove = async (context) => {
  const { id } = context.params;
  try {
    await RevData.findByIdAndDelete(id).exec();
    context.status = 204; // No Content(성공했지만 응답할 데이터 없음)
  } catch (e) {
    context.throw(500, e);
  }
};
/** 
   PATCH /api/article/:id
  {
    "key":"value"
    .
    .
    .
  }
  데이터를 업데이트할 때는 findByIdAndUpdate() 함수를 사용합니다. 
  이 함수를 사용할 때는 세 가지 파라미터를 넣어 주어야 합니다.  
**/
export const update = async (context) => {
  const { id } = context.params;
  try {
    /**
     * findByIdAndUpdate()의
     * 1번째 파라미터는 id
     * 2번째 파라미터는 업뎃할 내용
     * 3번째 파라미터는 업뎃 옵션
     * 입니다.
     */
    const revdata = await RevData.findByIdAndUpdate(id, context.request.body, {
      /**
       * 아래의 옵션이,
       * true면 업데이트 된 데이터의 모습이 반환되고
       * false면 업뎃 전 데이터를 보여줍니다.
       */
      new: true}).exec();
      if (!revdata) {
        context.status = 404;
        return;
      }
      context.body = revdata;
  } catch (e) {
    context.throw(500 ,e);
  }
};

