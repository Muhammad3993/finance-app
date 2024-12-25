const formatBalance = (amount?: number | string) => {
  if (amount !== undefined && amount !== null) {
    const isNegative = Number(amount) < 0;
    const absoluteAmount = Math.abs(Number(amount));

    if (absoluteAmount >= 1_000_000) {
      const millionPart = absoluteAmount / 1_000_000;
      return `${isNegative ? "-" : ""} ${
        Number.isInteger(millionPart)
          ? millionPart.toFixed(0)
          : millionPart.toFixed(1)
      } млн`;
    } else if (absoluteAmount >= 1_000) {
      return `${isNegative ? "-" : ""} ${Math.floor(absoluteAmount / 1_000)} тыс.`;
    } else {
      return `${isNegative ? "-" : ""} ${amount}`;
    }
  }
  return "";
};

export default formatBalance;
