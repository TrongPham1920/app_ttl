import { useEffect, useState } from "react";
import { Image } from "react-native";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import { useAuth } from "../../global/AuthenticationContext.js";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { createOder } from "../../api/app/app.js";

const usePaymentModal = ({ params }) => {
  const { profile } = useAuth();
  const router = useRouter();
  const { hotelId, selectedKey, fromDate, toDate, user } = params;

  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const [qr, setQr] = useState("");
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");

  const checkInDate = fromDate;
  const checkOutDate = toDate;

  const parsedUser = user ? JSON.parse(user) : null;
  const parsedSelectedKey = selectedKey ? JSON.parse(selectedKey) : [];
  const { bankShortName, accountNumber } =
    parsedUser.bankShortName && parsedUser.accountNumber
      ? parsedUser
      : parsedUser.banks?.[0] ?? {};

  useEffect(() => {
    if (user) {
      const url = `https://img.vietqr.io/image/${bankShortName}-${accountNumber}-compact.jpg?amount=100000&addInfo=Chuyen khoan dat phong - ${hotelId}`;

      Image.prefetch(url)
        .then(() => {
          setQr(url);
          setIsImageLoading(false);
        })
        .catch(() => {
          setIsImageLoading(false);
          Toast.show({
            type: "error",
            text1: "Lỗi tải ảnh",
            text2: "Không thể tải ảnh QR",
          });
        });
      setGuestPhone("");
      setGuestName("");
    }
  }, [JSON.stringify(params)]);

  const handleCcheck = async () => {
    if (!profile && (!guestName || !guestPhone || !guestEmail)) {
      setIsModalVisible(true);
      return;
    } else {
      handleConfirm();
    }
  };

  const handleConfirm = async () => {
    try {
      setLoading(false);

      const values = profile
        ? {
            userId: profile?.id,
            accommodationId: +hotelId,
            ...(parsedSelectedKey && { roomId: parsedSelectedKey }),
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
          }
        : {
            guestName: guestName,
            guestPhone: guestPhone,
            accommodationId: +hotelId,
            ...(parsedSelectedKey && { roomId: parsedSelectedKey }),
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
          };
      const response = await createOder(values);

      if (response?.code === 1) {
        Toast.show({
          type: "success",
          position: "top",
          text1: response?.mess,
          text2: "Bạn đã đặt phòng thành công",
        });
        setGuestPhone("");
        setGuestName("");
        router.replace("/");
      } else {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Đặt phòng thất bại!!",
          text2: response?.mess || "Đã xảy ra lỗi.",
        });
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        position: "top",
        text1: "Đặt phòng thất bại!!!",
        text2: "Đã xảy ra lỗi, vui lòng thử lại!!!",
      });
    } finally {
      setLoading(true);
    }
  };

  const handleCancel = () => {
    const id = hotelId;
    router.push({
      pathname: "/detail",
      params: { id: id, resetDates: "true" },
    });
  };

  const downloadImageToGallery = async (url, fileName) => {
    try {
      const permission = await MediaLibrary.requestPermissionsAsync();
      if (!permission.granted) {
        Toast.show({
          type: "error",
          text1: "Quyền bị từ chối",
          text2: "Vui lòng cấp quyền để lưu ảnh.",
        });
        return;
      }

      const fileUri = FileSystem.documentDirectory + fileName;
      const downloadResult = await FileSystem.downloadAsync(url, fileUri);

      const asset = await MediaLibrary.createAssetAsync(downloadResult.uri);
      await MediaLibrary.createAlbumAsync("Download", asset, false);

      Toast.show({
        type: "success",
        text1: "Tải ảnh thành công",
        text2: "Ảnh đã được lưu vào thư viện.",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Lỗi tải ảnh",
        text2: "Không thể tải ảnh về thiết bị.",
      });
      console.error(error);
    }
  };

  const handleDownloadImage = () => {
    if (!qr) {
      Toast.show({
        type: "error",
        text1: "Không có ảnh",
        text2: "Không thể tải ảnh vì URL không tồn tại.",
      });
      return;
    }

    const fileName = `qr-${hotelId}.jpg`;
    downloadImageToGallery(qr, fileName);
  };

  return {
    qr,
    guestName,
    guestPhone,
    isModalVisible,
    loading,
    isImageLoading,
    setIsImageLoading,
    handleConfirm,
    handleCcheck,
    handleCancel,
    setIsModalVisible,
    setGuestPhone,
    setGuestName,
    handleDownloadImage,
  };
};

export default usePaymentModal;
