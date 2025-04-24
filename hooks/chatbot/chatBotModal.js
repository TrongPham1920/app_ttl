import { useState } from 'react';
import { useAuth } from '../../global/AuthenticationContext';
import { useChatWebSocket } from '../../components/ui/chatbot/useWebSocket';

let messageId = 0;

export const useChatBot = () => {
  const { profile } = useAuth();
  const [messages, setMessages] = useState([
    {
      id: messageId++,
      text: '👋 Chào bạn, bạn cần Trothalo hỗ trợ gì nào?',
      sender: 'bot',
      data: null,
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const { sendMessage } = useChatWebSocket({
    userId: profile?.id,
    onMessage: (data) => {
      if (Array.isArray(data)) {
        const rawMsg = {
          id: messageId++,
          sender: 'bot',
          data: data,  
          text: null,  
        };
        setMessages((prev) => [rawMsg, ...prev]);
      } else {
        const botMsg = {
          id: messageId++,
          text: data.message || data,
          sender: 'bot',
          data: null,
        };
        setMessages((prev) => [botMsg, ...prev]);
      }
    },
  });

  const onSend = () => {
    if (!inputMessage.trim()) return;

    const userMsg = {
      id: messageId++,
      text: inputMessage,
      sender: 'user',
      data: null,
    };
    setMessages((prev) => [userMsg, ...prev]);

    sendMessage({ message: inputMessage });
    setInputMessage('');
  };

  return {
    messages,
    inputMessage,
    setInputMessage,
    onSend,
  };
};
