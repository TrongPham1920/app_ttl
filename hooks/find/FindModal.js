import { useEffect, useState } from "react";
import { accommodationuser } from "../../api/app/app";
import { useLocalSearchParams } from "expo-router";

const FindModal = () => {
  const [accommodationData, setAccommodationData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [inputValue, setInputValue] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState([]);


  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);

  const [filterParams, setFilterParams] = useState({
    page: page,
    limit: pageSize,
  });

  const [toDate, setToDate] = useState("");
  const [fromDate, setFromdate] = useState("");

  const params = useLocalSearchParams();

  const fetchData = async (filterParams, reset) => {
    try {
      setLoading(true);
      const response = await accommodationuser(filterParams);
      if (response?.data) {
        if (reset !== true) {
          setAccommodationData(response.data);
        } else {
          setAccommodationData((prevData) => [...prevData, ...response.data]);
        }

        const total = response.pagination?.total || 0;
        const fetchedDataLength = response.data.length;
        const totalPages = Math.ceil(total / pageSize);

        setHasMore(fetchedDataLength < total);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu accommodation: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params) {
      const updatedParams = {
        ...filterParams,
        page: 0,
        ...params,
      };
        setFilterParams(updatedParams);
        setLoading(true);
        fetchData(updatedParams, false);
        setFromdate(params?.fromDate);
        setToDate(params?.toDate);
    }
  }, [JSON.stringify(params)]);
  

  const handleSearch = () => {
    const trimmedValue = inputValue.trim();
    setLoading(true);

    if (trimmedValue) {
      const updatedParams = {
        limit: 20,
        page: 0,
        search: trimmedValue,
        fromDate: fromDate,
        toDate: toDate,
      };

      fetchData(updatedParams, false);
      setFilterParams(updatedParams);
    } else {
      const updatedParams = {
        limit: 20,
        page: 0,
        fromDate: fromDate,
        toDate: toDate,
      };

      fetchData(updatedParams, false);
      setFilterParams(updatedParams);
    }
  };

  const onOK = (info) => {
    setLoading(true);
  
    const filtersArray = [...selectedFilters]; 
  
    const typeMapping = {
      0: "Hotel",
      1: "Homestay",
      2: "Villa"
    };
  
    if (info?.type !== undefined && typeMapping[info.type]) {
      const typeValues = Object.values(typeMapping);
      const filtered = filtersArray.filter(item => !typeValues.includes(item));
      filtered.push(typeMapping[info.type]);
      filtersArray.splice(0, filtersArray.length, ...filtered);
    }
  
    if (info?.num !== undefined) {
      const filtered = filtersArray.filter(item => !item.includes("sao"));
      filtered.push(`${info.num} sao`);
      filtersArray.splice(0, filtersArray.length, ...filtered);
    }
  
    if (info?.district) {
      const filtered = filtersArray.filter(item => !item.includes("Quận"));
      filtered.push(`Quận ${info.district}`);
      filtersArray.splice(0, filtersArray.length, ...filtered);
    }
  
    setSelectedFilters(filtersArray);
  
    const updatedParams = {
      ...filterParams,
      page: 0,
      ...info,
      fromDate: fromDate,
      toDate: toDate,
    };
  
    setFilterParams(updatedParams);
    fetchData(updatedParams, false);
  };
  
  

  const handleRemoveTag = (filter) => {
    const updatedFilters = selectedFilters.filter((item) => item !== filter);
    setSelectedFilters(updatedFilters);
  
    const updatedParams = { ...filterParams };
  
    if (filter.includes("sao")) {
      delete updatedParams.num;
    } else if (filter.includes("Hotel") || filter.includes("Homestay") || filter.includes("Villa")) {
      delete updatedParams.type;
    } else if (filter.includes("Quận")) {
      delete updatedParams.district;
    }
  
    setFilterParams(updatedParams);
    fetchData(updatedParams, false);
  };
  
  
  

  const handleEndReached = () => {
    if (loading || !hasMore) {
      return;
    }

    setLoading(true);

    const updatedParams = {
      ...filterParams,
      page: page + 1,
    };
    setPage(page + 1);
    setFilterParams(updatedParams);
    fetchData(updatedParams, true);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return {
    accommodationData,
    hasMore,
    loading,
    isModalVisible,
    inputValue,
    fromDate,
    toDate,
    setInputValue,
    toggleModal,
    onOK,
    handleSearch,
    handleEndReached,
    selectedFilters,
    handleRemoveTag
  };
};

export default FindModal;
