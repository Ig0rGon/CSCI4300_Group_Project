import Item from "@/models/itemsSchema"
import connectMongoDB from "../../../../config/mongodb";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    await connectMongoDB();
    const items = await Item.find();
    return NextResponse.json({ items }, {status: 200}) //IDK what the status code should be
}

export async function POST(request: NextRequest) {
    const { id, name, price, location, lat, lon, imageUrl, category } = await request.json(); 
    await connectMongoDB();
    await Item.create({ id, name, price, location, lat, lon, imageUrl, category }); 
    return NextResponse.json({ message: "item added succesfully" }, { status: 201 });
}

