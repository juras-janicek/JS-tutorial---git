import { saveMessage } from './messageService';
import { getMessages } from './messageService';
import { mapMessageForAI } from './messageService';
import askAI from './askAIService';
import getEmbedding from './getEmbeddingService';
import saveEmbedding from '@/lib/memory';



export default async function sendMessage(sessionId, userMessage, userId){
    try{
        await saveMessage(sessionId, "user", userMessage); 
        const messages = await getMessages(sessionId);
        const conversation = await mapMessageForAI(messages);
        const aiResponse = await askAI(conversation);

        if(aiResponse.saveMemory && aiResponse.confidence >= 0.75){
            const embedding = await getEmbedding(aiResponse.memoryToSave);
            await saveEmbedding(userId, aiResponse.memoryToSave, embedding)
        };

        await saveMessage(sessionId, "assistant", aiResponse.response); 

        return aiResponse.response

    }catch(error){
        console.error(error);
        throw error;
    }


}
