import { saveMessage } from './messageService';
import { getMessages } from './messageService';
import askAI from './askAIService';
import getEmbedding from './embenddngs/getEmbeddingService';
import saveEmbedding from './embenddngs/saveEmbendding';
import searchMemories from './embenddngs/searchMemories';
import createPrompt from './createPrompt';


export default async function sendMessage(sessionId, userMessage, userId){
    try{
        await saveMessage(sessionId, "user", userMessage); 

        const search_embedding = await getEmbedding(userMessage)       
        const memories = await searchMemories(userId, search_embedding); 
        console.log(memories)

        const messages = await getMessages(sessionId);

        const main_prompt = await createPrompt(memories, messages);

        const aiResponse = await askAI(main_prompt);

        if (aiResponse?.saveMemory && aiResponse?.confidence >= 0.75) {
            const save_embedding = await getEmbedding(aiResponse.memoryToSave);
            await saveEmbedding(userId, aiResponse.memoryToSave, save_embedding)
        };

        const assistantResponse = aiResponse?.response || aiResponse;

        await saveMessage(sessionId, "assistant", assistantResponse); 

        return assistantResponse

    }catch(error){
        console.error(error);
        throw error;
    }


}
