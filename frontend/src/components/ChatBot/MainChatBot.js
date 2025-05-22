import React, { useState } from 'react';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import { sendMessageAPI } from './chatService';

function MainChatBot() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState("english");

  const sendMessage = async (userMessage) => {
    const newMessages = [...messages, { sender: 'user', text: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await sendMessageAPI(userMessage, language);
      const botResponse = { sender: 'bot', text: response.data.response };
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [...prev, { sender: 'bot', text: "Sorry, something went wrong." }]);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200 h-[88vh]">
      <div className="flex flex-col h-[85vh] w-full max-w-[600px] bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
        {/* Header Section */}
        <header className="bg-green-600 text-white p-4 text-center font-bold text-lg">
          FMS AI Assistant
        </header>

        {/* Chat Window */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
          {messages.map((msg, index) => (
            <MessageBubble key={index} sender={msg.sender} text={msg.text} />
          ))}
          {isLoading && <MessageBubble sender="bot" text="Thinking..." />}
        </div>

        {/* Input Section */}
        <div className="flex items-center gap-2 p-4 border-t border-gray-300 bg-white">
          {/* <ChatInput sendMessage={sendMessage} /> */}
          <ChatInput sendMessage={sendMessage} language={language} />

          <select
            onChange={(e) => setLanguage(e.target.value)}
            value={language}
            className="w-[80px] px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="english">English</option>
            <option value="urdu">اردو</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default MainChatBot;
