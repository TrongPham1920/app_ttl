import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { logout, sabank } from "../api/app/app"; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [banks, setBanks] = useState([]);
  const [wsMessages, setWsMessages] = useState([]);
  const socketRef = useRef(null);

  const fetchBanks = async () => {
    try {
      const response = await sabank();
      await SecureStore.setItemAsync("banks", JSON.stringify(response.data));
      setBanks(response.data.sabank);
    } catch (error) {
      console.error("Error fetching bank names:", error);
    }
  };

  const connectSocket = () => {
    
    const wsUrl = "wss://be.trothalo.click/ws";

    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log("WebSocket connected");
      if (profile) {
        ws.send(JSON.stringify({ type: "connection", user: profile?.user_info }));
      }
    };

    ws.onmessage = (event) => {
      console.log("WebSocket received:", event.data);
      setWsMessages((prev) => [...prev, event.data]);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socketRef.current = ws;
  };

  const disconnectSocket = () => {
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
      console.log("WebSocket disconnected");
    }
  };

  const onLogout = useCallback(async () => {
    try {
      await logout();
      await SecureStore.deleteItemAsync("profile");
      await SecureStore.deleteItemAsync("accessToken");

      setProfile(null);
      router.push("/");

      disconnectSocket();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }, [router]);

  const onLogin = (data) => {
    SecureStore.setItemAsync("profile", JSON.stringify(data?.user_info));
    SecureStore.setItemAsync("accessToken", JSON.stringify(data?.accessToken));

    setProfile(data?.user_info);
    router.push("/");

    connectSocket();
  };

  const updateProfile = async (newProfileData) => {
    try {
      await SecureStore.deleteItemAsync("profile");
      await SecureStore.setItemAsync("profile", JSON.stringify(newProfileData));
      setProfile(newProfileData);
    } catch (error) {
      console.error("Error saving profile to SecureStore:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const profileData = await SecureStore.getItemAsync("profile");
        if (profileData) {
          setProfile(JSON.parse(profileData));
        }
        await fetchBanks();
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();

    return () => {
      disconnectSocket();
    };
  }, []);

  const isAuthenticated = () => !!profile;

  const sendMessage = (msg) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(msg);
    } else {
      console.error("WebSocket is not connected.");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        onLogin,
        loading,
        onLogout,
        profile,
        updateProfile,
        banks,
        wsMessages,
        sendMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
