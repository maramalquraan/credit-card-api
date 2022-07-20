import { Document } from "mongoose";

export interface CardInterface extends Document {
  cc_number: string;
  name: string;
  balance: number;
  currency: string;
  createdAt: Date,
}
