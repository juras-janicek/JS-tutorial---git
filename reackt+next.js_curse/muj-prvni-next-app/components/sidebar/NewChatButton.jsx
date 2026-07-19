"use client"

import { addSession } from "@/services/sesionService";
import { useRouter } from "next/navigation";

export default function NewChatButton() {
    const router = useRouter();
    async function createNewChat(userId){

        const title = window.prompt("Enter a title of the chat")
        const session = await addSession(userId, title)
        router.push(`/chat/${session.id}`);
    };

    return (
        <button onClick={() => {createNewChat(2)}} className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700">
            + New Chat
        </button>
    );
}