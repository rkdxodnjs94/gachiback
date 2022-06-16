import moment from "moment-timezone";
import Notice from '../../models/Notice';

/**
 * POST http://localhost:4001/api/notice
{
    title : String,
    content : String,
    publisher : String,
    publisherID : String
} **/
export const write = async (context) => {
  const {
    title,
    content,
    publisher,
    publisherID
  } = context.request.body;

  const notice = new Notice({
    title,
    date : moment.tz(new Date(),'Asia/Seoul').format(),
    content,
    publisher,
    publisherID
  });

  try {
    await notice.save();
    context.body = notice;
  } catch (e) {
    context.throw(500, e);
  }
};
/** GET /api/party 전체리스트 **/
export const list = async (context) => {
  try {
    // exec() 안해주면 서버에 쿼리요청 안 합니다. 종종 하는 실수.
    const notice = await Notice.find().sort({ _id : -1 }).exec();
    context.body = notice;
  } catch (e) {
    context.throw(500, e);
  }
};
/** GET /api/party/:id
 * :id에 들어가는 값은, mongoDB의 collection내 document 고유 id를 말합니다.
해당되는 id가 없으면 404, id의 포맷이 아예다른경우 500 이란 http code가 나올겁니다**/
// export const read = async (context) => {
//   const { id } = context.params;
//   try {
//     const party = await Party.findById(id).exec();
//     if (!party) {
//       context.status = 404; // Not Found
//       return;
//     }
//     context.body = party;
//   } catch (e) {
//     context.throw(500, e);
//   }
// };
/** GET /api/notice/:id 하나의 게시물 조회 **/
export const read = async (context) => {
  const { id } = context.params;
  try {
    const notice = await Notice.findById(id).exec();
    if (!notice) {
      context.status = 404; // Not Found
      return;
    }
    context.body = notice;
  } catch (e) {
    context.throw(500, e);
  }
};

/** GET /api/notice/viewupdate 하나의 게시물 조회 **/
export const viewupdate = async (context) => {
  const { id } = context.params;
  try {
    const notice = await Notice.findByIdAndUpdate(id,
      {views : String(context.request.body.data.views)},
      {new : true}).exec();
    if (!notice) {
      context.status = 404; // Not Found
      return;
    }
    context.body = notice;
  } catch (e) {
    context.throw(500, e);
  }
};
/**
  DELETE /api/reserve/:id
  부연설명) 삭제하고 또 그대로 요청하면 204 http code(no content)를 반환합니다. 이젠 삭제되서 아무것도 없으니까요.
            이 api에선 id를 기준으로 삭제하는 걸 사용했는 데,
            remove()나 findOneAndRemove() 등 여러 다른 함수를 통해서도 삭제 가능합니다. **/
export const remove = async (context) => {
  const { id } = context.params;
  try {
    await Notice.findByIdAndDelete(id).exec();
    context.status = 204; // No Content(성공했지만 응답할 데이터 없음)
  } catch (e) {
    context.throw(500, e);
  }
};
/** 
   PATCH /api/party/:id
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
  try {
    /**
     * findByIdAndUpdate()의
     * 1번째 파라미터는 id
     * 2번째 파라미터는 업뎃할 내용
     * 3번째 파라미터는 업뎃 옵션
     * 입니다.
     */
    const notice = await Notice.findOneAndUpdate({no : context.query.no},
       {
         title : context.request.body.data.title,
         content : context.request.body.data.content,
         date : moment.tz(new Date(),'Asia/Seoul').format()
        }, 
       {
      /**
       * 아래의 옵션이,
       * true면 업데이트 된 데이터의 모습이 반환되고
       * false면 업뎃 전 데이터를 보여줍니다.
       */
      new: true}).exec();
      if (!notice) {
        context.status = 404;
        return;
      }
      context.body = notice;
  } catch (e) {
    context.throw(500 ,e);
  }
};