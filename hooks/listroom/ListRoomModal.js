import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { getroom } from "../../api/app/app";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const useHotModal = () => {
  const route = useLocalSearchParams();
  const router = useRouter();

  const [params, setParams] = useState({});

  const [list, setList] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [selectedKey, setSelectedKey] = useState([]);

  const [toDate, setToDate] = useState(null);
  const [fromDate, setFromDate] = useState(null);

  const [loading, setLoading] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);

  const [filterParams, setFilterParams] = useState({
    page: page,
    limit: pageSize,
  });

  const handleRoomPress = (roomId) => {
    router.push({
      pathname: "/roomdetail",
      params: { roomId },
    });
  };

  const handleCheckboxChange = (roomId, price) => {
    setSelectedRooms((prev) => {
      const existingRoom = prev.find((room) => room.id === roomId);
      if (existingRoom) {
        return prev.filter((room) => room.id !== roomId);
      } else {
        return [...prev, { id: roomId, price }];
      }
    });

    setSelectedKey((prev) => {
      if (prev.includes(roomId)) {
        return prev.filter((id) => id !== roomId);
      } else {
        return [...prev, roomId];
      }
    });
  };

  const calculateTotalPrice = () => {
    return selectedRooms.reduce((total, room) => total + room?.price, 0);
  };

  const fetchData = async (info) => {
    try {
      setLoading(true);
      const response = await getroom(info);
      if (response?.data) {
        setList(response.data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu room: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = () => {
    router.push({
      pathname: "/payment",
      params: {
        hotelId: params.hotelId,
        selectedKey: JSON.stringify(selectedKey), 
        fromDate: params.fromDate,
        toDate: params.toDate,
        user: params.user,
      },
    });
  };

  const handleOpenDateModal = () => {
    setShowDateModal(true);
  };

  const handleCloseDateModal = () => {
    setShowDateModal(false);
  };

  const handleDateSelection = (fromDate, toDate) => {
    const formattedFromDate = dayjs(fromDate).format("DD/MM/YYYY");
    const formattedToDate = dayjs(toDate).format("DD/MM/YYYY");

    setParams((prev) => ({
      ...prev,
      fromDate: formattedFromDate,
      toDate: formattedToDate,
    }));
  };
  

  useEffect(() => {
    setParams((prev) => ({
      ...prev,
      ...route,
    }));
  }, [JSON.stringify(route)]);
  
  useEffect(() => {
    if (params?.hotelId && params?.fromDate && params?.toDate) {
      setFromDate(params.fromDate);
      setToDate(params.toDate);
  
      const newFilter = {
        ...filterParams,
        accommodationId: params.hotelId,
        fromDate: params.fromDate,
        toDate: params.toDate,
      };
  
      setSelectedKey([]);
      setSelectedRooms([]);
      fetchData(newFilter);
    }
  }, [JSON.stringify(params)]); 
  
  

  return {
    list,
    selectedKey,
    selectedRooms,
    loading,
    params,
    // hotelId,
    // user,
    showDateModal,
    fromDate,
    toDate,
    setToDate,
    setFromDate,
    setParams,
    setShowDateModal,
    handleBookNow,
    calculateTotalPrice,
    handleCheckboxChange,
    handleRoomPress,
    handleCloseDateModal,
    handleOpenDateModal,
    handleDateSelection,
  };
};

export default useHotModal;
