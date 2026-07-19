export default function ChatItem({ chatSession }) {
    return (
        <button
            onClick={() => console.log("Vybraný chat:", chatSession.id)}
            className="flex w-full items-center rounded-lg px-3 py-2 text-left transition hover:bg-slate-100"
        >
            💬 {chatSession.title ?? "Bez názvu"}
        </button>
    );
}