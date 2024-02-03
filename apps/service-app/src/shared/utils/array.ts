import { GetExchangeRate } from '../abstractions';

export const extractExchangeRate = (
  data,
  cryptoSymbol: string,
  fiatSymbol: string,
): GetExchangeRate => {
  const { data: cryptoArray } = data;
  const rateObject = cryptoArray.find(
    (crypto) => crypto.symbol === cryptoSymbol,
  );
  const rate = rateObject.quote[fiatSymbol].price;

  return { rate };
};
