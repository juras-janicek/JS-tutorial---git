

export default async function createEmbedding(text) {
    try {
        if (typeof text !== "string" || text.trim().length === 0) {
            throw new Error("Text for embedding must be a non-empty string.");
        }

        const response = await fetch("/api/embedding", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt: text.trim()
            })
        });

        if (!response.ok) {
            const error = await response.json().catch(() => null);
            throw new Error(error?.error || "Embedding request failed.");
        }

        const data = await response.json();

        if (!Array.isArray(data.embedding)) {
            throw new Error("Embedding response has invalid format.");
        }

        return data.embedding;


    } catch (error) {
        throw error;
    };


};
