"use client";

import { useState } from "react";
import chatAPI from "@/services/chatAPI.js";

export default function Home() {


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


      <p>{error}</p>
      <h1>let&apos;s chat</h1>
      <input 
        type="text"
        placeholder="enter your prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button onClick={handleChat}>Push</button>
      <p>{answer}</p>
      
    </main>

    
  );
}
