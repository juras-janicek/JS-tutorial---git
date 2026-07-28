
import { NextResponse } from "next/server";
import getEmbedding from "@/services/embenddngs/getEmbeddingService";

export async function POST(request) {
  try {
    const { prompt } = await request.json();

    if (typeof prompt !== "string" || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: "prompt is required." },
        { status: 400 }
      );
    }

    const embedding = await getEmbedding(prompt);
    
    return NextResponse.json({ embedding });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
