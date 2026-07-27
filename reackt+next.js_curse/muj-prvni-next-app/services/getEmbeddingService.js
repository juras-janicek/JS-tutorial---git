
const OPENROUTER_EMBEDDING_URL = "https://openrouter.ai/api/v1/embeddings";
const DEFAULT_EMBEDDING_MODEL = "nvidia/llama-nemotron-embed-vl-1b-v2:free";

export default async function getEmbedding(input) {
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
        throw new Error("OPENROUTER_API_KEY is missing.");
    }

    if (typeof input !== "string" || input.trim().length === 0) {
        throw new Error("Embedding input must be a non-empty string.");
    }

    const model = process.env.OPENROUTER_EMBEDDING_MODEL || DEFAULT_EMBEDDING_MODEL;

    const response = await fetch(OPENROUTER_EMBEDDING_URL, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:3000",
            "X-Title": "Muj prvni Next chatbot",
        },
        body: JSON.stringify({
            model,
            input: input.trim(),
        })
    });


    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.error?.message || "OpenRouter request failed.");
    }

    const embedding = data?.data?.[0]?.embedding;

    if (!Array.isArray(embedding) || embedding.length === 0) {
        throw new Error("OpenRouter returned an empty embedding.");
    }

    return embedding;
}
