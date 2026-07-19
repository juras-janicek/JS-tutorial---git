"use client";

import { useState } from "react";
import chatAPI from "@/services/chatAPI";
import Sidebar from "@/components/sidebar/Sidebar";

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

      <Sidebar/>
      
    </main>
 
    
  );
}