import supabase from "@/lib/supabase";

export async function saveMessage(sessionId, role, content){
    try{
        
        const { data, error } = await supabase
            .from("messages")
            .insert({
                chat_session_id: sessionId,
                role: role,
                content: content,
            })
            .select();

        if(error){
            throw error;
        };

        return data;

    }catch(error){
        throw error; 
    };
}

export async function getMessages(sessionId) {
    try{

        const {data, error} = await supabase
            .from("messages")
            .select("*")
            .eq("chat_session_id", sessionId)
            .order("created_at", { ascending: true })

        if (error){
            throw error;
        }

        return data;

    }catch(error){
        throw error;
    };
}

export async function mapMessageForAI(message){
    message.map((e) => {
        return {
            role: role,
            content: content
        }
    });
}