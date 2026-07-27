import supabase from "./supabase";


export default async function saveEmbedding(userId, content, embedding) {
    try {
        const { data, error } = await supabase
            .from("memories")
            .insert({
                user_id: userId,
                content,
                embedding
            })
            .select();
        if (error) {
            throw error;
        }

        return data

    } catch (error) {
        throw error;
    }
};

