
import { getMessages } from "@/services/messageService";

export default async function ChatWindow({chatId}) {

    const messages = await getMessages(chatId);
    return (
        <div className="space-y-4">

            {    
                messages.map((message) => {
                    return message.role == "user" ? (
                        <div key={message.id} className="rounded-lg bg-white p-4 shadow-sm">
                            👤 {message.content}
                        </div>                        
                    ) : (
                        <div key={message.id} className="rounded-lg bg-blue-600 p-4 text-white shadow-sm">
                            🤖 {message.content}
                        </div>                        
                    )
                })
                    
            }
        </div>
    );
}