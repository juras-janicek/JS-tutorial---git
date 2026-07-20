
import { getSessionTile } from "@/services/sesionService";

export default async function ChatHeader({chatId}) {
    
    const t = await getSessionTile(chatId);
    return (
        <header className="border-b border-slate-200 bg-white px-6 py-4">
            <h1 className="text-xl font-semibold">
                {t}
            </h1>
        </header>
    );
}