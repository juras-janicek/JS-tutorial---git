import supabase from "@/lib/supabase";

export async function getSessions(userId = null) {
    try {
        let query = supabase
            .from("chat_sessions")
            .select("*")
            .order("created_at", { ascending: false });

        if (userId !== null && userId !== undefined) {
            query = query.eq("user_id", userId);
        }

        const { data, error } = await query;
        console.log("Data:", data);

        console.log("Error:", error);

        if (error) {
            throw error;
        }

        return data ?? [];
    } catch (error) {
        console.error("Nepodařilo se načíst chaty:", error);
        throw error;
    }
}

export function mapSession(data = []) {
    return data.map((item) => ({
        id: item.id,
        title: item.title ?? "Bez názvu",
        user_id: item.user_id,
        created_at: item.created_at,
    }));
}

export async function addSession(userId, title){
    try{
        const { data, error } = await supabase
            .from('chat_sessions')
            .insert([
                { user_id: userId, title: title },
            ])
            .select();
        
        
        if (error) {
            throw error;
        }  
        console.log(data);

        return data[0]
    }catch(error){
        throw error;
    }
};