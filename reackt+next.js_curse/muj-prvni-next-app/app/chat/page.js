"use client";

import { useState } from "react";
import chatAPI from "@/services/chatAPI";
import ChatInput from "@/components/chat/ChatInput";
import ChatWindow from "@/components/chat/ChatWindow";
import Chat from "./chatID/page";

export default function ChatHome() {


  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");

  const [error, setError] = useState("");
  
  async function handleChat(){
    try{
      setError("");
      const response = await chatAPI(prompt);
      setAnswer(response);
      setPrompt("");
    }catch(error){
      setError(error.message);
    }
  }

  return (
    <main>

        <Chat/>


    </main>
 
    
  );
}