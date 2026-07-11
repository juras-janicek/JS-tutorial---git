"use client";

import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit() {
    try {
      const response = await fetch("/api/hello", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("can't fetch your data");
      }

      setMessage(data.message);
    } catch (error) {
      console.error(error.message);
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

      <button type="button" onClick={handleSubmit}>
        Send
      </button>

      <p>{message}</p>
    </main>
  );
}