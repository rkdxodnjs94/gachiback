import mongoose, { Schema } from "mongoose";

const InquirySchema = new Schema({
  title : String,
  date : String,
  content : String,
  publisher : String,
  publisherID : String
});

const Inquiry = mongoose.model('Inquiry', InquirySchema);
export default Inquiry;