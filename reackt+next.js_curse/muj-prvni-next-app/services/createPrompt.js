
import { mapMessageForAI } from './messageService';

export default async function createPrompt(memories, messages) {
    const memoryContext = memories.map((e) => e.content).join("\n");

    const conversation = [
        {
            role: "system",
            content: `Relevant memories: ${memoryContext}`  
        },
        ...await mapMessageForAI(messages)
    ];

    return conversation
};