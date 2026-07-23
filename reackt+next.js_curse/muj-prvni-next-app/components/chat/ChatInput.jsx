"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import chatAPI from "@/services/chatAPI";

export default function ChatInput({ chatId }) {
    const [prompt, setPrompt] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    async function handleChat() {
        if (!prompt.trim()) {
            setError("Napiš zprávu před odesláním.");
            return;
        }

        try {
            setError("");
            await chatAPI(chatId, prompt.trim());
            setPrompt("");
            router.refresh();
        } catch (error) {
            setError(error?.message || "Nepodařilo se odeslat zprávu.");
        }
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-3">
                <input
                    type="text"
                    placeholder="send message..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="flex-1 rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500"
                />

                <button
                    onClick={handleChat}
                    className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700"
                >
                    Send
                </button>
            </div>

            {error ? <p className="text-sm text-red-600">{error}</p> : null}
        </div>
    );
}