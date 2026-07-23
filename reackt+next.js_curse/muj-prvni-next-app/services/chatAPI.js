async function chatAPI(sessionId, prompt) {
    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                sessionId,
                prompt,
            })
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(error);
        }

        const data = await response.json();

        return data.answer;
    } catch (error) {
        throw error;
    };
};

export default chatAPI;