import { useState, useEffect } from "react";
import { accommodationuser } from "../../api/app/app";
import dayjs from "dayjs";

const currentDate = dayjs().add(1, "day");
const defaultStartDate = currentDate.add(1, "day");
const StartDate = defaultStartDate.format("DD/MM/YYYY");
const date = currentDate.format("DD/MM/YYYY");

const useHotModal = () => {
  const [list, setList] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [homestay, setHomestay] = useState([]);
  const [villa, setVilla] = useState([]);

  const [generalLoading, setGeneralLoading] = useState(true);
  const [hotelLoading, setHotelLoading] = useState(true);
  const [homestayLoading, setHomestayLoading] = useState(true);
  const [villaLoading, setVillaLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);

  const [dates, setDates] = useState({
    fromDate: date,
    toDate: StartDate,
  });

  const [filterParams, setFilterParams] = useState({
    page: page,
    limit: pageSize,
    fromDate: dates.fromDate,
    toDate: dates.toDate,
  });

  const fetchData = async (filterParams) => {
    try {
      setGeneralLoading(true);
      const response = await accommodationuser(filterParams);
      if (response?.data) {
        setList(response.data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu accommodation: ", error);
    } finally {
      setGeneralLoading(false);
    }
  };

  const hotelData = async (filterParams) => {
    try {
      setHotelLoading(true);
      const praram = {
        ...filterParams,
        type: 0,
      };
      const response = await accommodationuser(praram);
      if (response?.data) {
        setHotels(response.data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu accommodation: ", error);
    } finally {
      setHotelLoading(false);
    }
  };

  const homestayData = async (filterParams) => {
    try {
      setHomestayLoading(true);
      const praram = {
        ...filterParams,
        type: 1,
      };
      const response = await accommodationuser(praram);
      if (response?.data) {
        setHomestay(response.data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu accommodation: ", error);
    } finally {
      setHomestayLoading(false);
    }
  };

  const villaData = async (filterParams) => {
    try {
      setVillaLoading(true);
      const praram = {
        ...filterParams,
        type: 2,
      };
      const response = await accommodationuser(praram);
      if (response?.data) {
        setVilla(response.data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu accommodation: ", error);
    } finally {
      setVillaLoading(false);
    }
  };

  const onDateChange = (value, name) => {
    console.log(value, name);
    if (name === "endDate") {
      setFilterParams({
        ...filterParams,
        toDate: value,
      });
      const newDates = { ...dates, toDate: value };
      setDates(newDates);
    } else {
      setFilterParams({
        ...filterParams,
        fromDate: value,
      });
      const newDates = { ...dates, fromDate: value };
      setDates(newDates);
    }
  };

  useEffect(() => {
    fetchData(filterParams);
    hotelData(filterParams);
    homestayData(filterParams);
    villaData(filterParams);
  }, [filterParams, dates]);

  return {
    dates,
    date,
    StartDate,
    currentDate,
    defaultStartDate,
    list,
    generalLoading,
    villa,
    homestay,
    hotels,
    hotelLoading,
    homestayLoading,
    villaLoading,
    onDateChange,
  };
};

export default useHotModal;
