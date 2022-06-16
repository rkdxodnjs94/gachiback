import mongoose, { Schema } from "mongoose";

const BoardGameSchema = new Schema({
  titles : String,
  images : String,
  people : String,
  ages : String,
  times : String
});

const BoardGame = mongoose.model('BoardGame', BoardGameSchema);
export default BoardGame;