import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const { Schema } = mongoose;

const UserSchema = new Schema({
  userid : {type: String, required: true, unique: true, trim: true, lowercase:true,
  patern : /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i}, 
  userpw : {type: String, trim: true,
  patern : /^[A-Za-z0-9]{10,15}$/},
  nickname : {type: String, required: true,
  patern : /^[A-Za-z가-힇0-9]{3,12}$/},
  gender : {type: String, required: true},
  tel : {type: String, required: true,
  patern : /(\d{3}).*(\d{3}).*(\d{4})/}
});
/**
 * 인스턴스 메서드
 * 반드시 인스턴스 메서드를 작성할 때는
 * es6에 도입된 화살표 함수가 아닌
 * function 키워드를 사용하여 구현해야 합니다. 
 * 함수 내부에서 this에 접근해야 하기 때문인데, 
 * this가 문서 인스턴스를 가르키게 해야하기 때문입니다.
 */
UserSchema.methods.setPassword = async function (password){
  const hash = await bcrypt.hash(password, 10);
  this.userpw = hash;
};
UserSchema.methods.checkPassword = async function (password){
  const result = await bcrypt.compare(password, this.userpw)
  return result;
};
UserSchema.methods.serialize = function () {
  const data = this.toJSON();
  delete data.userpw;
  return data;
};
/**
 * 여기서 총 3개의 파라미터를 이용해 토큰을 발급해 줄 건데,
 * 첫번째로는 반환하고 싶은 데이터
 * 두번째로는 jwt 토큰
 * 세번째로는 토큰의 유효기간을
 * 입력합니다.
 */
 UserSchema.methods.generateToken = function () {
  const token = jwt.sign(
    {
      _id: this.id,
      userid: this.userid, // 여기에 토큰과 함께 반환하고 싶은 데이터를 넣습니다.
    },
    process.env.JWT_SECRET, // 여기에 .env에 적어둔 jwt_secret 값이 들어갑니다.
    {
      expiresIn: '7d', // 유효기간 7일을 의미.
    },
  );
  return token;
};
// static 메서드
// 인스턴스 메서드에서의 this는 모델의 인스턴스를 가르키며(class의 객체),
// 스테틱 메서드에서의 this는 user라는 모델 자체(class)를 가르킵니다.
UserSchema.statics.findByUsername = function ( userid ) {
  return this.findOne({ userid });
};

const User = mongoose.model('User', UserSchema);
export default User;