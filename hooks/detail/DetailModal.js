import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { detailaccommodation } from "../../api/app/app";
import { useAuth } from "../../global/AuthenticationContext";
import dayjs from "dayjs";

const DetailModal = ({ id, date }) => {
  const router = useRouter();
  const { banks } = useAuth();

  const [detailData, setDetailData] = useState({});
  const [isDescriptionLong, setIsDescriptionLong] = useState(false);
  const [loading, setLoading] = useState(true);

  const [showDateModal, setShowDateModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    date?.fromDate && date?.toDate
      ? { fromDate: date.fromDate, toDate: date.toDate }
      : { fromDate: null, toDate: null }
  );

  const userWithBanks = {
    ...detailData?.user,
    banks, 
  };

  const fetchData = async (id) => {
    try {
      setLoading(true);
      const response = await detailaccommodation(id);
      setDetailData(response?.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu detail accommodation: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setDetailData({});
    setSelectedDate(
      date?.fromDate && date?.toDate
        ? { fromDate: date.fromDate, toDate: date.toDate }
        : { fromDate: null, toDate: null }
    );
    fetchData(id);
  }, [id, date]);

  const goToRoomList = () => {
    if (!selectedDate?.fromDate || !selectedDate?.toDate) {
      setShowDateModal(true);
      return;
    }

    if (detailData?.type === 0) {
      router.push({
        pathname: "/listroom",
        params: {
          hotelId: detailData?.id,
          fromDate: selectedDate.fromDate,
          toDate: selectedDate.toDate,
          user: JSON.stringify(userWithBanks),
        },
      });
    } else {
      router.push({
        pathname: "/payment",
        params: {
          hotelId: detailData?.id,
          fromDate: selectedDate.fromDate,
          toDate: selectedDate.toDate,
          user: JSON.stringify(userWithBanks),
        },
      });
    }
  };

  const handleToggleDescription = () => {
    setIsDescriptionLong(!isDescriptionLong);
  };

  const handleDateSelection = (fromDate, toDate) => {
    const formattedFromDate = dayjs(fromDate).format("DD/MM/YYYY");
    const formattedToDate = dayjs(toDate).format("DD/MM/YYYY");
    setSelectedDate({ fromDate: formattedFromDate, toDate: formattedToDate });
    setShowDateModal(false);

    // Điều hướng ngay sau khi chọn ngày
    if (detailData?.type === 0) {
      router.push({
        pathname: "/listroom",
        params: {
          hotelId: detailData?.id,
          fromDate: formattedFromDate,
          toDate: formattedToDate,
          user: JSON.stringify(userWithBanks),
        },
      });
    } else {
      router.push({
        pathname: "/payment",
        params: {
          hotelId: detailData?.id,
          fromDate: formattedFromDate,
          toDate: formattedToDate,
          user: JSON.stringify(userWithBanks),
        },
      });
    }
  };

  return {
    loading,
    detailData,
    setDetailData,
    isDescriptionLong,
    setIsDescriptionLong,
    setLoading,
    goToRoomList,
    fetchData,
    handleToggleDescription,
    showDateModal,
    selectedDate,
    setShowDateModal,
    handleDateSelection,
    setSelectedDate,
  };
};

export default DetailModal;
