import mongoose, { Schema } from "mongoose";
const ArrageSchema = new Schema({
  arrage : Number,
  publisherID : String,
  people : Number,
  date : String,
  time : String
});
const ReserveSchema = new Schema({
  publisher : String,
  place : String,
  arrage : [ArrageSchema]
});

// static 메서드
// 인스턴스 메서드에서의 this는 모델의 인스턴스를 가르키며(class의 객체),
// 스테틱 메서드에서의 this는 reserve라는 모델 자체(class)를 가르킵니다.
ReserveSchema.statics.findByUsername = function ( publisherID ) {
  return this.findOne({ publisherID });
};

const Reserve = mongoose.model('Reserve', ReserveSchema);
export default Reserve;