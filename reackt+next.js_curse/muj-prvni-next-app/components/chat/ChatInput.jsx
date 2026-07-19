export default function ChatInput() {
    return (
        <div className="flex gap-3">
            <input
                type="text"
                placeholder="send message..."
                className="flex-1 rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500"
            />

            <button className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700">
                Send
            </button>
        </div>
    );
}