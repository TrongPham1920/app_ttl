import { useState, useCallback } from "react";
import { useRouter, useFocusEffect } from "expo-router";
import { getOrder } from "../../api/app/app";
import { useAuth } from "../../global/AuthenticationContext";

const useHotModal = () => {
  const router = useRouter();
  const { profile } = useAuth();

  const [accommodationData, setAccommodationData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);

  const [filterParams, setFilterParams] = useState({
    page: page,
    limit: pageSize,
  });

  const fetchData = async (filterParams) => {
    try {
      const response = await getOrder(filterParams);
      if (response?.data) {
        setAccommodationData(response.data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu accommodation: ", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (!profile) {
        router.push("/login"); 
      } else {
        fetchData(filterParams);
      }
    }, [profile])
  );

  return { accommodationData, loading };
};

export default useHotModal;
