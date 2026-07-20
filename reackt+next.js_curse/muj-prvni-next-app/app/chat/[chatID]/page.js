import Sidebar from "@/components/sidebar/Sidebar";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatWindow from "@/components/chat/ChatWindow";
import ChatInput from "@/components/chat/ChatInput";

export default async function Chat({ params }) {
    const {chatID} = await params;


    return (
        <div className="flex h-screen bg-slate-100">
            <Sidebar />

            <main className="flex flex-1 flex-col">
                <ChatHeader 
                chatId={chatID}/>

                <div className="flex-1 overflow-y-auto p-6">
                    <ChatWindow 
                    chatId={chatID}/>
                </div>

                <div className="border-t border-slate-200 bg-white p-4">
                    <ChatInput 
                    chatId={chatID}/>
                </div>
            </main>
        </div>
    );
}