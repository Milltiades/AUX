import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const id = params.id;

  const { searchParams } = request.nextUrl;
  const sort = searchParams.get("sort");

  return NextResponse.json(
    { message: "Hello Nextjs", id, sort },
    { status: 201 }
  );
}
