"use client"

import { useRouter } from "next/navigation";

export default function ChatItem({ chatSession }) {
    const router = useRouter();

    return (
        <button
            onClick={() => router.push(`/chat/${chatSession.id}`)}
            className="flex w-full items-center rounded-lg px-3 py-2 text-left transition hover:bg-slate-100"
        >
            💬 {chatSession.title ?? "Bez názvu"}
        </button>
    );
}