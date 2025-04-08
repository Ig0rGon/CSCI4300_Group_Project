import connectMongoDB from "../../../../../config/mongodb";
import Item from "@/app/models/itemSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

//handles endpoints for specific items(in /api/items/[id]/route.ts)

export async function GET(request: NextRequest) {
    // Handle GET requests
}

export async function PUT(request: NextRequest) {
    // Handle PUT requests
}

export async function DELETE(request: NextRequest) {
    // Handle DELETE requests
}
