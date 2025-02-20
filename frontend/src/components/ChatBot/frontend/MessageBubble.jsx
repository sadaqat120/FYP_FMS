import React from 'react';

const MessageBubble = ({ sender, text }) => {
  return (
    <div
      className={`max-w-[80%] p-2 my-1 rounded-[15px] break-words transition-transform duration-200 ${
        sender === 'user'
          ? 'bg-green-100 self-end shadow-md hover:scale-105 hover:shadow-lg'
          : 'bg-gray-100 self-start shadow-md hover:scale-105 hover:shadow-lg'
      }`}
    >
      <p>{text}</p>
    </div>
  );
};

export default MessageBubble;
