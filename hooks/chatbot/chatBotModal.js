import { useState } from 'react';

export const useChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const createUserMessage = (text) => ({
    id: Math.round(Math.random() * 1000000),
    text,
    sender: 'user',
  });

  const createBotResponse = () => ({
    id: Math.round(Math.random() * 1000000),
    text: 'Chào bạn! Tôi là TROTHALO, trợ lý ảo của bạn. Tôi có thể giúp bạn đặt phòng khách sạn, tìm kiếm những địa điểm thú vị gần bạn, hoặc hỗ trợ bạn với bất kỳ câu hỏi nào về dịch vụ. Ví dụ: "Tôi muốn đặt phòng khách sạn ở Đà Lạt vào cuối tuần này" hoặc "Cho tôi xem các villa có hồ bơi ở Nha Trang". Bạn chỉ cần nhắn tin, tôi sẽ cố gắng hỗ trợ hết mức có thể nhé!',
    sender: 'bot',
  });

  const onSend = () => {
    if (!inputMessage.trim()) return;

    const newMessage = createUserMessage(inputMessage);
    setMessages((prevMessages) => [newMessage, ...prevMessages]);
    setInputMessage('');

    const botResponse = createBotResponse();
    setTimeout(() => {
      setMessages((prevMessages) => [botResponse, ...prevMessages]);
    }, 1000);
  };

  return {
    messages,
    inputMessage,
    setInputMessage,
    onSend,
  };
};
