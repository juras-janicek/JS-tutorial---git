import supabase from "@/lib/supabase";

export async function saveMessage(sessionId, role, content) {
    try {
        console.log("chat_id:", sessionId);
        const { data, error } = await supabase
            .from("messages")
            .insert({
                chat_id: sessionId,
                role: role,
                content: content,
            })
            .select();

        if (error) {
            throw error;
        };

        return data;

    } catch (error) {
        throw error;
    };
}

export async function getMessages(sessionId) {
    try {

        const { data, error } = await supabase
            .from("messages")
            .select("*")
            .eq("chat_id", sessionId)
            .order("created_at", { ascending: true })

        if (error) {
            throw error;
        }
        return data;

    } catch (error) {
        throw error;
    };
}

export async function mapMessageForAI(message) {
    return message.map((e) => ({ 
        role: e.role, 
        content: e.content 
    }));
}