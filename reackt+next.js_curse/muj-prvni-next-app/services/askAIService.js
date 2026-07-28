
import fs from "fs/promises";

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const DEFAULT_FREE_MODEL = "nvidia/nemotron-nano-9b-v2:free";

export function buildOpenRouterMessages(systemPrompt, conversationMessages = []) {
  const normalizedMessages = Array.isArray(conversationMessages)
    ? conversationMessages
    : [conversationMessages];

  return [
    {
      role: "system",
      content: systemPrompt,
    },
    ...normalizedMessages.map((message) => {
      if (typeof message === "string") {
        return { role: "user", content: message };
      }

      return {
        role: message?.role || "user",
        content:
          typeof message?.content === "string"
            ? message.content
            : JSON.stringify(message?.content ?? ""),
      };
    }),
  ];
}

export default async function askAI(messages) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  const SYSTEM_PROMPT = await fs.readFile(
    "prompts/chatSystemPrompt.md",
    "utf8"
  );
  const messagesWithSystem = buildOpenRouterMessages(SYSTEM_PROMPT, messages);

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
      messages: messagesWithSystem,
    }),
  });

  let data = null;

  try {
    data = await response.json();
  } catch (error) {
    data = null;
  }

  if (!response.ok) {
    const providerMessage =
      data?.error?.message || data?.message || `OpenRouter request failed (${response.status}).`;

    throw new Error(providerMessage);
  }

  const answer = data?.choices?.[0]?.message?.content;

  if (!answer) {
    throw new Error("OpenRouter returned an empty response.");
  }

  if (typeof answer !== "string") {
    return answer;
  }

  try {
    return JSON.parse(answer);
  } catch (error) {
    throw new Error("AI returned an invalid JSON response.", {
      cause: error,
    });
  }
}