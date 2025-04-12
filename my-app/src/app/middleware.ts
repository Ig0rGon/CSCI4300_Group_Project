import { NextRequest, NextResponse } from "next/server";

const middleware = (request: NextRequest) => {
    const { pathname } = request.nextUrl;


    console.log(`Restricted route hit: ${pathname}`);
    console.log("Can't go there!");

    return NextResponse.redirect(new URL("/", request.url))
}


export const config = {
    matcher: "/:path*",
};

export default middleware;