import mongoose, { Schema } from "mongoose";

const PartySchema = new Schema({
  id : { type : Number, unique : true },
  title : String,
  date : {type: Date, default: Date.now},
  content : String,
  publisher : String
});

const Party = mongoose.model('Party', PartySchema);
export default Party;