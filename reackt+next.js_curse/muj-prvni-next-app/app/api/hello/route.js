import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const name = body.name;

  return NextResponse.json({
    message: `ahoj: ${name}`,
  });
}
