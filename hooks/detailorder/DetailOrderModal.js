import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { getOrderDetail, deleteOrder } from "../../api/app/app";

const useOrderDetailModal = ({ id }) => {
  const [detail, setDetail] = useState();
  const [loading, setLoading] = useState(true);

  const fetchData = async (id) => {
    try {
      const response = await getOrderDetail(id);
      if (response?.data) {
        setDetail(response.data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu đơn hàng: ", error);
    } finally {
      setLoading(false);
    }
  };

  const onOk = async () => {
    try {
      setLoading(true);
      const response = await deleteOrder({ id: Number(id), status: 2 });
      if (response?.code === 1) {
        Toast.show({
          type: "success",
          position: "top",
          text1: "Hủy thành công",
        });
        await fetchData(id);
      } else {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Hủy thất bại",
          text2: response?.message || "Có lỗi xảy ra, vui lòng thử lại",
        });
      }
    } catch (error) {
      console.error("Lỗi khi hủy đơn hàng: ", error);
      Toast.show({
        type: "error",
        position: "top",
        text1: "Hủy thất bại",
        text2: "Có lỗi xảy ra, vui lòng thử lại",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  return { detail, loading, onOk };
};

export default useOrderDetailModal;
