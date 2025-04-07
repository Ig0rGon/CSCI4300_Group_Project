import mongoose, { Schema, Document, Model } from "mongoose";

interface IItem extends Document {
    name: string;
    price: number;
    location: string;
    imageUrl: string;
  }

  const itemSchema = new Schema<IItem>({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
  });

const Item: Model<IItem> = mongoose.models.Item || mongoose.model<IItem>("Item", itemSchema);
export default Item;