export default function ChatItem({ title }) {
    return (
        <button className="flex w-full items-center rounded-lg px-3 py-2 text-left transition hover:bg-slate-100">
            💬 {title}
        </button>
    );
}