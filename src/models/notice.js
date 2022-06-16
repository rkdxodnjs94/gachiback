import mongoose, { Schema } from "mongoose";
// 글번호 자동 생성
const autoIncrement = require('mongoose-auto-increment');
const connection = mongoose.createConnection("mongodb://localhost:27017/gachinolja");
autoIncrement.initialize(connection);

const NoticeSchema = new Schema({
  no : { type : Number, unique : true },
  title : String,
  date : String,
  content : String,
  publisher : String,
  publisherID : String,
  views : {type : String, default : '0', require : true }
});
// 글번호 생성
NoticeSchema.plugin(autoIncrement.plugin,{
  model : 'Notice',
  field : 'no',
  startAt: 1, // 시작
  increment: 1  //증가
});

const Notice = mongoose.model('Notice', NoticeSchema);
export default Notice;