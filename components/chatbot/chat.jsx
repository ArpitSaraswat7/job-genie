// app/components/ChatBox.js
"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./chat.module.css";
import { FaCommentDots, FaTimes, FaPaperPlane } from "react-icons/fa";
import chatbotOutput from "@/actions/chatbot-output";

export default function ChatBox() {
  const [messages, setMessages] = useState([
    { text: "Hi! How can I help?", sender: "bot" },
  ]);
  const [userInput, setUserInput] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isChatOpen) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [messages, isChatOpen]);

  const sendMessage = () => {
    if (userInput.trim() === "") return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: userInput, sender: "user" },
    ]);

    setUserInput("");

    setTimeout(() => {
      const botReply = generateResponse(userInput);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botReply, sender: "bot" },
      ]);
    }, 500);
  };

  const generateResponse = async (input) => {
    const message = input.toLowerCase();

    if (message.includes("hello") || message.includes("hi")) {
      return "Hello! How can I assist you?";
    } else if (message.includes("what is Resume Builder")) {
      return "A resume builder is a software tool, often accessible online, designed to assist individuals in crafting professional resumes. These tools simplify the resume creation process through a variety of features. Primarily, they offer pre-designed templates, which are not only visually appealing but often formatted to be compatible with Applicant Tracking Systems (ATS). Furthermore, these builders manage the intricate task of formatting, ensuring a consistent presentation through uniform fonts, spacing, and layouts";
    } else if (message.includes("your name")) {
      return "I am a friendly chatbot!";
    } else {
      return await chatbotOutput(message);
    }
  };

  const toggleChat = () => {
    setIsChatOpen((prevState) => !prevState);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.chatToggle} onClick={toggleChat}>
        {isChatOpen ? (
          <FaTimes size={24} color="#fff" />
        ) : (
          <FaCommentDots size={24} color="#fff" />
        )}
      </div>

      {isChatOpen && (
        <div className={styles.chatBox}>
          <div className={styles.chatHeader}>
            <h3>Chat</h3>
            <button onClick={toggleChat} className={styles.closeButton}>
              <FaTimes size={18} />
            </button>
          </div>
          <div className={styles.chatMessages}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`${styles.message} ${styles[message.sender]}`}
              >
                <p>{message.text}</p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className={styles.inputContainer}>
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type a message..."
              className={styles.input}
              onKeyPress={handleKeyPress}
            />
            <button onClick={sendMessage} className={styles.sendButton}>
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
