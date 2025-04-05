import Item from "@/models/itemsSchema"
import connectMongoDB from "../../../../config/mongodb";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    // Handle GET requests

}

export async function POST(request: NextRequest) {
    const { name, owner, description, price, longitude, latitude } = await request.json();
    await connectMongoDB();
    await Item.create({ name, owner, description, price, longitude, latitude });
    return NextResponse.json({ message: "Item added succesfully" }, {status: 200});
}

