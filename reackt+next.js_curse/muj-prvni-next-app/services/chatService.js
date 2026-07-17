import { saveMessage } from './messageService';
import { getMessages } from './messageService';
import { mapMessageForAI } from './messageService';
import askAI from './askAIService';

export default async function sendMessage(sessionId, userMessage){
    try{
        await saveMessage(sessionId, "user", userMessage); 
        const messages = await getMessages(sessionId);
        const memory = mapMessageForAI(messages);
        const response = await askAI(memory);
        await saveMessage(sessionId, "assistant", response);  

        return response

    }catch(error){
        console.error(error);
        throw error;
    }


}