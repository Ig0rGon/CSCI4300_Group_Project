import connectMongoDB from "../../../../../config/mongodb";
import mongoose from "mongoose";
import Item from "@/app/models/itemSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

//handles endpoints for specific items(in /api/items/[id]/route.ts)

interface RouteParams {
    params: { id: string };
}

// Get's unique item
export async function GET(request: NextRequest, { params }:RouteParams) {
    const { id } = await params; //Get the items ID
    await connectMongoDB();
    const item = await Item.findOne({ _id: id }); //finds item with given ID
    return NextResponse.json({ item }, { status: 200 });
}

// Update's unique item
export async function PUT(request: NextRequest, { params }:RouteParams) {
    const { id } = await params; //Get the items ID
    const { name: name, price: price, location: location, lat: lat, lon: lon, imageUrl: imageUrl, category: category } = await request.json(); 
    await connectMongoDB()
    await Item.findByIdAndUpdate(id,  { name, price, location, lat, lon, imageUrl, category }); 
    return NextResponse.json({ message: "Item Updated" }, { status: 200 });
}

// Delte's unique item
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) { //if Id isn't valid
        return NextResponse.json({ messsage: "Invalid ID format" }, { status: 400 });
    }

    await connectMongoDB();
    const deletedItem = await Item.findByIdAndDelete(id);

    if (!deletedItem) { //if item not found
        return NextResponse.json({ message: "Item not found"}, { status: 404 });
    }

    return NextResponse.json({ message: "Item deleted" }, { status: 200 });

}
