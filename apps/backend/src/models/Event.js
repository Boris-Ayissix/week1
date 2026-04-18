import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  event_name: String,
  page: String,
  cta_id: String,
  modal: String,
  method: String,
  view: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Event", EventSchema);