export const formatBalance = (amount?: number | string): string => {
  if (amount !== undefined && amount !== null) {
    const isNegative = Number(amount) < 0;
    const absoluteAmount = Math.abs(Number(amount));

    if (absoluteAmount >= 1_000_000) {
      const millionPart = absoluteAmount / 1_000_000;

      const roundedPart = Math.round(millionPart * 10) / 10;

      return `${isNegative ? "-" : ""} ${
        roundedPart % 1 === 0 ? roundedPart.toFixed(0) : roundedPart.toFixed(1)
      } млн`;
    } else if (absoluteAmount >= 1_000) {
      return `${isNegative ? "-" : ""} ${Math.floor(
        absoluteAmount / 1_000,
      )} тыс.`;
    } else {
      return `${isNegative ? "-" : ""} ${amount}`;
    }
  }
  return "";
};

export const formatOperation = (amount: number | string): string => {
  if (amount !== undefined && amount !== null) {
    const absoluteAmount = Math.abs(Number(amount));

    const formattedAmount = absoluteAmount
      .toLocaleString("en-US")
      .replace(/,/g, " ");

    return `${""} ${formattedAmount}`;
  }
  return "";
};
