import React, { useState, useRef } from 'react';

const ChatInput = ({ sendMessage, language }) => {
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);

  const handleSend = () => {
    if (inputText.trim()) {
      sendMessage(inputText);
      setInputText('');
    }
  };

  const startRecording = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported in this browser. Use Chrome or Edge.');
      return;
    }

    const recognition = new SpeechRecognition();

    // ✅ Use the existing dropdown value (urdu or english) to set speech lang
    recognition.lang = language === 'urdu' ? 'ur-PK' : 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsRecording(true);

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;

      // ✅ Append the spoken text on new line, keep previous content
      setInputText((prevText) =>
        prevText ? `${prevText}\n${spokenText}` : spokenText
      );
    };

    recognition.onerror = (event) => {
      console.error('Speech Recognition Error:', event.error);
      setIsRecording(false);
    };

    recognition.onend = () => setIsRecording(false);

    recognition.start();
    recognitionRef.current = recognition;
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const cancelRecording = () => {
    stopRecording();
    // Do not clear existing text — user may want to keep it
  };

  return (
    <div className="flex flex-col w-full gap-2">
      {/* ✅ Multiline textarea for full message view */}
      <textarea
        rows={3}
        placeholder="Type or speak your message..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="flex w-full px-4 py-2 border border-gray-300 rounded resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
        style={{ minHeight: '80px', maxHeight: '200px', overflowY: 'auto' }}
      />

      <div className="flex items-center gap-2">
        {/* ✅ Mic Controls: Mic, ✔️, ❌ */}
        {!isRecording ? (
          <button
            onClick={startRecording}
            title="Start Voice"
            className="text-sm text-gray-700 border border-gray-300 bg-white rounded-full px-3 py-2 hover:bg-gray-100"
            style={{ fontSize: '16px' }}
          >
            🎤
          </button>
        ) : (
          <>
            <button
              onClick={stopRecording}
              title="Confirm Speech"
              className="bg-green-500 text-white px-3 py-2 rounded-full text-sm hover:bg-green-600"
            >
              ✔️
            </button>
            <button
              onClick={cancelRecording}
              title="Cancel Speech"
              className="bg-red-500 text-white px-3 py-2 rounded-full text-sm hover:bg-red-600"
            >
              ❌
            </button>
          </>
        )}

        {/* ✅ Send Button */}
        <button
          onClick={handleSend}
          className="flex-1 px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
