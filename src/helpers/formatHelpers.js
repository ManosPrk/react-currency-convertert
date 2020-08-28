export const formatCurrency = (number, currency = {}) => {
  const { isoCode } = currency;
  if (isoCode) {
    return number.toLocaleString(undefined, {
      style: "currency",
      currency: isoCode,
      maximumFractionDigits: 14,
    });
  }
  return number.toLocaleString(undefined, {
    maximumFractionDigits: 14,
  });
};