export const COINMARKETCAP_API_URL =
  'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';

export const CURRENCIES = {
  fiat: {
    uah: 'UAH',
  },
  crypto: {
    btc: 'BTC',
  },
};

export const METRICS = {
  subscribeEmailCounter: {
    name: 'subscribe_email_count',
    help: 'Counts the number of successful email subscriptions',
  },
  unsubscribeEmailCounter: {
    name: 'unsubscribe_email_count',
    help: 'Counts the number of successful email unsubscriptions',
  },
  sendEmailSuccessfulCounter: {
    name: 'send_email_successful_count',
    help: 'Counts the number of successfully sent emails',
  },
  sendEmailErrorCounter: {
    name: 'send_email_error_count',
    help: 'Counts the number of email sending errors',
  },
  exchangeRateGauge: {
    name: 'exchange_rate_gauge',
    help: 'Tracks the current exchange rate',
  },
};
