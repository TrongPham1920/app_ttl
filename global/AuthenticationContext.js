import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
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

  // Hàm lấy danh sách ngân hàng
  const fetchBanks = async () => {
    try {
      const response = await sabank();
      await SecureStore.setItemAsync("banks", JSON.stringify(response.data));
      setBanks(response.data.sabank);
    } catch (error) {
      console.error("Error fetching bank names:", error);
    }
  };

  // Đăng xuất
  const onLogout = useCallback(async () => {
    try {
      await logout();
      await SecureStore.deleteItemAsync("profile");
      await SecureStore.deleteItemAsync("accessToken");

      setProfile(null);
      router.push("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }, [router]);

  // Đăng nhập
  const onLogin = (data) => {
    SecureStore.setItemAsync("profile", JSON.stringify(data?.user_info));
    SecureStore.setItemAsync("accessToken", JSON.stringify(data?.accessToken));

    setProfile(data?.user_info);
    router.push("/");
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
  }, []); 

  const isAuthenticated = () => !!profile;

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
