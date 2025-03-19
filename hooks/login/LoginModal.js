import { useState } from "react";
import { login } from "../../api/app/app";  
import { useAuth } from "../../global/AuthenticationContext";
import Toast from "react-native-toast-message";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { onLogin } = useAuth();
  

  const handleLogin = async (data, reset) => {
    const { Identifier, password } = data;
    setIsLoading(true);

    try {
      const response = await login({ Identifier, password });
      reset();

      if (response.code === 1) {
        onLogin(response?.data);
        Toast.show({
          type: "success",
          position: "top",
          text1: "Đăng nhập thành công",
        });
      } else {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Đăng nhập thất bại",
          text2:
            response.message || "Kiểm tra lại tài khoản hoặc mật khẩu của bạn",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Đăng nhập thất bại",
        text2: "Kiểm tra lại tài khoản hoặc mật khẩu của bạn",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleLogin,
  };
};
