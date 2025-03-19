import { useState, useEffect } from "react";
import { accommodationuser } from "../../api/app/app";
import dayjs from "dayjs";

const currentDate = dayjs().add(1, "day");
const defaultStartDate = currentDate.add(1, "day");
const StartDate = defaultStartDate.format("DD/MM/YYYY");
const date = currentDate.format("DD/MM/YYYY");
const useHotModal = () => {
  const [accommodationData, setAccommodationData] = useState([]);
  const [loading, setLoading] = useState(true);

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
      const response = await accommodationuser(filterParams);
      if (response?.data) {
        setAccommodationData(response.data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu accommodation: ", error);
    } finally {
      setLoading(false);
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
  }, [filterParams, dates]);

  return { accommodationData, loading, date, dates, onDateChange };
};

export default useHotModal;
