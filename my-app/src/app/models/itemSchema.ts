import mongoose, { Schema, Document, Model } from "mongoose";

interface IItem extends Document {
    name: string; 
    price: number;
    location: string;
    lat: number;
    lon: number;
    imageUrl: string;
    category: "Tickets" | "Household Items" | "School Supplies" | "Sporting Goods" | "Clothing" | "Electronics" | "Pet Supplies" | "Other";
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
    lat: {
        type: Number,
        required: true,
    },
    lon: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ["Tickets", "Household Items", "School Supplies", "Sporting Goods", "Clothing", "Electronics", "Pet Supplies", "Other"],
    },
  });

const Item: Model<IItem> = mongoose.models.Item || mongoose.model<IItem>("Item", itemSchema);
export default Item;