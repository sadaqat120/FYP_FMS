import axios from 'axios';

export const sendMessageAPI = async (userMessage, lang) => {
  try {
    const response = await axios.post('http://localhost:5000/api/chat', {
      userMessage,
      lang,
    });
    return response;
  } catch (error) {
    throw new Error("Error sending message to the backend");
  }
};
