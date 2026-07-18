import NewChatButton from "./NewChatButton";
import ChatList from "./ChatList";

export default function Sidebar() {
    return (
        <aside className="flex w-72 flex-col border-r border-slate-200 bg-white">
            <div className="border-b border-slate-200 p-4">
                <NewChatButton />
            </div>

            <div className="flex-1 overflow-y-auto p-3">
                <ChatList />
            </div>
        </aside>
    );
}
