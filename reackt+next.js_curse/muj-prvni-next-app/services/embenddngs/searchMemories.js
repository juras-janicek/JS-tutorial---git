
import supabase from "@/lib/supabase";

export default async function searchMemories(userId, embedding, limit = 5, threshold = 0.3){
    try{    
        const { data, error } = await supabase.rpc("search_memories", {
            p_user_id: userId,
            p_embedding: embedding,
            p_limit: limit,
            p_threshold: threshold,
        });

        if(error){
            throw error;
        }

        return data
    }catch(error){
        throw error;
    };
};