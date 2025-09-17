// src/components/Chatbot.jsx
import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import "./Chatbot.css"; // apni CSS file yahan import karo

const TypingIndicator = () => {
  return (
    <div className="typing-indicator">
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

const Chatbot = () => {
  const [messages, setMessages] = useState([]); // { sender, text }
  const [options, setOptions] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false); // new state
  const chatRef = useRef(null);
  const socketRef = useRef(null);

  // socket connection
  useEffect(() => {
    socketRef.current = io("https://socketbot-4gz0.onrender.com");

    socketRef.current.on("bot-message", (msg) => {
      setIsTyping(false); // stop typing indicator
      setMessages((prev) => [...prev, { sender: "bot", text: msg }]);
      setOptions([]); // clear options
    });

    socketRef.current.on("options", (opts) => {
      setOptions(opts);
    });

    // cleanup on unmount
    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, []);

  // scroll to bottom when new message aata hai
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendMessage = (msg) => {
    if (!msg.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", text: msg }]);
    setInput("");
    setOptions([]);
    setIsTyping(true); // show typing indicator
    if (socketRef.current) {
      socketRef.current.emit("user-message", msg);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>
      <h2>ShikshaArt Hackathon Chatbot</h2>
      <div id="container">
        <div id="chat" ref={chatRef}>
          {messages.map((m, i) => (
            <div key={i} className={`msg ${m.sender}`}>
              {m.text}
            </div>
          ))}

          {isTyping && <TypingIndicator />}
        </div>

        <div id="options">
          {options.map((opt, i) => (
            <button key={i} onClick={() => sendMessage(opt)}>
              {opt}
            </button>
          ))}
        </div>

        <div id="inputArea">
          <input
            type="text"
            id="msgInput"
            placeholder="Type message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
          />
          <button className="sendBtn" onClick={() => sendMessage(input)}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
