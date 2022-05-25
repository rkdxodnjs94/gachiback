import Joi from 'joi';
import User from '../../models/user';
/*
  POST /api/user/register
  {
    "userid" : "test12345@test.com",
    "userpw" : "Test123456",
    "nickname" : "테스트2",
    "gender" : "male",
    "tel" : "01012341234"
  }
*/
export const register = async (context) => {
  const schema = Joi.object().keys({
    userid : Joi.string().min(10).max(30).trim().required(), // 최소 10, 최대 30글자가 필수로 요구
    userpw : Joi.string().trim().required(),
    nickname : Joi.string().required(),
    gender : Joi.string().required(),
    tel : Joi.string().required()
  });
  const result = schema.validate(context.request.body);
  if (result.error) {
    context.status = 400;
    context.body = result.error;
    return;
  }
  const { userid, userpw, nickname, gender, tel } = context.request.body;
  try {
    const exists = await User.findByUsername(userid);
    if (exists) { // 중복되서 true 받으면 409 반환하고 종료
      context.status = 409; // 중복, 충돌
      return;
    }

    const signup = new User({
      userid,
      nickname,
      gender,
      tel
    });
    await signup.setPassword(userpw);
    await signup.save(); // save안해주면 저장 안됨

    // 응답할 데이터에서 hashedPassword 필드 제거
    context.body = signup.serialize();
    /**
     * 이렇게 인스턴스 메서드를 통해 아래의 코드를 여기에다 직접 다루지 않고
     * 코드를 분리할 수 있습니다.
     */
    /**
     * 
     * const data = user.toJSON();
     * delete data.hashedPassword;
     * ctx.body = data;
     */
    const token = signup.generateToken();
    context.cookies.set('access_token', token, {
      maxAge : 1000 * 60 * 60 * 24 * 7, // 7일
      httpOnly : true
    });
  } catch (e) {
    context.throw(500, e);
  }
}
/*
  POST /api/user/login
  {
    "userid" : "test12345@test.com",
    "userpw" : "Test123456"
  }
*/
export const login = async (context) => {
  const { userid, userpw } = context.request.body;

  if ( !userid || !userpw ){ // userid, userpw가 없으면 에러 처리
    context.status = 401; // Unauthorized
    console.log('401-1');
    return;
  }

  try {
    const login = await User.findByUsername(userid);
    // 계정이 존재하지 않으면 에러 처리
    if (!login) {
      context.status = 401;
      console.log('401-2');
      return;
    }
    const valid = await login.checkPassword(userpw);
    // 잘못된 비밀번호
    if (!valid) {
      context.status = 401;
      console.log('401-3');
      return;
    }
    context.body = login.serialize();
    const token = login.generateToken();
    context.cookies.set('access_token', token, {
      maxAge : 1000 * 60 * 60 * 24 * 7, // 7일
      httpOnly : true
    });
  } catch (e) {
      context.throw(500, e);
  }
};
/*
  GET /api/user/check
*/
export const check = async (context) => {
  const { login } = context.state;
  if (!login) {
    context.status = 401; // Unauthorized (로그인 중 아님)
    console.log('401-4');
    return;
  }
}
/*
  POST /api/user/logout
*/
export const logout = async (context) => {
  context.cookies.set('access_token');
  context.status = 204; // No Content
};