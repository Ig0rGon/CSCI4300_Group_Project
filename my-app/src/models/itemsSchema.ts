import mongoose, { Schema, Document, Model } from "mongoose";

interface IItem extends Document {
    name: String;
    owner: String;
    description?: String;
    price: Number;
    longitude: Number;
    latitude: Number;
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
    }
});

const Item: Model<IItem> = mongoose.models.Item || mongoose.model<IItem>("Item", itemSchema);
export default Item;