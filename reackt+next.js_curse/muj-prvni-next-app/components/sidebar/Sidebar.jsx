"use client";

import { useEffect, useState } from "react";

import NewChatButton from "./NewChatButton";
import ChatList from "./ChatList";

import { getSessions, mapSession } from "@/services/sesionService";

export default function Sidebar() {
    const [chatSessions, setChatSessions] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadSessions() {
            try {
                const sessions = await getSessions();
                console.log("Sessions:", sessions);
                setChatSessions(mapSession(sessions));
                setError("");
            } catch (error) {
                console.error(error);
                setError("Nepodařilo se načíst chaty z Supabase.");
            }
        }

        loadSessions();
    }, []);


    return (
        <aside className="flex w-72 flex-col border-r border-slate-200 bg-white">
            <div className="border-b border-slate-200 p-4">
                <NewChatButton />
            </div>

            <div className="flex-1 overflow-y-auto p-3">
                {error ? (
                    <p className="text-sm text-red-600">{error}</p>
                ) : (
                    <ChatList chatSessions={chatSessions} />
                )}
            </div>
        </aside>
    );
}