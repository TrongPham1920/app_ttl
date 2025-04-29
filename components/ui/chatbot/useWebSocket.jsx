import { useEffect, useRef } from "react";

export const useChatWebSocket = ({ userId, onMessage }) => {
  const ws = useRef(null);

  useEffect(() => {
    if (!userId) return;

    const url = `wss://be.trothalo.click/wschat?userId=${userId}`;
    console.log("📡 Connecting to:", url);

    const socket = new WebSocket(url);
    ws.current = socket;

    socket.onopen = () => {
      console.log("✅ Chat WebSocket connected");
    };

    socket.onmessage = (event) => {
      const message = event.data;
    
      try {
        const parsed = JSON.parse(message);
        onMessage(parsed);
      } catch (err) {
        console.warn("⚠️ Message không phải JSON:", message);
        onMessage(message); 
      }
    };

    socket.onerror = (err) => {
      console.error("❌ WebSocket error:", err.message);
    };

    socket.onclose = () => {
      console.log("🔌 Chat WebSocket disconnected");
      ws.current = null;
    };

    return () => {
      socket.close();
      ws.current = null;
    };
  }, [userId]);

  const sendMessage = (msg) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(typeof msg === "string" ? msg : JSON.stringify(msg));
    } else {
      console.warn("WebSocket not connected yet");
    }
  };

  return { sendMessage };
};
