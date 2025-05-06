import { useEffect, useState } from 'react';
import { useAuth } from '../../global/AuthenticationContext';
import { useChatWebSocket } from '../../components/ui/chatbot/useWebSocket';

const fetchChatHistory = async (userId, page = 1, limit = 20) => {
  try {
    const res = await fetch(`https://be.trothalo.click/api/v1/chat_history/${userId}?page=${page}&limit=${limit}`);
    const data = await res.json();

    const parsedMessages = data.data.map((msg) => {
      if (msg.message_type === 'json') {
        let parsedData = [];
        try {
          parsedData = JSON.parse(msg.content);
        } catch (e) {
          console.error('JSON parsing error:', e);
        }

        return {
          id: msg.id,
          sender: msg.sender,
          text: null,
          data: parsedData,
          timestamp: new Date(msg.created_at),
        };
      }

      return {
        id: msg.id,
        sender: msg.sender,
        text: msg.content,
        data: null,
        timestamp: new Date(msg.created_at),
      };
    });

    return parsedMessages;
  } catch (error) {
    console.error('Failed to fetch chat history:', error);
    return [];
  }
};

export const useChatBot = () => {
  const { profile } = useAuth();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const { sendMessage } = useChatWebSocket({
    userId: profile?.id,
    onMessage: (data) => {
      const newMsg = Array.isArray(data)
        ? {
            id: Date.now(),
            sender: 'bot',
            text: null,
            data: data,
            timestamp: new Date(),
          }
        : {
            id: Date.now(),
            sender: 'bot',
            text: data.message || data,
            data: null,
            timestamp: new Date(),
          };

      setMessages((prev) => [...prev, newMsg]);
    },
  });

  useEffect(() => {
    const loadHistory = async () => {
      if (!profile?.id) return;

      const history = await fetchChatHistory(profile.id);
      setMessages([
        ...history,
        {
          id: 'welcome',
          text: '👋 Chào bạn, mình là Trothalo - trợ lý tìm phòng của bạn!\n\n🛏️ Hãy cho mình biết bạn cần tìm phòng:\n• Bao nhiêu người?\n• Ở khu vực nào?\n• Tầm giá khoảng bao nhiêu?\n\n📞 Nếu bạn muốn tìm thông tin liên hệ, hãy nhập "Liên hệ" nhé!',
          sender: 'bot',
          data: null,
          timestamp: new Date(),
        },
      ]);
    };

    loadHistory();
  }, [profile?.id]);

  const onSend = () => {
    if (!inputMessage.trim()) return;

    const userMsg = {
      id: Date.now(),
      type: 'text',
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    sendMessage(JSON.stringify(userMsg));
    setInputMessage('');
  };

  return {
    messages,
    inputMessage,
    setInputMessage,
    onSend,
  };
};
