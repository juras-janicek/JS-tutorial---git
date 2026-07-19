export default function ChatHeader({ title }) {
    return (
        <header className="border-b border-slate-200 bg-white px-6 py-4">
            <h1 className="text-xl font-semibold">
                {title}
            </h1>
        </header>
    );
}