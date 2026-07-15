"use client";

import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");

  const [error, setError] = useState("");
  
  async function handleSend() {
    try {
      setError("");

      const response = await fetch("/api/hello", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name })

      });

      if (!response.ok) {
        throw new Error("can't fetch your data");
      }

      const data = await response.json();

      setMessage(data.message);
    } catch (error) {
      setError(error.message);
    }
  }

  async function handlePrompt() {
    try {
      setError("");
      setAnswer("");

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt })

      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "can't fetch your data");
      }

      setAnswer(data.answer);
    } catch (error) {
      setError(error.message);
    }
  }  

  return (
    <main>
      <h1>say hello</h1>
      <input
        type="text"
        placeholder="enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button type="button" onClick={handleSend}>
        Send
      </button>

      <p>{message}</p>
      
      <p>{error}</p>
      <h1>let&apos;s chat</h1>
      <input 
        type="text"
        placeholder="enter your prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button onClick={handlePrompt}>push</button>
      <p>{answer}</p>
      
    </main>

    
  );
}
