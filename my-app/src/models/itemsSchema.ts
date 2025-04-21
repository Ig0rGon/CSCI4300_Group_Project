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
    },
    owner: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    latitude: {
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