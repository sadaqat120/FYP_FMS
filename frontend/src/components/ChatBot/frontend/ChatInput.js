import React, { useState } from 'react';

const ChatInput = ({ sendMessage }) => {
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim()) {
      sendMessage(inputText);
      setInputText('');
    }
  };

  return (
    <div className="flex flex-1 items-center gap-2">
      <input
        type="text"
        placeholder="Type your message..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="flex-[3] px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSend}
        className="flex-[1] px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
