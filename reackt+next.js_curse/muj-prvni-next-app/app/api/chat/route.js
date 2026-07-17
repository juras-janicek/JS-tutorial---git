import { NextResponse } from "next/server";
import sendMessage from "@/services/chatService";

export async function POST(request) {
  try {
    const { sessionId, prompt } = await request.json();

    if (!sessionId || typeof prompt !== "string" || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: "sessionId and prompt are required." },
        { status: 400 }
      );
    }

    const answer = await sendMessage(sessionId, prompt);

    return NextResponse.json({ answer });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
