import mongoose, { Schema } from "mongoose";

const RevDataSchema = new Schema({
  id : { type : Number, unique : true },
  name : String,
  address : String
});

const RevData = mongoose.model('RevData', RevDataSchema);
export default RevData;