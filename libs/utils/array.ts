export const extractExchangeRate = (
  data,
  cryptoSymbol: string,
  fiatSymbol: string,
): number => {
  const { data: cryptoArray } = data;
  const rateObject = cryptoArray.find(
    (crypto) => crypto.symbol === cryptoSymbol,
  );
  const rate = rateObject.quote[fiatSymbol].price;

  return rate;
};
