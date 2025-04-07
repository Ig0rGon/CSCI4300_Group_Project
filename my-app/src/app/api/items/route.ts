import connectMongoDB from "../../../../config/mongodb";
import Item from "@/app/models/itemSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
//handles endpoints for our set of items (in /api/items/route.ts)


export async function GET(request: NextRequest) {
    await connectMongoDB();
    const items = await Item.find();
    return NextResponse.json({ items })
}

export async function POST(request: NextRequest) {
    const { id, name, price, location, imageUrl } = await request.json();
    await connectMongoDB();
    await Item.create({ id, name, price, location, imageUrl });
    return NextResponse.json({ message: "item added succesfully" }, { status: 201 });
}
