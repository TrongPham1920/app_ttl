import { useState } from "react";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { register } from "../../api/app/app";

const useRegister = (reset) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onRegister = async (data) => {
    const { Email, PhoneNumber, Password, ConfirmPassword } = data;

    if (Password !== ConfirmPassword) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Lỗi",
        text2: "Mật khẩu không khớp",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await register({ PhoneNumber, Email, Password });

      if (response.code === 1) {
        reset();
        router.push("/screen/login");
        Toast.show({
          type: "success",
          position: "top",
          text1: "Thành công",
          text2: response.message || "Đăng ký thành công",
        });
      } else {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Đăng ký thất bại",
          text2: response.message || "Vui lòng thử lại",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Đăng ký thất bại",
        text2: "Lỗi máy chủ, vui lòng thử lại",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { onRegister, isLoading };
};

export default useRegister;
