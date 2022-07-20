import mongoose, { Schema } from "mongoose";
import { CardInterface } from "./card.model.interface";

const CardSchema: Schema = new Schema({
  cc_number: { type: String, required: true },
  name: { type: String, required: true },
  balance: { type: Number, required: true, default: 0 },
  currency: { type: String, required: true, default: "£" },
  createdAt: {type: Date, required: true, default: new Date()}
});

export default mongoose.model<CardInterface>("CardModel", CardSchema);
