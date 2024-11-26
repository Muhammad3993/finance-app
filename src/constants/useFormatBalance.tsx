const formatBalance = (amount?: number) => {
  if (amount) {
    if (amount >= 1_000_000) {
      const millionPart = amount / 1_000_000;
      return `${
        Number.isInteger(millionPart)
          ? millionPart.toFixed(0)
          : millionPart.toFixed(1)
      } млн`;
    } else if (amount >= 1_000) {
      return `${Math.floor(amount / 1_000)} тыс.`;
    } else {
      return `${amount}`;
    }
  }
};

export default formatBalance;
