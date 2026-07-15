import { NextResponse } from "next/server";

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const DEFAULT_FREE_MODEL = "nvidia/nemotron-nano-9b-v2:free";

export async function POST(request) {
  try {
    const body = await request.json();
    const prompt = body.prompt;

    if (typeof prompt !== "string" || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: "Prompt is required." },
        { status: 400 }
      );
    }

    const apiKey =
      process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "OPENROUTER_API_KEY is missing in .env.local." },
        { status: 500 }
      );
    }

    if (!apiKey.startsWith("sk-or-v1-")) {
      return NextResponse.json(
        {
          error:
            "OPENROUTER_API_KEY must be a real OpenRouter key starting with sk-or-v1-.",
        },
        { status: 500 }
      );
    }

    const model = process.env.OPENROUTER_MODEL || DEFAULT_FREE_MODEL;

    if (!model.endsWith(":free")) {
      return NextResponse.json(
        { error: "Only OpenRouter models ending with :free are allowed." },
        { status: 400 }
      );
    }

    const openRouterResponse = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Muj prvni Next chatbot",
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "system",
            content: "Odpovidej cesky, kratce a prakticky.",
          },
          {
            role: "user",
            content: prompt.trim(),
          },
        ],
      }),
    });

    const data = await openRouterResponse.json();
    console.log(data);

    if (!openRouterResponse.ok) {
      return NextResponse.json(
        {
          error:
            data?.error?.message ||
            "OpenRouter request failed. Check your API key and free model.",
        },
        { status: openRouterResponse.status }
      );
    }

    const answer = data?.choices?.[0]?.message?.content;

    if (!answer) {
      return NextResponse.json(
        { error: "OpenRouter returned an empty response." },
        { status: 502 }
      );
    }

    console.log(answer);

    return NextResponse.json({
        answer,
        model: data.model || model,
        usage: data.usage || null,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
