const formatBalance = (amount?: number | string) => {
  if (amount) {
    if (Number(amount) >= 1_000_000) {
      const millionPart = Number(amount) / 1_000_000;
      return `${
        Number.isInteger(millionPart)
          ? millionPart.toFixed(0)
          : millionPart.toFixed(1)
      } млн`;
    } else if (Number(amount) >= 1_000) {
      return `${Math.floor(Number(amount) / 1_000)} тыс.`;
    } else {
      return `${amount}`;
    }
  }
};

export default formatBalance;
