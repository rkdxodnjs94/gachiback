import mongoose, { Schema } from "mongoose";
// 글번호 자동 생성
const autoIncrement = require('mongoose-auto-increment');
const connection = mongoose.createConnection("mongodb://localhost:27017/gachinolja");
autoIncrement.initialize(connection);

const PartySchema = new Schema({
  no : { type : Number, unique : true },
  title : String,
  date : String,
  content : String,
  publisher : String,
  publisherID : String,
  people : Number,
  apply : { type : Number, default: 1 },
  applypeople : Object
});
// 글번호 생성
PartySchema.plugin(autoIncrement.plugin,{
  model : 'Party',
  field : 'no',
  startAt: 1, // 시작
  increment: 1  //증가
});

const Party = mongoose.model('Party', PartySchema);
export default Party;