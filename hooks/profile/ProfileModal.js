import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { addIMG, resendcode, verifyemail, resetpassword, updateuser } from "../../api/app/app";
import Toast from 'react-native-toast-message';  
import { useAuth } from "../../global/AuthenticationContext";

const convertImageToFile = (image) => {
    const { uri, fileName, mimeType } = image;
    const fileType = mimeType || 'image/jpeg';
    const file = {
      uri: uri,
      name: fileName || `image_${Date.now()}.jpg`, 
      type: fileType,
    };
    return file;
};

const useProfile = () => {
  const router = useRouter();
  const { profile, loading, onLogout, updateProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState();
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Bạn cần cấp quyền truy cập thư viện ảnh");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      const imageFile = pickerResult.assets[0];
      const file = await convertImageToFile(imageFile);
      try {
        const response = await addIMG(file);
        console.log("Response from addIMG:", response);
        if (response.url) {
          setAvatarUrl(response.url); 
        }
      } catch (error) {
        console.error("Error in addIMG:", error);
        Toast.show({
          type: "error",
          position: "top",
          text1: "Lỗi khi tải ảnh lên",
          text2: "Đã xảy ra lỗi khi tải ảnh, vui lòng thử lại.",
        });
      }
    } else {
      console.log("Người dùng đã hủy chọn ảnh.");
    }
  };

  useEffect(() => {
    if (!loading && !profile) {
      router.replace("/login"); 
    }
  }, [loading, profile, router]);

  const handleLogout = () => {
    setAvatarUrl(null); 
    setShowChangePasswordModal(false);
    setShowVerificationModal(false);
    setShowUpdateModal(false);
    onLogout(); 
  };

  const handleClickResend = async (identifier) => {
    try {
      setIsLoading(true);
      const response = await resendcode({ identifier });

      if (response?.code === 1) {
        Toast.show({
          type: "success",
          position: "top",
          text1: response?.mess,
          text2: "Kiểm tra hộp thư của bạn để nhận mã.",
        });
      } else {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Gửi mã thất bại",
          text2: response?.mess || "Đã xảy ra lỗi.",
        });
      }
    } catch (error) {
      console.error("Error during resend:", error);
      Toast.show({
        type: "error",
        position: "top",
        text1: "Đã xảy ra lỗi! Vui lòng thử lại.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendVerificationEmail = async (values) => {
    const param = { token: values };
    try {
      setIsLoading(true);
      const response = await verifyemail(param);
      if (response?.code === 1) {
        Toast.show({
          type: "success",
          position: "top",
          text1: response.mess,
          text2: "Xác thực thành công.",
        });
      } else {
        Toast.show({
          type: "error",
          position: "top",
          text1: response.mess || "Đã xảy ra lỗi.",
          text2: "Vui lòng thử lại.",
        });
      }
    } catch (error) {
      console.error("Error during verify email:", error);
      Toast.show({
        type: "error",
        position: "top",
        text1: "Đã xảy ra lỗi! Vui lòng thử lại.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitChangePassword = async (values) => {
    const identifier = profile.email;
    const password = values;
  
    const data = {
      identifier,
      password,
    };
  
    setIsLoading(true);
    try {
      const response = await resetpassword(data);
  
      if (response?.code === 1) {
        Toast.show({
          type: "success",
          position: "top",
          text1: response.mess,
          text2: "Mật khẩu đã được thay đổi thành công.",
        });
      } else {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Thay đổi mật khẩu thất bại",
          text2: response.mess || "Đã xảy ra lỗi, vui lòng thử lại.",
        });
      }
    } catch (error) {
      console.error("Error during reset password:", error);
      Toast.show({
        type: "error",
        position: "top",
        text1: "Đã xảy ra lỗi!",
        text2: "Vui lòng thử lại sau.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleUpdateProfile = async (values) => {
    try {
      const response = await updateuser(values);
      if (response.code === 1) {
        updateProfile(response.data)
        Toast.show({
          type: "success",
          position: "top",
          text1: "Cập nhật thành công",
        });
      } else {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Cập nhật thất bại",
          text2: response.message || "Có lỗi xảy ra.",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Đã xảy ra lỗi khi cập nhật thông tin.",
      });
    }
  };

  return {
    profile,
    loading,
    isLoading,
    avatarUrl,
    showChangePasswordModal,
    setShowChangePasswordModal,
    showVerificationModal,
    setShowVerificationModal,
    showUpdateModal,
    setShowUpdateModal,
    handleLogout,
    pickImage,
    handleClickResend,
    handleSendVerificationEmail,
    handleSubmitChangePassword,
    handleUpdateProfile
  };
};

export default useProfile;
