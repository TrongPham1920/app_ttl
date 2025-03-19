import dayjs from "dayjs";

const FormatUtils = {
  vndPrice: (value: any) => {
    const validValue =
      isNaN(value) || value === null || value === undefined ? 0 : +value;
    return `${new Intl.NumberFormat().format(validValue)} VNĐ`;
  },
  formatDate: (date: Date | undefined) => {
    const validDate = dayjs(date).isValid() ? dayjs(date) : dayjs();
    return validDate.format("DD/MM/YYYY");
  },
  formatDateYear: (date: Date | undefined) => {
    const validDate = dayjs(date).isValid() ? dayjs(date) : dayjs();
    return validDate.format("DD/MM/YYYY");
  },
  formatDateTime: (date: Date | undefined) => {
    const validDate = dayjs(date).isValid() ? dayjs(date) : dayjs();
    return validDate.format("DD/MM - HH:mm:ss");
  },
  formatFullDateTime: (date: Date | undefined) => {
    const validDate = dayjs(date).isValid() ? dayjs(date) : dayjs();
    return validDate.format("DD/MM/YYYY - HH:mm:ss");
  },
  formatHour: (date: Date | undefined) => {
    const validDate = dayjs(date).isValid() ? dayjs(date) : dayjs();
    return validDate.format("HH");
  },
  formatSquareMeter: (value: any) => {
    const validValue =
      isNaN(value) || value === null || value === undefined ? 0 : +value;
    return `${new Intl.NumberFormat().format(validValue)} m²`;
  },
};

export default FormatUtils;
