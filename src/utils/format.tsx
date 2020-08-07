export const formatCurrency = (number: Number) => {
  const num = Number(number);
  return `${num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
};
