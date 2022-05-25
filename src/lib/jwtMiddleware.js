import jwt from 'jsonwebtoken';
import User from '../models/user';

const jwtMiddleware = async (context, next) => {
  const token = context.cookies.get('access_token');
  if (!token) return next(); // 토큰이 없음
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    context.state.user = {
      _id : decoded._id,
      userid : decoded.userid
    };
    // 토큰의 남은 유효 기간이 2일 미만이면 재발급
    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp - now < 60 * 60 * 24 * 2) {
      const user = await User.findById(decoded._id);
      const token = user.generateToken();
      context.cookies.set('access_token', token, {
        maxAge : 1000 * 60 * 60 * 24 * 7, // 7일
        httpOnly : true,
      });
    }
    return next();
  } catch (e) {
    // 토큰 검증 실패
    return next();
  }
};

export default jwtMiddleware;