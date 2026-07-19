import ChatItem from "./ChatItem";

export default function ChatList({ chatSessions }) {
    return (
        <div className="space-y-2">
            {chatSessions.length === 0 ? (
                <p className="text-sm text-slate-500">Zatím nemáš žádné chaty.</p>
            ) : (
                chatSessions.map((chatSession) => (
                    <ChatItem key={chatSession.id} chatSession={chatSession} />
                ))
            )}
        </div>
    );
}