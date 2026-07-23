const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const DEFAULT_FREE_MODEL = "nvidia/nemotron-nano-9b-v2:free";

export default async function askAI(messages) {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is missing.");
  }

  const model = process.env.OPENROUTER_MODEL || DEFAULT_FREE_MODEL;


  const response = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost:3000",
      "X-Title": "Muj prvni Next chatbot",
    },
    body: JSON.stringify({
      model,
      messages,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error?.message || "OpenRouter request failed.");
  }

  const answer = data?.choices?.[0]?.message?.content;

  if (!answer) {
    throw new Error("OpenRouter returned an empty response.");
  }

  return answer;
}