import path from 'path';
import fs from 'fs/promises';

async function saveMemory(){
    try{
        const cesta = path.resolve('./database/logs/ai_memory.json');
        const data = await fs.readFile(cesta, 'utf-8');

        const change = JSON.parse(data);

        if(!change.name || !change.mood || !change.interactionCount){
            throw new Error("misssing main infornetion")
        }

        change.mood = "happy jak dva grepy";
        change.interactionCount++;
        change.lastChecked = new Date().toISOString();

        await fs.writeFile(cesta, JSON.stringify(change, null, 2), 'utf-8');


    }catch (error) {
        console.error(`neco je spatne: ${error.message}`);
    }
    
}