import moment from "moment";

export const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);

export const formatDate = (date) => moment.utc(date).zone("+07:00").format("DD/MM/YYYY HH:mm:ss");
